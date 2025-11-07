import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { client } from '@/lib/sanity'

// Get email settings from Sanity
async function getEmailSettings() {
  // First try to get active configuration
  let settings = await client.fetch(`
    *[_type == "emailSettings" && isActive == true] | order(_updatedAt desc)[0] {
      smtpHost,
      smtpPort,
      smtpSecure,
      smtpUser,
      smtpPass,
      senderName
    }
  `)
  
  // If no active config, get the most recently created one
  if (!settings) {
    settings = await client.fetch(`
      *[_type == "emailSettings"] | order(_createdAt desc)[0] {
        smtpHost,
        smtpPort,
        smtpSecure,
        smtpUser,
        smtpPass,
        senderName
      }
    `)
  }
  
  return settings
}

export async function POST(request: NextRequest) {
  try {
    const { temat, email, message, to } = await request.json()

    // Validate required fields
    if (!temat || !email || !message || !to) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get email configuration from Sanity
    const emailConfig = await getEmailSettings()
    
    if (!emailConfig) {
      return NextResponse.json(
        { error: 'Email configuration not found. Please configure email settings in Sanity CMS.' },
        { status: 500 }
      )
    }

    // Create transporter with Sanity configuration
    const transporter = nodemailer.createTransport({
      host: emailConfig.smtpHost,
      port: emailConfig.smtpPort,
      secure: emailConfig.smtpSecure,
      auth: {
        user: emailConfig.smtpUser,
        pass: emailConfig.smtpPass,
      },
    })

    // Email options
    const mailOptions = {
      from: `"${emailConfig.senderName}" <${emailConfig.smtpUser}>`, // sender address
      to: to, // recipient email from CMS
      replyTo: email, // user's email for easy replies
      subject: `Nowa wiadomość z formularza: ${temat}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0abaee; border-bottom: 2px solid #0abaee; padding-bottom: 10px;">
            Nowa wiadomość z formularza kontaktowego
          </h2>
          
          <div style="margin: 20px 0;">
            <strong>Temat:</strong> ${temat}
          </div>
          
          <div style="margin: 20px 0;">
            <strong>Email nadawcy:</strong> ${email}
          </div>
          
          <div style="margin: 20px 0;">
            <strong>Wiadomość:</strong>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            Wiadomość wysłana z formularza kontaktowego na stronie sigeon.pl
          </div>
        </div>
      `,
      text: `
Nowa wiadomość z formularza kontaktowego

Temat: ${temat}
Email: ${email}

Wiadomość:
${message}

---
Wiadomość wysłana z formularza kontaktowego na stronie sigeon.pl
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    
    console.log('Email sent:', info.messageId)
    
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Email sending error:', error)
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
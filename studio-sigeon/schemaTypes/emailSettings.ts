import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const emailSettings = defineType({
  name: 'emailSettings',
  title: 'Email Settings',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Name',
      type: 'string',
      initialValue: 'Email Configuration',
      description: 'Internal name for this configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'smtpHost',
      title: 'SMTP Host',
      type: 'string',
      description: 'SMTP server address from your hosting provider (e.g., mail.sigeon.pl, smtp.sigeon.pl)',
      placeholder: 'mail.sigeon.pl',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'smtpPort',
      title: 'SMTP Port',
      type: 'number',
      description: 'SMTP server port (usually 587 for TLS or 465 for SSL)',
      initialValue: 587,
      validation: (Rule) => Rule.required().min(1).max(65535),
    }),
    defineField({
      name: 'smtpSecure',
      title: 'Use SSL/TLS',
      type: 'boolean',
      description: 'Enable for port 465 (SSL), disable for port 587 (TLS)',
      initialValue: false,
    }),
    defineField({
      name: 'smtpUser',
      title: 'SMTP Username (Email)',
      type: 'string',
      description: 'Your domain email address used for sending (usually your full email address)',
      placeholder: 'ip@sigeon.pl',
      validation: (Rule) => 
        Rule.required().regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          {
            name: 'email',
            invert: false,
          }
        ).error('Please enter a valid email address'),
    }),
    defineField({
      name: 'smtpPass',
      title: 'SMTP Password',
      type: 'string',
      description: '🔒 SECURITY WARNING: This password will be visible to all Sanity Studio users with access to this project. For Gmail: Use App Password (NOT your regular password). Go to Google Account → Security → 2-Step Verification → App passwords',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'senderName',
      title: 'Sender Name',
      type: 'string',
      description: 'Name that appears in "From" field of emails',
      placeholder: 'Formularz kontaktowy - Sigeon',
      initialValue: 'Formularz kontaktowy - Sigeon',
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Recipient Email (Contact Form)',
      type: 'string',
      description: 'Email address where contact form submissions will be sent',
      placeholder: 'ip@sigeon.pl',
      validation: (Rule) => 
        Rule.required().regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          {
            name: 'email',
            invert: false,
          }
        ).error('Please enter a valid email address'),
    }),
    defineField({
      name: 'isActive',
      title: 'Active Configuration',
      type: 'boolean',
      description: '⚠️ Only one email configuration should be active at a time. When you enable this, disable others.',
      initialValue: true,
    }),
    defineField({
      name: 'testInstructions',
      title: 'Setup Instructions',
      type: 'text',
      readOnly: true,
      initialValue: `DOMAIN EMAIL SETUP (ip@sigeon.pl):

1. CONTACT YOUR HOSTING PROVIDER:
   Ask for SMTP settings for your domain email (ip@sigeon.pl)
   
2. TYPICAL SETTINGS FOR DOMAIN EMAIL:
   - SMTP Host: mail.sigeon.pl (or smtp.sigeon.pl)
   - SMTP Port: 587 (TLS) or 465 (SSL)  
   - Username: ip@sigeon.pl (your full email)
   - Password: Your email account password
   - Security: TLS (port 587) or SSL (port 465)

3. COMMON HOSTING PROVIDERS:
   - OVH: ssl0.ovh.net, port 587
   - nazwa.pl: mail.nazwa.pl, port 587
   - home.pl: mail.home.pl, port 587
   - Azure/Office 365: smtp.office365.com, port 587

4. HOW TO FIND YOUR SMTP SETTINGS:
   - Check your hosting control panel (cPanel, DirectAdmin, etc.)
   - Look for "Email Settings" or "Mail Configuration"
   - Contact your hosting support with question: "What are SMTP settings for sending emails?"

5. SECURITY NOTE:
   Your email password will be visible in this CMS to all administrators.
   Consider creating a dedicated email like: kontakt@sigeon.pl or formularz@sigeon.pl

Gmail Setup (if needed):
1. Enable 2-Step Verification → Security → App passwords
2. Generate App Password for "Mail" → "Website Contact Form"
3. Use the 16-character password (not your regular Gmail password)`,
      rows: 20,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      smtpHost: 'smtpHost',
      smtpUser: 'smtpUser',
      isActive: 'isActive',
    },
    prepare({title, smtpHost, smtpUser, isActive}) {
      return {
        title: title || 'Email Configuration',
        subtitle: `${smtpUser} via ${smtpHost}${!isActive ? ' (Inactive)' : ''}`,
        media: EnvelopeIcon,
      }
    },
  },
})
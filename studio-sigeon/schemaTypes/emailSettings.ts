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
      description: 'SMTP server address (e.g., smtp.gmail.com)',
      placeholder: 'smtp.gmail.com',
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
      description: 'Your email address used for sending',
      placeholder: 'your-email@gmail.com',
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
      description: '⚠️ For Gmail: Use App Password (NOT your regular password). Go to Google Account → Security → 2-Step Verification → App passwords',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'senderName',
      title: 'Sender Name',
      type: 'string',
      description: 'Name that appears in "From" field',
      placeholder: 'Contact Form - Your Company',
      initialValue: 'Contact Form - Sigeon',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Configuration',
      type: 'boolean',
      description: 'Only one email configuration can be active at a time',
      initialValue: true,
    }),
    defineField({
      name: 'testInstructions',
      title: 'Setup Instructions',
      type: 'text',
      readOnly: true,
      initialValue: `Gmail Setup:
1. Enable 2-Step Verification in your Google Account
2. Go to Google Account → Security → 2-Step Verification
3. Scroll down and click "App passwords"
4. Select "Mail" and "Other (custom name)"
5. Enter "Website Contact Form"
6. Copy the generated 16-character password
7. Use that password in the "SMTP Password" field above

Other providers:
- For custom domains: Contact your hosting provider for SMTP details
- For Office 365: Use smtp.office365.com, port 587
- For Outlook.com: Use smtp-mail.outlook.com, port 587`,
      rows: 15,
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
import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactFormSettings = defineType({
  name: 'contactFormSettings',
  title: 'Contact Form Settings',
  type: 'document',
  icon: EnvelopeIcon,
  description: 'Global settings for contact forms used across the website',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Contact Form Configuration',
      description: 'Internal reference only',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'localizedString',
      description: 'Main heading of the contact form',
      initialValue: {
        pl: 'Skontaktuj się z nami',
        en: 'Contact Us'
      },
    }),
    defineField({
      name: 'subjectLabel',
      title: 'Subject Field Label',
      type: 'localizedString',
      description: 'Label for the subject/topic field',
      initialValue: {
        pl: 'Temat',
        en: 'Subject'
      },
    }),
    defineField({
      name: 'subjectPlaceholder',
      title: 'Subject Field Placeholder',
      type: 'localizedString',
      description: 'Placeholder text for subject field',
      initialValue: {
        pl: 'Wpisz temat wiadomości',
        en: 'Enter message subject'
      },
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Field Label',
      type: 'localizedString',
      description: 'Label for the email field',
      initialValue: {
        pl: 'Email',
        en: 'Email'
      },
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Field Placeholder',
      type: 'localizedString',
      description: 'Placeholder text for email field',
      initialValue: {
        pl: 'twoj@email.com',
        en: 'your@email.com'
      },
    }),
    defineField({
      name: 'messageLabel',
      title: 'Message Field Label',
      type: 'localizedString',
      description: 'Label for the message/content field',
      initialValue: {
        pl: 'Wiadomość',
        en: 'Message'
      },
    }),
    defineField({
      name: 'messagePlaceholder',
      title: 'Message Field Placeholder',
      type: 'localizedString',
      description: 'Placeholder text for message field',
      initialValue: {
        pl: 'Twoja wiadomość...',
        en: 'Your message...'
      },
    }),
    defineField({
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'localizedString',
      description: 'Text for the submit button',
      initialValue: {
        pl: 'Wyślij',
        en: 'Send'
      },
    }),
    defineField({
      name: 'formEmail',
      title: 'Email to Send To',
      type: 'string',
      description: 'Where form submissions will be sent',
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
      name: 'successMessage',
      title: 'Success Message',
      type: 'localizedString',
      description: 'Message shown after successful form submission',
      initialValue: {
        pl: 'Wiadomość wysłana pomyślnie! Skontaktujemy się z Tobą wkrótce.',
        en: 'Message sent successfully! We will contact you soon.'
      },
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'localizedString',
      description: 'Message shown when form submission fails',
      initialValue: {
        pl: 'Błąd wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.',
        en: 'Error sending message. Please try again or contact us directly.'
      },
    }),
    defineField({
      name: 'sendingMessage',
      title: 'Sending Message',
      type: 'localizedString',
      description: 'Text shown while form is being submitted',
      initialValue: {
        pl: 'Wysyłanie...',
        en: 'Sending...'
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      formEmail: 'formEmail',
    },
    prepare({title, formEmail}) {
      return {
        title: title || 'Contact Form Settings',
        subtitle: `Form submissions sent to: ${formEmail || 'Not configured'}`,
        media: EnvelopeIcon,
      }
    },
  },
})
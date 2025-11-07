import React, { useState, useEffect } from 'react'
import { getLocalizedText } from '@/lib/i18n'
import { Language } from '@/context/LanguageContext'
import { client } from '@/lib/sanity'

interface ContactFormSettings {
  formTitle?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  subjectLabel?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  subjectPlaceholder?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  emailLabel?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  emailPlaceholder?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  messageLabel?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  messagePlaceholder?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  submitButtonLabel?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  successMessage?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  errorMessage?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  sendingMessage?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  formEmail: string
}

interface ContactFormBlockType {
  _type: 'contactFormBlock'
  _key: string
  showTitle?: boolean
  customTitle?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  description?: {
    pl: string
    en?: string
    zh?: string
    ko?: string
    ja?: string
    ru?: string
  }
  backgroundColor?: 'white' | 'gray' | 'transparent'
  padding?: 'small' | 'medium' | 'large'
}

interface ContactFormBlockProps {
  block: ContactFormBlockType
  language: string
}

// Get contact form settings from Sanity
async function getContactFormSettings(): Promise<ContactFormSettings | null> {
  const settings = await client.fetch(`
    *[_type == "contactFormSettings"][0] {
      formTitle,
      subjectLabel,
      subjectPlaceholder,
      emailLabel,
      emailPlaceholder,
      messageLabel,
      messagePlaceholder,
      submitButtonLabel,
      successMessage,
      errorMessage,
      sendingMessage,
      formEmail
    }
  `)
  return settings
}

export function ContactFormBlock({ block, language }: ContactFormBlockProps) {
  const [formData, setFormData] = useState({
    temat: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formSettings, setFormSettings] = useState<ContactFormSettings | null>(null)

  // Load form settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getContactFormSettings()
        setFormSettings(settings)
      } catch (error) {
        console.error('Error loading contact form settings:', error)
      }
    }
    loadSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formSettings?.formEmail) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temat: formData.temat,
          email: formData.email,
          message: formData.message,
          to: formSettings.formEmail,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ temat: '', email: '', message: '' }) // Reset form
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Background styles
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    transparent: 'bg-transparent'
  }

  // Padding styles
  const paddingStyles = {
    small: 'p-6',
    medium: 'p-8',
    large: 'p-12'
  }

  const bgClass = bgStyles[block.backgroundColor || 'white']
  const paddingClass = paddingStyles[block.padding || 'large']

  // Get form title
  const getFormTitle = () => {
    if (block.customTitle) {
      return getLocalizedText(block.customTitle, language as Language)
    }
    if (formSettings?.formTitle) {
      return getLocalizedText(formSettings.formTitle, language as Language)
    }
    return language === 'en' ? 'Contact Us' : 'Skontaktuj się z nami'
  }

  return (
    <section className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className={`${bgClass} ${paddingClass} rounded-lg shadow-sm`}>
          {/* Title */}
          {block.showTitle && (
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {getFormTitle()}
            </h3>
          )}

          {/* Description */}
          {block.description && (
            <div className="mb-6 text-gray-600">
              {getLocalizedText(block.description, language as Language)}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="temat" className="block text-sm font-medium text-gray-700 mb-2">
                {formSettings?.subjectLabel 
                  ? getLocalizedText(formSettings.subjectLabel, language as Language)
                  : (language === 'en' ? 'Subject' : 'Temat')
                }
              </label>
              <input
                type="text"
                id="temat"
                name="temat"
                value={formData.temat}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0abaee] focus:border-transparent"
                placeholder={formSettings?.subjectPlaceholder 
                  ? getLocalizedText(formSettings.subjectPlaceholder, language as Language)
                  : (language === 'en' ? 'Subject' : 'Temat')
                }
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {formSettings?.emailLabel 
                  ? getLocalizedText(formSettings.emailLabel, language as Language)
                  : 'Email'
                }
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0abaee] focus:border-transparent"
                placeholder={formSettings?.emailPlaceholder 
                  ? getLocalizedText(formSettings.emailPlaceholder, language as Language)
                  : "your@email.com"
                }
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {formSettings?.messageLabel 
                  ? getLocalizedText(formSettings.messageLabel, language as Language)
                  : (language === 'en' ? 'Message' : 'Wiadomość')
                }
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0abaee] focus:border-transparent"
                placeholder={formSettings?.messagePlaceholder 
                  ? getLocalizedText(formSettings.messagePlaceholder, language as Language)
                  : (language === 'en' ? 'Your message...' : 'Twoja wiadomość...')
                }
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                {formSettings?.successMessage 
                  ? getLocalizedText(formSettings.successMessage, language as Language)
                  : (language === 'en' 
                    ? 'Message sent successfully! We will contact you soon.' 
                    : 'Wiadomość wysłana pomyślnie! Skontaktujemy się z Tobą wkrótce.')
                }
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {formSettings?.errorMessage 
                  ? getLocalizedText(formSettings.errorMessage, language as Language)
                  : (language === 'en' 
                    ? 'Error sending message. Please try again or contact us directly.' 
                    : 'Błąd wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.')
                }
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0abaee] hover:bg-[#0891b2] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {isSubmitting 
                ? (formSettings?.sendingMessage 
                    ? getLocalizedText(formSettings.sendingMessage, language as Language)
                    : (language === 'en' ? 'Sending...' : 'Wysyłanie...')
                  )
                : (formSettings?.submitButtonLabel 
                    ? getLocalizedText(formSettings.submitButtonLabel, language as Language)
                    : (language === 'en' ? 'Send' : 'Wyślij')
                  )
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
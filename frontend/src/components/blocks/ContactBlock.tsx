import React, { useState } from 'react'
import { getLocalizedText } from '@/lib/i18n'
import { Language } from '@/context/LanguageContext'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getLocalizedPortableText } from '@/lib/portableText'

// Custom components for PortableText with icons
const contactPortableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string; blank?: boolean } }) => {
      const isExternal = value?.href?.startsWith('http://') || value?.href?.startsWith('https://')
      const shouldOpenInNewTab = value?.blank || isExternal
      
      return (
        <a
          href={value?.href}
          target={shouldOpenInNewTab ? '_blank' : undefined}
          rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}
          className="text-[#0abaee] hover:text-gray-900 font-medium transition-colors"
        >
          {children}
        </a>
      )
    },
    emailLink: ({ children, value }: { children: React.ReactNode; value?: { email?: string } }) => {
      return (
        <a
          href={`mailto:${value?.email}`}
          className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-medium"
        >
          <svg className="w-4 h-4 flex-shrink-0 text-[#0abaee]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          {children}
        </a>
      )
    },
    phoneLink: ({ children, value }: { children: React.ReactNode; value?: { phone?: string } }) => {
      return (
        <a
          href={`tel:${value?.phone}`}
          className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-medium"
        >
          <svg className="w-4 h-4 flex-shrink-0 text-[#0abaee]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {children}
        </a>
      )
    },
    faxLink: ({ children, value }: { children: React.ReactNode; value?: { fax?: string } }) => {
      return (
        <a
          href={`tel:${value?.fax}`}
          className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-medium"
        >
          <svg className="w-4 h-4 flex-shrink-0 text-[#0abaee]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm2 2h8v2H6V7zm0 3h8v2H6v-2zm0 3h4v2H6v-2z" clipRule="evenodd" />
          </svg>
          {children}
        </a>
      )
    },
  },
}

interface ContactBlockType {
  _type: 'contactBlock'
  _key: string
  leftColumnTop: {
    pl: unknown[]
    en?: unknown[]
  }
  socialMedia?: {
    facebook?: string
    linkedin?: string
  }
  leftColumnBottom: {
    pl: unknown[]
    en?: unknown[]
  }
  contactForm: {
    title: {
      pl: string
      en?: string
    }
    formEmail: string
  }
  mapEmbedCode: string
}

interface ContactBlockProps {
  block: ContactBlockType
  language: string
}

export function ContactBlock({ block, language }: ContactBlockProps) {
  const [formData, setFormData] = useState({
    temat: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:${block.contactForm.formEmail}?subject=${encodeURIComponent(formData.temat)}&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
  }

  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:divide-x md:divide-gray-200">
          {/* Left Column - Contact Info */}
          <div className="space-y-8 md:pl-12 md:pr-12">
            {/* Top Section - Company Info */}
            {block.leftColumnTop && (
              <div className="prose prose-sm max-w-none text-gray-700">
                <style jsx>{`
                  div :global(h1) { font-size: 1.875rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
                  div :global(h2) { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.75rem; }
                  div :global(h3) { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; }
                  div :global(h4) { font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem; }
                  div :global(h5) { font-size: 1rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem; }
                  div :global(h6) { font-size: 0.875rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem; }
                  div :global(p) { margin-bottom: 0.5rem; }
                  div :global(strong) { font-weight: 700; color: #111827; }
                  div :global(ul) { list-style-type: disc; margin-left: 1rem; }
                  div :global(ol) { list-style-type: decimal; margin-left: 1rem; }
                `}</style>
                <PortableText 
                  value={getLocalizedPortableText(block.leftColumnTop, language as Language)} 
                  components={contactPortableTextComponents}
                />
              </div>
            )}

            {/* Social Media Icons */}
            {block.socialMedia && (block.socialMedia.facebook || block.socialMedia.linkedin) && (
              <div className="flex items-center gap-4 pt-4">
                {block.socialMedia.facebook && (
                  <a
                    href={block.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0abaee] hover:text-gray-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {block.socialMedia.linkedin && (
                  <a
                    href={block.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0abaee] hover:text-gray-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 md:mr-[-3rem]"></div>

            {/* Bottom Section - Legal Info */}
            {block.leftColumnBottom && (
              <div className="prose prose-sm max-w-none text-gray-700">
                <style jsx>{`
                  div :global(h1) { font-size: 1.875rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
                  div :global(h2) { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.75rem; }
                  div :global(h3) { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; }
                  div :global(h4) { font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem; }
                  div :global(h5) { font-size: 1rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem; }
                  div :global(h6) { font-size: 0.875rem; font-weight: 600; color: #1f2937; margin-bottom: 0.25rem; }
                  div :global(p) { margin-bottom: 0.5rem; }
                  div :global(strong) { font-weight: 700; color: #111827; }
                  div :global(ul) { list-style-type: disc; margin-left: 1rem; }
                  div :global(ol) { list-style-type: decimal; margin-left: 1rem; }
                `}</style>
                <PortableText 
                  value={getLocalizedPortableText(block.leftColumnBottom, language as Language)} 
                  components={contactPortableTextComponents}
                />
              </div>
            )}
          </div>

          {/* Right Column - Contact Form */}
          <div className="md:pl-12 md:pr-12">
            <div className="bg-white p-12 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {getLocalizedText(block.contactForm.title, language as Language)}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="temat" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Subject' : 'Temat'}
                </label>
                <input
                  type="text"
                  id="temat"
                  name="temat"
                  value={formData.temat}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0abaee] focus:border-transparent"
                  placeholder={language === 'en' ? 'Subject' : 'Temat'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Email' : 'Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0abaee] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Message' : 'Wiadomość'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0abaee] focus:border-transparent"
                  placeholder={language === 'en' ? 'Your message...' : 'Twoja wiadomość...'}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0abaee] hover:bg-[#0891b2] text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {language === 'en' ? 'Send' : 'Wyślij'}
              </button>
            </form>
            </div>
          </div>
        </div>

        {/* Map Section - Full Width Below */}
        {block.mapEmbedCode && (
          <div className="mt-12 pt-12 border-t border-gray-200 px-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'How can you find us?' : 'Jak do nas dojechać?'}
            </h3>
            <div 
              className="w-full rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: block.mapEmbedCode }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
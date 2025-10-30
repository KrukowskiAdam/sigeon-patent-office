import { PortableText as BasePortableText } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'

interface PortableTextProps {
  value?: TypedObject | TypedObject[] | null
  className?: string
}

export function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) return null
  
  return (
    <div className={className}>
      <BasePortableText 
        value={value}
        components={{
          block: {
            normal: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
            head: ({children}) => (
              <div className="flex items-start gap-3 mb-4 mt-6">
                <div className="w-1 bg-[#0abaee] flex-shrink-0 h-6 mt-1"></div>
                <h3 className="text-lg font-bold leading-relaxed">{children}</h3>
              </div>
            ),
            h1: ({children}) => <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>,
            h2: ({children}) => <h2 className="text-2xl font-semibold mb-4 mt-6">{children}</h2>,
            h3: ({children}) => <h3 className="text-xl font-medium mb-3 mt-5">{children}</h3>,
            h4: ({children}) => <h4 className="text-lg font-medium mb-3 mt-4">{children}</h4>,
            h5: ({children}) => <h5 className="text-base font-medium mb-2 mt-3">{children}</h5>,
            h6: ({children}) => <h6 className="text-sm font-medium mb-2 mt-3">{children}</h6>,
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600 bg-gray-50 py-4">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
            number: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
          },
          listItem: {
            bullet: ({children}) => <li className="leading-relaxed">{children}</li>,
            number: ({children}) => <li className="leading-relaxed">{children}</li>,
          },
          marks: {
            strong: ({children}) => <strong className="font-semibold">{children}</strong>,
            em: ({children}) => <em className="italic">{children}</em>,
            link: ({value, children}) => (
              <a 
                href={value.href} 
                className="text-current hover:text-[#0abaee] underline transition-colors"
                target={value.blank ? '_blank' : '_self'}
                rel={value.blank ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            emailLink: ({value, children}) => (
              <a 
                href={`mailto:${value.email}`}
                className="text-current hover:text-[#0abaee] underline transition-colors"
              >
                {children}
              </a>
            ),
            phoneLink: ({value, children}) => (
              <a 
                href={`tel:${value.phone}`}
                className="text-current hover:text-[#0abaee] underline transition-colors"
              >
                {children}
              </a>
            ),
            faxLink: ({value, children}) => (
              <a 
                href={`fax:${value.fax}`}
                className="text-current hover:text-[#0abaee] underline transition-colors"
              >
                {children}
              </a>
            ),
          }
        }}
      />
    </div>
  )
}
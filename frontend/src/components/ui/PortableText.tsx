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
            h1: ({children}) => <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>,
            h2: ({children}) => <h2 className="text-2xl font-semibold mb-4 mt-6">{children}</h2>,
            h3: ({children}) => <h3 className="text-xl font-medium mb-3 mt-5">{children}</h3>,
            h4: ({children}) => <h4 className="text-lg font-medium mb-3 mt-4">{children}</h4>,
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
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
                target={value.blank ? '_blank' : '_self'}
                rel={value.blank ? 'noopener noreferrer' : undefined}
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
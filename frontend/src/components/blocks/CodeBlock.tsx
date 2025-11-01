import React from 'react'
import { getLocalizedText } from '@/lib/i18n'
import { Language } from '@/context/LanguageContext'
import { CodeBlock as CodeBlockType } from '@/types/sanity'

interface CodeBlockProps {
  block: CodeBlockType
  language: string
}

export function CodeBlock({ block, language }: CodeBlockProps) {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {block.title && (
          <div className="flex items-stretch gap-4 mb-8">
            <div className="w-1 bg-[#0abaee] flex-shrink-0"></div>
            <h2 className="text-3xl font-semibold text-gray-800 leading-none">
              {getLocalizedText(block.title, language as Language)}
            </h2>
          </div>
        )}
        
        {/* HTML/Embed Content */}
        <div 
          className="w-full"
          dangerouslySetInnerHTML={{ __html: block.code }}
        />
        
        {block.description && (
          <div className="mt-6 text-gray-600 text-center">
            {getLocalizedText(block.description, language as Language)}
          </div>
        )}
      </div>
    </section>
  )
}
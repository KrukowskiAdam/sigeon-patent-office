/**
 * Check if a content block has translation in the specified language
 * Returns true if at least one translatable field has content in that language
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasBlockTranslation(block: any, language: string): boolean {
  // Polish is always available (fallback language)
  if (language === 'pl') return true

  // Check based on block type
  switch (block._type) {
    case 'heroBlock':
      return !!(block.title?.[language] || block.subtitle?.[language])
    
    case 'textBlock':
      return !!(block.title?.[language] || block.content?.[language])
    
    case 'textImageBlock':
      return !!(block.title?.[language] || block.content?.[language])
    
    case 'textImageCarouselBlock':
      // Check if any slide has translation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return block.slides?.some((slide: any) => 
        slide.title?.[language] || slide.content?.[language]
      ) ?? false
    
    case 'servicesBlock':
      return !!(block.title?.[language] || 
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               block.services?.some((s: any) => s.title?.[language] || s.description?.[language]))
    
    case 'bannerBlock':
      return !!(block.title?.[language] || block.description?.[language])
    
    case 'codeBlock':
      return !!(block.title?.[language])
    
    case 'contactBlock':
      // Contact block is special - always show if it exists
      return true
    
    case 'twoColumnTextBlock':
      // Check if any column has translation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const leftHasTranslation = block.leftColumn?.some((item: any) => 
        item.title?.[language] || item.content?.[language]
      ) ?? false
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rightHasTranslation = block.rightColumn?.some((item: any) => 
        item.title?.[language] || item.content?.[language]
      ) ?? false
      
      return leftHasTranslation || rightHasTranslation
    
    default:
      // For unknown block types, show them
      return true
  }
}

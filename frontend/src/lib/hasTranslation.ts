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
      // Check if content exists in target language (not just title)
      const textContent = block.content?.[language]
      return Array.isArray(textContent) && textContent.length > 0
    
    case 'textImageBlock':
      // Check if content exists in target language
      const imageBlockContent = block.content?.[language]
      return Array.isArray(imageBlockContent) && imageBlockContent.length > 0
    
    case 'textImageCarouselBlock':
      // Check if any slide has content in target language
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return block.slides?.some((slide: any) => {
        const slideContent = slide.content?.[language]
        return Array.isArray(slideContent) && slideContent.length > 0
      }) ?? false
    
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
      // Check if any column has content (not just title) in target language
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const leftHasContent = block.leftColumn?.some((item: any) => {
        const content = item.content?.[language]
        return Array.isArray(content) && content.length > 0
      }) ?? false
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rightHasContent = block.rightColumn?.some((item: any) => {
        const content = item.content?.[language]
        return Array.isArray(content) && content.length > 0
      }) ?? false
      
      return leftHasContent || rightHasContent
    
    default:
      // For unknown block types, show them
      return true
  }
}

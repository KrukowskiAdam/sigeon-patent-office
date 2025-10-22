export interface LocalizedString {
  pl: string
  en?: string
  de?: string
  zh?: string
  ko?: string
  ja?: string
  ru?: string
}

export interface LocalizedText {
  pl: string
  en?: string
  de?: string
  zh?: string
  ko?: string
  ja?: string
  ru?: string
}

export interface LocalizedRichText {
  pl: unknown[]
  en?: unknown[]
  de?: unknown[]
  zh?: unknown[]
  ko?: unknown[]
  ja?: unknown[]
  ru?: unknown[]
}

export interface SEO {
  metaTitle?: LocalizedString
  metaDescription?: LocalizedText
  openGraphImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  noIndex?: boolean
}

export interface NewsArticle {
  _id: string
  title: LocalizedString
  slug: {
    current: string
  }
  publishedAt: string
  category?: 'patents' | 'trademarks' | 'legal' | 'company' | 'industry'
  excerpt?: LocalizedText
  featuredImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  content?: LocalizedRichText
  tags?: string[]
  featured?: boolean
  seo?: SEO
}

export interface Service {
  title: LocalizedString
  description: LocalizedText
}

// Content Blocks
export interface TextBlock {
  _type: 'textBlock'
  _key: string
  title?: LocalizedString
  content: LocalizedRichText
  alignment?: 'left' | 'center' | 'right'
}

export interface TextImageBlock {
  _type: 'textImageBlock'
  _key: string
  title?: LocalizedString
  content: LocalizedRichText
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  imageAlt?: LocalizedString
  layout: 'text-left' | 'image-left'
  imageSize?: 'small' | 'medium' | 'large'
}

export interface HeroBlock {
  _type: 'heroBlock'
  _key: string
  title: LocalizedString
  subtitle?: LocalizedString
  content?: LocalizedRichText
  backgroundImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  backgroundColor?: 'blue' | 'green' | 'purple' | 'teal' | 'red' | 'orange' | 'gray' | 'white'
  textColor?: 'white' | 'black' | 'gray'
  height?: 'small' | 'medium' | 'large' | 'full'
}

export interface ServiceItem {
  title: LocalizedString
  description?: LocalizedRichText
  icon?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  link?: string
}

export interface ServicesBlock {
  _type: 'servicesBlock'
  _key: string
  title?: LocalizedString
  subtitle?: LocalizedString
  services: ServiceItem[]
  layout?: 'grid-2' | 'grid-3' | 'grid-4' | 'list'
}

export type ContentBlock = TextBlock | TextImageBlock | HeroBlock | ServicesBlock

export interface Page {
  _id: string
  title: LocalizedString
  slug: {
    current: string
  }
  pageType: 'about' | 'contact' | 'team' | 'patent-attorneys' | 'legal-services' | 'business-consulting' | 'biomed' | 'services' | 'other'
  content?: ContentBlock[]
  subtitle?: LocalizedString
  excerpt?: LocalizedText
  services?: Service[]
  heroColor?: 'blue' | 'green' | 'purple' | 'teal' | 'red' | 'orange'
  featuredImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  showInNavigation?: boolean
  navigationOrder?: number
  seo?: SEO
}

export interface TeamMember {
  _id: string
  name: string
  slug?: {
    current: string
  }
  position: LocalizedString
  bio?: LocalizedRichText
  photo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  specializations?: Array<'patents' | 'trademarks' | 'design' | 'copyright' | 'eu-law' | 'litigation'>
  qualifications?: LocalizedRichText
  email?: string
  phone?: string
  languages?: string[]
  displayOrder?: number
  showOnWebsite?: boolean
}
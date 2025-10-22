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

export interface Page {
  _id: string
  title: LocalizedString
  slug: {
    current: string
  }
  pageType: 'about' | 'services' | 'contact' | 'team' | 'patents' | 'trademarks' | 'design' | 'other'
  content?: LocalizedRichText
  excerpt?: LocalizedText
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
export interface LocalizedString {
  pl: string
  en?: string
  zh?: string
  ko?: string
  ja?: string
  ru?: string
}

export interface LocalizedText {
  pl: string
  en?: string
  zh?: string
  ko?: string
  ja?: string
  ru?: string
}

export interface LocalizedRichText {
  pl: unknown[]
  en?: unknown[]
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
  link?: LinkField
}

export interface LinkField {
  text?: LocalizedString
  linkType?: 'internal' | 'external' | 'email' | 'phone'
  internalPath?: string
  externalUrl?: string
  email?: string
  phone?: string
  openInNewTab?: boolean
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
  link?: LinkField
}

export interface TextImageCarouselSlide {
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
  link?: LinkField
}

export interface TextImageCarouselBlock {
  _type: 'textImageCarouselBlock'
  _key: string
  title?: LocalizedString
  slides: TextImageCarouselSlide[]
  carouselSettings?: {
    autoplay?: boolean
    autoplayDelay?: number
    showPagination?: boolean
    showNavigation?: boolean
    loop?: boolean
  }
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
  backgroundColor?: 'primary' | 'dark' | 'light' | 'gray' | 'white'
  textColor?: 'white' | 'dark' | 'gray'
  height?: 'small' | 'medium' | 'large' | 'full'
  link?: LinkField
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

export interface BannerItem {
  _key: string
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  title?: LocalizedString
  content?: LocalizedRichText
  buttonText?: LocalizedString
  buttonLink?: string
  overlay?: boolean
}

export interface BannerBlock {
  _type: 'bannerBlock'
  _key: string
  items: BannerItem[]
  autoplay?: boolean
  showIndicators?: boolean
  height?: 'small' | 'medium' | 'large' | 'full'
}

export type ContentBlock = TextBlock | TextImageBlock | TextImageCarouselBlock | HeroBlock | ServicesBlock | BannerBlock

export interface Page {
  _id: string
  internalTitle: string
  slug: {
    current: string
  }
  pageType: 'homepage' | 'about' | 'contact' | 'team' | 'patent-attorneys' | 'legal-services' | 'business-consulting' | 'biomed' | 'services' | 'other'
  content?: ContentBlock[]
  services?: Service[]
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

export interface MenuItem {
  label: LocalizedString
  link: string
  isExternal?: boolean
  showInNavigation?: boolean
  order?: number
  subItems?: Array<{
    label: LocalizedString
    link: string
    isExternal?: boolean
  }>
}

export interface Navigation {
  _id: string
  title: string
  menuItems: MenuItem[]
  secondaryMenuItems?: MenuItem[]
  cta?: {
    show?: boolean
    text?: LocalizedString
    link?: string
    style?: 'primary' | 'secondary' | 'outline'
  }
}

export interface Homepage {
  _id: string
  content?: ContentBlock[]
  newsSection?: {
    title?: LocalizedString
    subtitle?: LocalizedString
    showFeaturedNews?: boolean
    maxArticles?: number
  }
  teamSection?: {
    title?: LocalizedString
    subtitle?: LocalizedString
    showTeam?: boolean
    maxMembers?: number
  }
  seo?: SEO
}
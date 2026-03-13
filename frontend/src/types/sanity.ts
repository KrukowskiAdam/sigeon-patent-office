import { TypedObject } from '@portabletext/types'

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

export interface EmailSettings {
  _id: string
  _type: 'emailSettings'
  title: string
  smtpHost: string
  smtpPort: number
  smtpSecure: boolean
  smtpUser: string
  smtpPass: string
  senderName: string
  isActive: boolean
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
  title: LocalizedStringNews
  slug: {
    current: string
  }
  publishedAt: string
  showPl?: boolean
  showEn?: boolean
  excerpt?: LocalizedTextNews
  featuredImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  content?: { pl: TypedObject[]; en?: TypedObject[] }
  tags?: string[]
  featured?: boolean
  seo?: SEO
}

export interface NewsPage {
  _type: 'newsPage'
  _id: string
  slug: {
    current: string
  }
  blocks?: ContentBlock[]
  buttons?: {
    readMore?: LocalizedString
    backToHome?: LocalizedString
  }
  seo?: SEO
}

export interface TeamPage {
  _type: 'teamPage'
  _id: string
  slug: {
    current: string
  }
  blocks?: ContentBlock[]
  teamSection?: {
    showTeam?: boolean
  }
  buttons?: {
    backToHome?: LocalizedString
  }
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
  expandButtonLabel?: LocalizedString
  collapseButtonLabel?: LocalizedString
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
  slides: TextImageCarouselSlide[]
  carouselSettings?: {
    autoplay?: boolean
    autoplayDelay?: number
    showPagination?: boolean
    showNavigation?: boolean
    loop?: boolean
  }
}

export interface TwoColumnTextBlock {
  _type: 'twoColumnTextBlock'
  _key: string
  leftColumn: Array<{
    _key: string
    title?: LocalizedString
    content: LocalizedRichText
    backgroundColor?: 'white' | 'gray'
  }>
  rightColumn: Array<{
    _key: string
    title?: LocalizedString
    content: LocalizedRichText
    backgroundColor?: 'white' | 'gray'
  }>
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

export interface CodeBlock {
  _type: 'codeBlock'
  _key: string
  title?: LocalizedString
  code: string
  description?: LocalizedText
}

export interface ContactBlock {
  _type: 'contactBlock'
  _key: string
}

export interface FooterBlock {
  _type: 'footerBlock'
  _key: string
  column1?: {
    title?: LocalizedString
    content?: LocalizedRichText
  }
  column2?: {
    title?: LocalizedString
    content?: LocalizedRichText
  }
  column3?: {
    title?: LocalizedString
    content?: LocalizedRichText
  }
  column4?: {
    title?: LocalizedString
    content?: LocalizedRichText
  }
}

export type ContentBlock = TextBlock | TextImageBlock | TextImageCarouselBlock | TwoColumnTextBlock | HeroBlock | ServicesBlock | BannerBlock | CodeBlock | ContactBlock | FooterBlock

export interface Page {
  _type: 'page'
  _id: string
  internalTitle: string
  slug: {
    current: string
  }
  content?: ContentBlock[]
  featuredImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  showInNavigation?: boolean
  navigationOrder?: number
  buttons?: {
    backToHome?: LocalizedString
  }
  seo?: SEO
}

export interface TeamMember {
  _id: string
  name: { pl: string; en?: string } | string
  position: { pl: string; en?: string }
  description?: { pl: TypedObject[]; en?: TypedObject[] }
  photo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  email?: string
  phone?: string
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
  menuItems: MenuItem[]
  secondaryMenuItems?: MenuItem[]
}

export interface Homepage {
  _id: string
  siteTitle: LocalizedString
  siteDescription: LocalizedText
  content?: ContentBlock[]
  newsSection?: {
    title?: LocalizedString
    subtitle?: LocalizedString
    readMoreLabel?: LocalizedString
    cta?: LinkField
    showFeaturedNews?: boolean
    maxArticles?: number
  }
  contactSection?: {
    title?: LocalizedString
    subtitle?: LocalizedString
    showContact?: boolean
    content?: ContentBlock[]
  }
  seo?: SEO
}

export interface FooterColumn {
  title: LocalizedString
  content: LocalizedText
  buttonText?: LocalizedString
  buttonUrl?: string
}

export interface Footer {
  _id: string
  column1: FooterColumn
  column2: FooterColumn
  column3: FooterColumn
  column4: FooterColumn
  copyrightText?: LocalizedString
}

// Publications types (using PL/EN only locale)
export interface LocalizedStringNews {
  pl: string
  en?: string
}

export interface LocalizedTextNews {
  pl: string
  en?: string
}

export interface LocalizedRichTextNews {
  pl: unknown[]
  en?: unknown[]
}

export interface Publication {
  _id: string
  title: {
    pl: string
    en?: string
  }
  slug: {
    current: string
  }
  excerpt?: {
    pl: string
    en?: string
  }
  content?: {
    pl: TypedObject[]
    en?: TypedObject[]
  }
  featuredImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: {
      pl: string
      en?: string
    }
    hotspot?: boolean
    crop?: unknown
  }
  authors?: Array<{
    _id: string
    name: string
    position: LocalizedString
    image?: {
      asset: {
        _id: string
        url: string
      }
    }
  }>
  publishedAt: string
  featured?: boolean
  showPl?: boolean
  showEn?: boolean
  tags?: string[]
  externalLink?: string
  seo?: SEO
}

export interface PublicationsPage {
  _type: 'publicationsPage'
  _id: string
  slug: {
    current: string
  }
  description?: {
    pl: string
    en?: string
  }
  blocks?: ContentBlock[]
  buttons?: {
    readMore?: LocalizedString
    backToPublications?: {
      pl: string
      en?: string
    }
    backToHome?: LocalizedString
  }
  featuredPublications?: Publication[]
  socialSharing?: {
    enableSharing?: boolean
    platforms?: {
      linkedin?: boolean
      facebook?: boolean
      twitter?: boolean
      email?: boolean
    }
    shareText?: {
      pl: string
      en?: string
    }
  }
  seo?: SEO
}
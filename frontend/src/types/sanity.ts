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
  showPl?: boolean
  showEn?: boolean
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

export interface NewsPage {
  _id: string
  blocks?: ContentBlock[]
  buttons?: {
    readMore?: LocalizedString
    backToHome?: LocalizedString
  }
  seo?: SEO
}

export interface TeamPage {
  _id: string
  blocks?: ContentBlock[]
  teamSection?: {
    title?: LocalizedString
    subtitle?: LocalizedText
    showTeam?: boolean
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

export interface TwoColumnTextBlock {
  _type: 'twoColumnTextBlock'
  _key: string
  leftColumn: {
    backgroundColor?: 'white' | 'gray'
    items: Array<{
      _key: string
      title?: LocalizedString
      content: LocalizedRichText
    }>
  }
  rightColumn: {
    backgroundColor?: 'white' | 'gray'
    items: Array<{
      _key: string
      title?: LocalizedString
      content: LocalizedRichText
    }>
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
  leftColumnTop: {
    pl: unknown[]
    en?: unknown[]
    de?: unknown[]
  }
  socialMedia?: {
    facebook?: string
    linkedin?: string
  }
  leftColumnBottom: {
    pl: unknown[]
    en?: unknown[]
    de?: unknown[]
  }
  contactForm: {
    title: LocalizedString
    formEmail: string
  }
  mapEmbedCode: string
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
  _id: string
  internalTitle: string
  slug: {
    current: string
  }
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
  position: LocalizedString
  description?: LocalizedRichText
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
  teamSection?: {
    title?: LocalizedString
    subtitle?: LocalizedString
    cta?: LinkField
    showTeam?: boolean
    maxMembers?: number
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
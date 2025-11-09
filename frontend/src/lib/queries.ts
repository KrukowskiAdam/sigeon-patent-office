import {client} from './sanity'
import {NewsArticle, NewsPage, TeamPage, Page, TeamMember, Homepage, Navigation, Footer, Publication, PublicationsPage} from '@/types/sanity'

// Get homepage content
export async function getNavigation(): Promise<Navigation | null> {
  return client.fetch(`
    *[_type == "navigation"][0] {
      _id,
      menuItems[] {
        label,
        link,
        isExternal,
        showInNavigation,
        order,
        subItems[] {
          label,
          link,
          isExternal
        }
      },
      secondaryMenuItems[] {
        label,
        link,
        isExternal,
        showInNavigation,
        order
      }
    }
  `)
}

export async function getHomepage(): Promise<Homepage | null> {
  return client.fetch(`
    *[_type == "homepage"][0] {
      _id,
      siteTitle,
      siteDescription,
      content[] {
        _type,
        _key,
        ...,
        _type == 'twoColumnTextBlock' => {
          leftColumn[] {
            _key,
            title,
            content,
            backgroundColor
          },
          rightColumn[] {
            _key,
            title,
            content,
            backgroundColor
          }
        }
      },
      featuredServices,
      newsSection,
      contactSection {
        title,
        subtitle,
        showContact,
        content[] {
          _type,
          _key,
          ...
        }
      },
      seo
    }
  `)
}

// Get all news articles
export async function getNews(): Promise<NewsArticle[]> {
  return client.fetch(`
    *[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      showPl,
      showEn,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      },
      tags,
      featured
    }
  `)
}

export async function getNewsPage(): Promise<NewsPage | null> {
  return client.fetch(`
    *[_type == "newsPage"][0] {
      _id,
      slug,
      title,
      buttons,
      blocks[] {
        _type,
        _key,
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            slug,
            title
          }
        }
      },
      seo
    }
  `)
}

// Get team page settings
export async function getTeamPage(): Promise<TeamPage | null> {
  return client.fetch(`
    *[_type == "teamPage"][0] {
      _id,
      slug,
      title,
      blocks[] {
        _type,
        _key,
        ...,
        link {
          ...,
          internalLink-> {
            _type,
            slug,
            title
          }
        }
      },
      teamSection,
      seo
    }
  `)
}

// Get featured news articles
export async function getFeaturedNews(): Promise<NewsArticle[]> {
  return client.fetch(`
    *[_type == "news" && defined(slug.current)] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      showPl,
      showEn,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      },
      tags,
      featured
    }
  `)
}

// Get single news article by slug
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  return client.fetch(`
    *[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      showPl,
      showEn,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      },
      gallery[] {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop,
        alt,
        caption
      },
      content,
      tags,
      featured,
      seo
    }
  `, {slug})
}

// Get all pages
export async function getPages(): Promise<Page[]> {
  return client.fetch(`
    *[_type == "page" && defined(slug.current)] | order(navigationOrder asc) {
      _id,
      internalTitle,
      slug,
      featuredImage,
      showInNavigation,
      navigationOrder
    }
  `)
}

// Get navigation pages
export async function getNavigationPages(): Promise<Page[]> {
  return client.fetch(`
    *[_type == "page" && showInNavigation == true && defined(slug.current)] | order(navigationOrder asc) {
      _id,
      internalTitle,
      slug,
      navigationOrder
    }
  `)
}

// Get single page by slug
export async function getPage(slug: string): Promise<Page | null> {
  return client.fetch(`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      internalTitle,
      slug,
      content[] {
        _type,
        _key,
        ...,
        _type == 'twoColumnTextBlock' => {
          leftColumn[] {
            _key,
            title,
            content,
            backgroundColor
          },
          rightColumn[] {
            _key,
            title,
            content,
            backgroundColor
          }
        },
        leftColumnTop,
        socialMedia {
          facebook,
          linkedin
        },
        leftColumnBottom,
        mapEmbedCode,
        mapTitle
      },
      featuredImage,
      showInNavigation,
      navigationOrder,
      buttons {
        backToHome
      },
      seo
    }
  `, {slug})
}

// Get all team members
export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(`
    *[_type == "teamMember"] | order(displayOrder asc) {
      _id,
      name,
      position,
      description,
      photo,
      email,
      phone,
      displayOrder,
      showOnWebsite
    }
  `)
}

// Get news page settings
export async function getNewsPageSettings(): Promise<{
  socialSharing?: {
    showSocialButtons?: boolean
    shareTitle?: {
      pl: string
      en?: string
    }
    showFacebook?: boolean
    showLinkedIn?: boolean
    showTwitter?: boolean
    customShareUrl?: string
  }
} | null> {
  return client.fetch(`
    *[_type == "newsPage"][0] {
      socialSharing {
        showSocialButtons,
        shareTitle,
        showFacebook,
        showLinkedIn,
        showTwitter,
        customShareUrl
      }
    }
  `)
}

// Get footer data
export async function getFooter(): Promise<Footer | null> {
  return client.fetch(`
    *[_type == "footer"][0] {
      _id,
      column1 {
        title,
        content,
        buttonText,
        buttonUrl
      },
      column2 {
        title,
        content,
        buttonText,
        buttonUrl
      },
      column3 {
        title,
        content,
        buttonText,
        buttonUrl
      },
      column4 {
        title,
        content,
        buttonText,
        buttonUrl
      },
      copyrightText
    }
  `)
}

// Publications queries
export async function getPublications(): Promise<Publication[]> {
  return client.fetch(`
    *[_type == "publications"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      featuredImage {
        asset-> {
          _id,
          url
        },
        alt,
        hotspot,
        crop
      },
      authors[]-> {
        name,
        position
      },
      tags,
      featured,
      showPl,
      showEn,
      externalLink
    }
  `)
}

export async function getPublicationsPage(): Promise<PublicationsPage | null> {
  return client.fetch(`
    *[_type == "publicationsPage"][0] {
      _id,
      slug,
      title,
      description,
      buttons,
      featuredPublications[]-> {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage {
          asset-> {
            _id,
            url
          },
          alt
        },
        authors[]-> {
          name,
          position
        }
      },
      socialSharing,
      seo
    }
  `)
}

export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  return client.fetch(`
    *[_type == "publications" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage {
        asset->{
          _id,
          url
        },
        alt,
        hotspot,
        crop
      },
      authors[]-> {
        _id,
        name,
        position,
        image {
          asset->{
            _id,
            url
          }
        }
      },
      publishedAt,
      featured,
      showPl,
      showEn,
      tags,
      externalLink,
      seo {
        title,
        description,
        image {
          asset->{
            url
          }
        },
        noIndex
      }
    }
  `, { slug })
}

export async function getPublicationsPageSettings(): Promise<{
  socialSharing?: {
    showSocialButtons?: boolean
    shareTitle?: {
      pl: string
      en?: string
    }
    showFacebook?: boolean
    showLinkedIn?: boolean
    showTwitter?: boolean
  }
} | null> {
  return client.fetch(`
    *[_type == "publicationsPage"][0] {
      socialSharing {
        showSocialButtons,
        shareTitle,
        showFacebook,
        showLinkedIn,
        showTwitter
      }
    }
  `)
}

// Get redirect page by slug
export async function getRedirectPage(slug: string): Promise<{
  destinationUrl: string;
  redirectType: string;
  isActive: boolean;
} | null> {
  return client.fetch(`
    *[_type == "redirectPage" && slug.current == $slug][0] {
      destinationUrl,
      redirectType,
      isActive
    }
  `, { slug })
}

// Get any CMS page by slug - unified query for all page types
export async function getCMSPageBySlug(slug: string) {
  // First try to find by slug in page settings
  const queries = [
    // News Page
    `*[_type == "newsPage" && slug.current == $slug][0] {
      _type,
      _id,
      slug,
      title,
      blocks,
      buttons,
      seo
    }`,
    
    // Team Page  
    `*[_type == "teamPage" && slug.current == $slug][0] {
      _type,
      _id,
      slug,
      title,
      blocks,
      teamSection,
      seo
    }`,
    
    // Publications Page
    `*[_type == "publicationsPage" && slug.current == $slug][0] {
      _type,
      _id,
      slug,
      title,
      description,
      blocks,
      buttons,
      socialSharing,
      seo
    }`,
    
    // Regular Page (existing)
    `*[_type == "page" && slug.current == $slug][0] {
      _type,
      _id,
      title,
      slug,
      content,
      buttons,
      seo
    }`
  ]

  // Try each query until we find a page
  for (const query of queries) {
    const result = await client.fetch(query, { slug })
    if (result) {
      return result
    }
  }
  
  return null
}
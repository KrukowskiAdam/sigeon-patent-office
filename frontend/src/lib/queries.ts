import {client} from './sanity'
import {NewsArticle, NewsPage, TeamPage, Page, TeamMember, Homepage, Navigation, Footer} from '@/types/sanity'

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
      teamSection {
        title,
        subtitle,
        showTeam
      },
      buttons {
        backToHome
      },
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
        contactForm {
          title,
          formEmail
        },
        mapEmbedCode
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
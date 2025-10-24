import {client} from './sanity'
import {NewsArticle, Page, TeamMember, Homepage, Navigation} from '@/types/sanity'

// Get homepage content
export async function getNavigation(): Promise<Navigation | null> {
  return client.fetch(`
    *[_type == "navigation"][0] {
      _id,
      title,
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
      },
      cta
    }
  `)
}

export async function getHomepage(): Promise<Homepage | null> {
  return client.fetch(`
    *[_type == "homepage"][0] {
      _id,
      content[] {
        _type,
        _key,
        ...
      },
      featuredServices,
      newsSection,
      teamSection,
      seo
    }
  `)
}

// Get all news articles
export async function getNews(): Promise<NewsArticle[]> {
  return client.fetch(`
    *[_type == "news" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      category,
      excerpt,
      featuredImage,
      tags,
      featured,
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
      category,
      excerpt,
      featuredImage,
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
      category,
      excerpt,
      featuredImage,
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
      pageType,
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
      pageType,
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
      pageType,
      content,
      services,
      featuredImage,
      showInNavigation,
      navigationOrder,
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
      slug,
      position,
      bio,
      photo,
      specializations,
      qualifications,
      email,
      phone,
      languages,
      displayOrder,
      showOnWebsite
    }
  `)
}

// Get single team member by slug
export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  return client.fetch(`
    *[_type == "teamMember" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      position,
      bio,
      photo,
      specializations,
      qualifications,
      email,
      phone,
      languages,
      displayOrder,
      showOnWebsite
    }
  `, {slug})
}
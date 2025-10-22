import {client} from './sanity'
import {NewsArticle, Page, TeamMember} from '@/types/sanity'

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
      title,
      slug,
      pageType,
      excerpt,
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
      title,
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
      title,
      slug,
      pageType,
      content,
      excerpt,
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
'use client'

import { useEffect, useState, use } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getCMSPageBySlug } from '@/lib/queries'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { notFound } from 'next/navigation'
import { 
  NewsPageComponent, 
  PublicationsPageComponent, 
  TeamPageComponent, 
  RegularPageComponent 
} from '@/components/pages'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  CMSPage,
  isNewsPage, 
  isPublicationsPage, 
  isTeamPage, 
  isRegularPage 
} from '@/lib/pageTypes'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function DynamicPage({ params }: PageProps) {
  const { currentLanguage } = useLanguage()
  const [page, setPage] = useState<CMSPage | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Unwrap params Promise with React.use()
  const resolvedParams = use(params)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const pageData = await getCMSPageBySlug(resolvedParams.slug)
        if (!pageData) {
          notFound()
          return
        }
        setPage(pageData)
      } catch (error) {
        console.error('Error loading page:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadPage()
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <LoadingSpinner />
      </div>
    )
  }

  if (!page) {
    return notFound()
  }

  // Render appropriate component based on page type
  const renderPageContent = () => {
    if (isNewsPage(page)) {
      return <NewsPageComponent page={page} currentLanguage={currentLanguage} />
    }
    
    if (isPublicationsPage(page)) {
      return <PublicationsPageComponent page={page} currentLanguage={currentLanguage} />
    }
    
    if (isTeamPage(page)) {
      return <TeamPageComponent page={page} currentLanguage={currentLanguage} />
    }
    
    if (isRegularPage(page)) {
      return <RegularPageComponent page={page} currentLanguage={currentLanguage} />
    }

    // Fallback - should never reach here
    return <div>Unknown page type</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="pt-0 flex-grow">
        {renderPageContent()}
      </main>

      <Footer />
    </div>
  )
}
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPublications, getPublicationsPage } from '@/lib/queries'
import type { Publication, PublicationsPage } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'

export async function generateMetadata(): Promise<Metadata> {
  const publicationsPage = await getPublicationsPage()
  
  if (!publicationsPage) {
    return {
      title: 'Publikacje - Sigeon',
      description: 'Publikacje naukowe i prawnicze zespołu Sigeon'
    }
  }

  return {
    title: publicationsPage.title.pl || 'Publikacje',
    description: publicationsPage.description?.pl || 'Publikacje naukowe i prawnicze zespołu Sigeon',
    openGraph: {
      title: publicationsPage.title.pl || 'Publikacje',
      description: publicationsPage.description?.pl || 'Publikacje naukowe i prawnicze zespołu Sigeon',
    },
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {publication.mainImage?.asset && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={urlFor(publication.mainImage.asset.url).width(600).height(400).url()}
            alt={publication.mainImage.alt?.pl || publication.title.pl}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <time dateTime={publication.publishedAt}>
            {formatDate(publication.publishedAt)}
          </time>
          {publication.authors && publication.authors.length > 0 && (
            <span>
              by {publication.authors.map(author => author.name).join(', ')}
            </span>
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          <Link href={`/publikacje/${publication.slug.current}`}>
            {publication.title.pl}
          </Link>
        </h2>
        
        {publication.excerpt?.pl && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {publication.excerpt.pl}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link 
            href={`/publikacje/${publication.slug.current}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Czytaj więcej
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {publication.tags && publication.tags.length > 0 && (
            <div className="flex gap-1">
              {publication.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default async function PublicationsPage() {
  const [publications, publicationsPage] = await Promise.all([
    getPublications(),
    getPublicationsPage()
  ])

  if (!publications && !publicationsPage) {
    notFound()
  }

  const featuredPublications = publicationsPage?.featuredPublications || []
  const regularPublications = publications.filter(pub => 
    !featuredPublications.some(featured => featured._id === pub._id)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {publicationsPage?.title?.pl || 'Publikacje'}
          </h1>
          {publicationsPage?.description?.pl && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {publicationsPage.description.pl}
            </p>
          )}
        </div>

        {/* Featured Publications */}
        {featuredPublications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Wyróżnione publikacje</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPublications.map((publication) => (
                <PublicationCard key={publication._id} publication={publication} />
              ))}
            </div>
          </section>
        )}

        {/* All Publications */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {featuredPublications.length > 0 ? 'Wszystkie publikacje' : 'Nasze publikacje'}
          </h2>
          
          {regularPublications.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPublications.map((publication) => (
                <PublicationCard key={publication._id} publication={publication} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Obecnie brak dostępnych publikacji.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
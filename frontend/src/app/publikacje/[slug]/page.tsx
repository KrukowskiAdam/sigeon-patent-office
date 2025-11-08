import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublicationBySlug, getPublicationsPage } from '@/lib/queries'
import { Publication } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const publication = await getPublicationBySlug(params.slug)
  
  if (!publication) {
    return {
      title: 'Publikacja nie znaleziona - Sigeon'
    }
  }

  return {
    title: `${publication.title.pl} - Publikacje Sigeon`,
    description: publication.excerpt?.pl || publication.title.pl,
    openGraph: {
      title: publication.title.pl,
      description: publication.excerpt?.pl || publication.title.pl,
      images: publication.mainImage?.asset ? [
        {
          url: urlFor(publication.mainImage.asset.url).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: publication.mainImage.alt?.pl || publication.title.pl,
        }
      ] : undefined,
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

function ShareButtons({ publication, socialSharing }: { 
  publication: Publication
  socialSharing?: {
    enableSharing?: boolean
    platforms?: {
      linkedin?: boolean
      facebook?: boolean
      twitter?: boolean
      email?: boolean
    }
    shareText?: { pl?: string; en?: string }
  }
}) {
  if (!socialSharing?.enableSharing) return null

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = socialSharing.shareText?.pl || 'Sprawdź tę publikację'

  const platforms = [
    {
      name: 'LinkedIn',
      enabled: socialSharing.platforms?.linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      enabled: socialSharing.platforms?.facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Twitter/X',
      enabled: socialSharing.platforms?.twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}: ${publication.title.pl}`)}&url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      enabled: socialSharing.platforms?.email,
      url: `mailto:?subject=${encodeURIComponent(publication.title.pl)}&body=${encodeURIComponent(`${shareText}: ${shareUrl}`)}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 mr-2">{shareText}:</span>
      {platforms.filter(p => p.enabled).map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          title={`Share on ${platform.name}`}
        >
          {platform.icon}
        </a>
      ))}
    </div>
  )
}

export default async function PublicationDetailPage({ params }: Props) {
  const [publication, publicationsPage] = await Promise.all([
    getPublicationBySlug(params.slug),
    getPublicationsPage()
  ])

  if (!publication) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">Strona główna</Link>
          <span>/</span>
          <Link href="/publikacje" className="hover:text-gray-700">Publikacje</Link>
          <span>/</span>
          <span className="text-gray-900">{publication.title.pl}</span>
        </nav>

        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <header className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <time dateTime={publication.publishedAt}>
                {formatDate(publication.publishedAt)}
              </time>
              {publication.authors && publication.authors.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <span>Autorzy:</span>
                    <div className="flex gap-2">
                      {publication.authors.map((author, index) => (
                        <span key={author._id} className="font-medium text-gray-700">
                          {author.name}{index < publication.authors!.length - 1 && ','}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {publication.title.pl}
            </h1>

            {publication.excerpt?.pl && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {publication.excerpt.pl}
              </p>
            )}

            {/* Tags */}
            {publication.tags && publication.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {publication.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {publication.mainImage?.asset && (
            <div className="aspect-video relative">
              <Image
                src={urlFor(publication.mainImage.asset.url).width(1200).height(600).url()}
                alt={publication.mainImage.alt?.pl || publication.title.pl}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {publication.content?.pl && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={publication.content.pl as unknown as any} />
              </div>
            )}

            {/* External Link */}
            {publication.externalLink && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Pełna publikacja dostępna zewnętrznie:</p>
                <a
                  href={publication.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Przejdź do pełnej publikacji
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {/* Social Sharing */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <ShareButtons 
                publication={publication} 
                socialSharing={publicationsPage?.socialSharing}
              />
            </div>
          </div>
        </article>

        {/* Back to Publications */}
        <div className="max-w-4xl mx-auto mt-8">
          <Link
            href="/publikacje"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Powrót do publikacji
          </Link>
        </div>
      </div>
    </div>
  )
}
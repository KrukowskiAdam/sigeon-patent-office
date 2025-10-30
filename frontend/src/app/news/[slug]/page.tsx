import { getNewsArticle, getNews } from '@/lib/queries'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const news = await getNews()
  return news.map((article) => ({
    slug: article.slug.current,
  }))
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#0abaee]">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/news" className="hover:text-[#0abaee]">Aktualności</Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900">{article.title.pl}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <main className="py-12">
        <article className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <header className="mb-8">
            {article.category && (
              <div className="mb-4">
                <span className="inline-block bg-[#0abaee]/10 text-[#0891b2] px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                {article.featured && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                    Wyróżnione
                  </span>
                )}
              </div>
            )}
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title.pl}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('pl-PL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {article.excerpt && (
              <div className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-[#0abaee] pl-6">
                {article.excerpt.pl}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-8">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={urlFor(article.featuredImage).width(800).height(450).url()}
                  alt={article.title.pl}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          {article.content && article.content.pl && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={article.content.pl as never} />
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Udostępnij</h3>
            <div className="flex gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://sigeon.vercel.app/news/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006399] text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://sigeon.vercel.app/news/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#145dbf] text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tagi</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

      </main>

      {/* Navigation */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
            >
              Powrót do aktualności
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
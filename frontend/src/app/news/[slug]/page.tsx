import { getNewsArticle, getNews } from '@/lib/queries'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Patent Office
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-blue-200">Home</Link>
              <Link href="/news" className="hover:text-blue-200">News</Link>
              <Link href="/team" className="hover:text-blue-200">Team</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/news" className="hover:text-blue-600">Aktualności</Link>
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
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
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
              <div className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-blue-500 pl-6">
                {article.excerpt.pl}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={urlFor(article.featuredImage).width(800).height(450).url()}
                  alt={article.title.pl}
                  fill
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

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
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

        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Powrót do aktualności
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 Patent Office. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  )
}
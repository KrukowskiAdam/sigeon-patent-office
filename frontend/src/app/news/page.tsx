import { getNews } from '@/lib/queries'
import { NewsArticle } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export default async function NewsPage() {
  const news = await getNews()

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
              <Link href="/news" className="text-blue-200">News</Link>
              <Link href="/team" className="hover:text-blue-200">Team</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Aktualności</h1>
          
          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Brak aktualności do wyświetlenia.</p>
              <p className="text-gray-500 mt-2">Dodaj pierwszą aktualność w Sanity Studio.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article: NewsArticle) => (
                <article key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {article.featuredImage && (
                    <div className="h-48 relative">
                      <Image
                        src={urlFor(article.featuredImage).width(400).height(200).url()}
                        alt={article.title.pl}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      {article.category && (
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {article.category}
                        </span>
                      )}
                      {article.featured && (
                        <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Wyróżnione
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {article.title.pl}
                    </h2>
                    
                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt.pl}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                      </time>
                      <Link 
                        href={`/news/${article.slug.current}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Czytaj więcej →
                      </Link>
                    </div>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
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
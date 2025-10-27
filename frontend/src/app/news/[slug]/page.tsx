import { getNewsArticle, getNews } from '@/lib/queries'
import { Header } from '@/components/Header'
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
        <div className="max-w-4xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200 text-center">
          <Link 
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0abaee] text-white font-medium rounded-lg hover:bg-[#0891b2] transition-colors duration-200"
          >
            Powrót do aktualności
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0abaee] text-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Grzelak i Wspólnicy, Kancelaria Patentowo-Prawna</h3>
              <p className="text-blue-100">
                Ochrona własności przemysłowej i intelektualnej, obsługa prawna i biznesowa firm i instytucji
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Usługi</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Rzecznicy patentowi</li>
                <li>Usługi prawne</li>
                <li>Doradztwo biznesowe IP</li>
                <li>Biomed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Firma</h4>
              <ul className="space-y-2 text-blue-100">
                <li><Link href="/about" className="hover:text-white">O nas</Link></li>
                <li><Link href="/team" className="hover:text-white">Zespół</Link></li>
                <li><Link href="/news" className="hover:text-white">Aktualności</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-blue-100">
                ul. Przykładowa 123<br />
                00-001 Warszawa<br />
                Tel: +48 123 456 789
              </p>
            </div>
          </div>
          <div className="border-t border-blue-600 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Grzelak i Wspólnicy, Kancelaria Patentowo-Prawna. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
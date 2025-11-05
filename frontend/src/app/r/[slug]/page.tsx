import { notFound, redirect, permanentRedirect } from 'next/navigation'
import { getRedirectPage } from '@/lib/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface RedirectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { slug } = await params
  
  const redirectData = await getRedirectPage(slug)

  // If redirect doesn't exist or is not active, show 404
  if (!redirectData || !redirectData.isActive) {
    notFound()
  }

  // Perform redirect with appropriate status code
  // 301 = permanent, 302 = temporary (default)
  if (redirectData.redirectType === '301') {
    permanentRedirect(redirectData.destinationUrl)
  }
  
  redirect(redirectData.destinationUrl)
}

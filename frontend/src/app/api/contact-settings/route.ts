import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    const settings = await client.fetch(`
      *[_type == "contactSettings" && _id == "contact-settings"][0] {
        leftColumnTop,
        socialMedia,
        leftColumnBottom,
        contactForm,
        mapEmbedCode,
        mapTitle
      }
    `)

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching contact settings:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

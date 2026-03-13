import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    const footer = await client.fetch(`
      *[_type == "footer"][0] {
        _id,
        column1 {
          title,
          content,
          buttonText,
          buttonUrl
        },
        column2 {
          title,
          content,
          buttonText,
          buttonUrl
        },
        column3 {
          title,
          content,
          buttonText,
          buttonUrl
        },
        column4 {
          title,
          content,
          buttonText,
          buttonUrl
        },
        copyrightText
      }
    `)

    return NextResponse.json(footer)
  } catch (error) {
    console.error('Error fetching footer:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

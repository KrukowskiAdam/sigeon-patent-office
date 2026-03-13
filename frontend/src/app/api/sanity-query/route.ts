import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const query = typeof body?.query === 'string' ? body.query : ''
    const params = body?.params && typeof body.params === 'object' ? body.params : undefined

    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 })
    }

    const result = await client.fetch(query, params)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Sanity proxy error:', error)
    return NextResponse.json({ error: 'Failed to execute Sanity query' }, { status: 500 })
  }
}

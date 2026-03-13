import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'pofl8c47',
  dataset: 'production', 
  useCdn: true, // Włączone CDN dla lepszej wydajności na produkcji
  apiVersion: '2023-05-03',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Token dla autoryzowanych zapytań
})

const directFetch = client.fetch.bind(client)

client.fetch = (async (query: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    const response = await fetch('/api/sanity-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, params }),
    })

    if (!response.ok) {
      throw new Error(`Sanity proxy request failed with status ${response.status}`)
    }

    return response.json()
  }

  return directFetch(query, params)
}) as typeof client.fetch

const builder = imageUrlBuilder(client)

export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source)
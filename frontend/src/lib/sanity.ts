import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'pofl8c47',
  dataset: 'production', 
  useCdn: false, // Wyłączone CDN - używa api.sanity.io zamiast apicdn.sanity.io
  apiVersion: '2023-05-03',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Token dla autoryzowanych zapytań
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source)
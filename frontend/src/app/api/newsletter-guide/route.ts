import { NextResponse } from 'next/server'

export async function GET() {
  const instructions = {
    title: 'Newsletter Assets - Image URLs Guide',
    description: 'How to get image URLs from Sanity for newsletters',
    steps: [
      {
        step: 1,
        title: 'Upload images in Sanity Studio',
        description: 'Go to Newsletter Assets in Sanity Studio and upload your images'
      },
      {
        step: 2,
        title: 'Get Sanity URL',
        description: 'Right-click on image → Copy image URL',
        example: 'https://cdn.sanity.io/images/pofl8c47/production/abc123-500x300.jpg'
      },
      {
        step: 3,
        title: 'Convert to your domain',
        description: 'Replace the Sanity domain with your domain',
        from: 'https://cdn.sanity.io/images/pofl8c47/production/',
        to: 'https://sigeon.vercel.app/images/',
        result: 'https://sigeon.vercel.app/images/abc123-500x300.jpg'
      },
      {
        step: 4,
        title: 'Add optimization parameters (optional)',
        description: 'Add width and height for automatic resizing',
        example: 'https://sigeon.vercel.app/images/abc123.jpg?w=500&h=300'
      }
    ],
    testUrls: {
      info: 'Test these example URLs to see if proxy works:',
      examples: [
        'https://sigeon.vercel.app/images/test-image.jpg',
        'https://sigeon.vercel.app/images/test-image.jpg?w=300&h=200'
      ]
    },
    tips: [
      'Logo images: keep under 200px height for emails',
      'Header images: 600px width works well in most email clients',
      'Social icons: 32x32px or 48x48px are optimal',
      'Always include alt text for accessibility',
      'Test in multiple email clients before sending'
    ]
  }

  return NextResponse.json(instructions, { status: 200 })
}
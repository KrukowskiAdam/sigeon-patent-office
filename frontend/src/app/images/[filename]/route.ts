import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

// Get newsletter images with filename mapping
async function getImageMapping() {
  try {
    const result = await client.fetch(`
      *[_type == "newsletterAssets"][0] {
        "images": images[] {
          originalFilename,
          "sanityUrl": asset->url
        }
      }
    `)
    
    const mapping: Record<string, string> = {}
    
    if (result?.images) {
      result.images.forEach((img: { originalFilename?: string; sanityUrl?: string }) => {
        if (img.originalFilename && img.sanityUrl) {
          mapping[img.originalFilename] = img.sanityUrl
        }
      })
    }
    
    return mapping
  } catch (error) {
    console.error('Error fetching image mapping:', error)
    return {}
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const resolvedParams = await params
  const filename = resolvedParams.filename
  
  if (!filename) {
    return new NextResponse('Filename required', { status: 400 })
  }

  try {
    // Get mapping of original filenames to Sanity URLs
    const mapping = await getImageMapping()
    const sanityUrl = mapping[filename]
    
    if (!sanityUrl) {
      return new NextResponse(`Image not found: ${filename}`, { status: 404 })
    }

    // Fetch the image from Sanity
    const imageResponse = await fetch(sanityUrl)
    
    if (!imageResponse.ok) {
      return new NextResponse('Image not available', { status: 404 })
    }

    // Get the image data
    const imageBuffer = await imageResponse.arrayBuffer()
    
    // Determine content type from filename extension
    const extension = filename.split('.').pop()?.toLowerCase()
    let contentType = 'application/octet-stream'
    
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg'
        break
      case 'png':
        contentType = 'image/png'
        break
      case 'gif':
        contentType = 'image/gif'
        break
      case 'webp':
        contentType = 'image/webp'
        break
      case 'svg':
        contentType = 'image/svg+xml'
        break
    }

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error serving image:', error)
    return new NextResponse('Server error', { status: 500 })
  }
}
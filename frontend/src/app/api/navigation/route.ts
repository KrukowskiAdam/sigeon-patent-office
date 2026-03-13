import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    const navigation = await client.fetch(`
      *[_type == "navigation"][0] {
        _id,
        menuItems[] {
          label,
          link,
          isExternal,
          showInNavigation,
          order,
          subItems[] {
            label,
            link,
            isExternal
          }
        },
        secondaryMenuItems[] {
          label,
          link,
          isExternal,
          showInNavigation,
          order
        }
      }
    `)

    return NextResponse.json(navigation)
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

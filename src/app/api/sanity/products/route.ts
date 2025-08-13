import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import * as queries from '@/../sanity/queries'
import { convertSanityProduct } from '@/lib/sanity-helpers'

export async function GET() {
  try {
    const serverClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: '2023-05-03',
      useCdn: false,
      token: process.env.SANITY_READ_TOKEN,
    })
    const products = await serverClient.fetch(queries.getAllProducts)
    const mapped = products.map(convertSanityProduct)
    return NextResponse.json(mapped, { status: 200 })
  } catch (error) {
    console.error('API: Failed to fetch products from Sanity', error)
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}



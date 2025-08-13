import { NextResponse } from 'next/server'
import { client } from '@/../sanity/client'
import * as queries from '@/../sanity/queries'
import { convertSanityProduct } from '@/lib/sanity-helpers'

export async function GET() {
  try {
    const products = await client.fetch(queries.getAllProducts)
    const mapped = products.map(convertSanityProduct)
    return NextResponse.json(mapped, { status: 200 })
  } catch (error) {
    console.error('API: Failed to fetch products from Sanity', error)
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}



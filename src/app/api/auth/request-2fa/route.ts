// Deprecated: kept to avoid 404s if client still calls it. Always return 410.
import { NextResponse } from 'next/server'
export async function POST() {
  return NextResponse.json({ error: 'Deprecated' }, { status: 410 })
}



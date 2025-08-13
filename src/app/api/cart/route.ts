import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/options'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ items: [] })
  const userId = (session as any).user.id
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  })
  return NextResponse.json({ items: cart?.items ?? [] })
}



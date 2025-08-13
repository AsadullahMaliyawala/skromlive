import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/options'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!session?.user?.id) return NextResponse.json({ items: [] })
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: true },
  })
  return NextResponse.json({ items: cart?.items ?? [] })
}



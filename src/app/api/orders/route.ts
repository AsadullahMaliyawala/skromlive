import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/options'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!session?.user?.id) return NextResponse.json({ orders: [] })
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ orders })
}



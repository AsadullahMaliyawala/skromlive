import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/options'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { productId, title, price, image, quantity = 1 } = body
  const userId = (session as any).user.id
  let cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  })
  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      title,
      price,
      image,
      quantity,
    },
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await prisma.cartItem.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}



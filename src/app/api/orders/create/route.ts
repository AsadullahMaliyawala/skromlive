import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/options'

export async function POST() {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session as any).user.id
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  })
  if (!cart || cart.items.length === 0)
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

  const subtotal = cart.items.reduce((s, i) => s + Number(i.price) * i.quantity, 0)
  const shipping = 0
  const tax = 0
  const total = subtotal + shipping + tax

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId,
        subtotal,
        shipping,
        tax,
        total,
      },
    })
    await tx.orderItem.createMany({
      data: cart.items.map((i) => ({
        orderId: created.id,
        productId: i.productId,
        title: i.title,
        price: i.price,
        image: i.image || null,
        quantity: i.quantity,
      })),
    })
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
    return created
  })

  return NextResponse.json({ orderId: order.id })
}



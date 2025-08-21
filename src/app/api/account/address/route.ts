import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/options'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session as any).user.id as string
  
  // Check if user exists
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found. Please log in again.' }, { status: 404 })
  }
  
  const addresses = await prisma.address.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ addresses })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session as any).user.id as string
  
  // Check if user exists
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found. Please log in again.' }, { status: 404 })
  }
  
  const body = await req.json().catch(() => null)
  if (!body || !body.fullName || !body.line1 || !body.city || !body.country) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const created = await prisma.address.create({ data: { userId, type: body.type ?? 'SHIPPING', fullName: body.fullName, line1: body.line1, line2: body.line2 ?? null, city: body.city, state: body.state ?? null, postal: body.postal ?? null, country: body.country, phone: body.phone ?? null } })
  return NextResponse.json({ address: created }, { status: 201 })
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session as any).user.id as string
  
  // Check if user exists
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found. Please log in again.' }, { status: 404 })
  }
  
  const body = await req.json().catch(() => null)
  if (!body || !body.id) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  const { id, ...data } = body
  const updated = await prisma.address.update({ where: { id }, data: { ...data, userId } })
  return NextResponse.json({ address: updated })
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session as any).user.id as string
  
  // Check if user exists
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ error: 'User not found. Please log in again.' }, { status: 404 })
  }
  
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await prisma.address.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}



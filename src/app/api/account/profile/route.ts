import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/options'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session as any).user.id as string
  
  const user = await prisma.user.findUnique({ 
    where: { id: userId }, 
    select: { 
      id: true, 
      name: true, 
      firstName: true,
      lastName: true,
      country: true,
      email: true, 
      image: true 
    } 
  })
  
  if (!user) {
    return NextResponse.json({ error: 'User not found. Please log in again.' }, { status: 404 })
  }
  
  return NextResponse.json({ user })
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!(session as any)?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session as any).user.id as string

  // First check if user exists
  const existingUser = await prisma.user.findUnique({ where: { id: userId } })
  if (!existingUser) {
    return NextResponse.json({ error: 'User not found. Please log in again.' }, { status: 404 })
  }

  const body = await req.json().catch(() => ({}))
  const firstName: string | undefined = body?.firstName
  const lastName: string | undefined = body?.lastName
  const country: string | undefined = body?.country
  
  if (typeof firstName !== 'string' || firstName.trim().length < 1) {
    return NextResponse.json({ error: 'Invalid firstName' }, { status: 400 })
  }

  if (typeof lastName !== 'string' || lastName.trim().length < 1) {
    return NextResponse.json({ error: 'Invalid lastName' }, { status: 400 })
  }

  // Construct the full name from firstName and lastName
  const name = `${firstName} ${lastName}`.trim()

  const user = await prisma.user.update({ 
    where: { id: userId }, 
    data: { 
      name,
      firstName,
      lastName,
      country: country || '0'
    } 
  })
  
  return NextResponse.json({ 
    ok: true, 
    user: { 
      id: user.id, 
      name: user.name, 
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      email: user.email 
    }
  })
}



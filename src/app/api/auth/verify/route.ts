import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = schema.safeParse(json)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    const email = parsed.data.email.toLowerCase()
    const code = parsed.data.code

    const token = await prisma.verificationToken.findUnique({
      where: { identifier_token: { identifier: email, token: code } },
    })

    if (!token || token.expires < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    await prisma.user.update({ where: { email }, data: { emailVerified: new Date() } })
    await prisma.verificationToken.delete({ where: { identifier_token: { identifier: email, token: code } } })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('verify error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}



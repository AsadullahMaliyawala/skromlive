import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { sendVerificationCodeEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 409 })

    const hash = await bcrypt.hash(password, 10)
    await prisma.user.create({ data: { name, email, password: hash } })

    // Create a verification token and send email
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = new Date(Date.now() + 10 * 60 * 1000)
    await prisma.verificationToken.upsert({
      where: { identifier_token: { identifier: email, token: code } },
      create: { identifier: email, token: code, expires },
      update: { expires },
    })
    await sendVerificationCodeEmail({ to: email, code }).catch(() => {})

    return NextResponse.json({ ok: true, needsVerification: true })
  } catch (e) {
    console.error('Signup error', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}



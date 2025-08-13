import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-change-me',
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials)
        if (!parsed.success) return null
        const email = parsed.data.email.toLowerCase()
        const password = parsed.data.password

        try {
          const user = await prisma.user.findUnique({ where: { email } })
          if (!user) return null

          // Require verified email
          if (!user.emailVerified) {
            throw new Error('EMAIL_NOT_VERIFIED')
          }

          const ok = await bcrypt.compare(password, user.password)
          if (!ok) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name || null,
            image: user.image || null,
          }
        } catch (error) {
          if ((error as Error).message === 'EMAIL_NOT_VERIFIED') {
            throw error
          }
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.userId = (user as any).id
      return token
    },
    async session({ session, token }) {
      if (token?.userId) (session as any).user.id = token.userId as string
      return session
    },
  },
}



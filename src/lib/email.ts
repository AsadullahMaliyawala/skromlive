type SendEmailArgs = { to: string; code: string }

// Sends via Resend if RESEND_API_KEY is present; otherwise logs to console (dev fallback)
export async function sendVerificationCodeEmail({ to, code }: SendEmailArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'onboarding@resend.dev'

  if (!apiKey) {
    console.log(`2FA code for ${to}: ${code}`)
    return
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from,
      to,
      subject: 'Your verification code',
      text: `Your verification code is ${code}. It expires in 10 minutes.`,
    })
  } catch (err) {
    console.error('Email send failed, falling back to console log:', err)
    console.log(`2FA code for ${to}: ${code}`)
  }
}



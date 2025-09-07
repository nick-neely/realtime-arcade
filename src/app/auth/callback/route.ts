import { createSupabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }
  if (code) {
    const supabase = await createSupabaseServer()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
      const redirectOrigin = isLocalEnv ? origin : (siteUrl ?? origin)
      return NextResponse.redirect(`${redirectOrigin}${next}`)
    }
  }
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

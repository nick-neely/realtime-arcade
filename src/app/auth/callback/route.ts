import { getServerSideURL } from '@/lib/getURL'
import { createSupabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
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
      const siteUrl = getServerSideURL()
      return NextResponse.redirect(`${siteUrl}${next}`)
    }
  }
  // return the user to an error page with instructions
  const siteUrl = getServerSideURL()
  return NextResponse.redirect(`${siteUrl}/auth/auth-code-error`)
}

import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function requireUser() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  return { supabase, user }
}

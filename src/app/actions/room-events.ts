'use server'

import { createClient } from '@supabase/supabase-js'

const admin = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function appendEvent(
  roomId: string,
  userId: string,
  type: string,
  payload: Record<string, unknown>,
) {
  const sb = admin()
  const { error } = await sb
    .from('room_events')
    .insert({ room_id: roomId, user_id: userId, type, payload })
  if (error) throw error
}

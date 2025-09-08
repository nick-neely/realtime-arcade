import { notFound } from 'next/navigation'
import { requireUser } from '@/lib/auth/requireUser'
import { GAME_REGISTRY } from '@/lib/games/registry'

export const runtime = 'nodejs'

export default async function GameRoom({
  params,
}: {
  params: Promise<{ slug: string; roomId: string }>
}) {
  const { slug, roomId } = await params
  console.log('[GameRoom] params', { slug, roomId })
  const { supabase, user } = await requireUser()
  console.log('[GameRoom] user', user.id)
  const def = GAME_REGISTRY[slug]
  if (!def) notFound()

  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .select('id, status, game_id')
    .eq('id', roomId)
    .single()
  console.log('[GameRoom] room query', { room, roomError })
  if (roomError || !room) notFound()

  // Ensure the viewer is a member, else join them
  const { data: membership, error: membershipError } = await supabase
    .from('room_players')
    .select('id')
    .eq('room_id', roomId)
    .eq('user_id', user.id)
    .maybeSingle()
  console.log('[GameRoom] membership check', { membership, membershipError })

  if (!membership) {
    const { error: joinError } = await supabase
      .from('room_players')
      .insert({ room_id: roomId, user_id: user.id })
    console.log('[GameRoom] join attempt', { joinError })
  }

  const GameClient = (await def.load()).default

  return (
    <div className="flex h-screen w-full flex-col">
      {/* Top bar: room info, leave, copy link */}
      <div className="flex items-center justify-between border-b p-3">
        <div className="font-medium">{def.name}</div>
        <div className="text-muted-foreground text-sm">Room {roomId.slice(0, 8)}</div>
      </div>
      <GameClient roomId={roomId} />
    </div>
  )
}

import type { Tables } from '@/lib/supabase/database.types'
import { createSupabaseServer } from '@/lib/supabase/server'
import { PlayPageClient } from './PlayPageClient'

export default async function Play() {
  const supabase = await createSupabaseServer()

  type RoomListRow = Pick<Tables<'rooms'>, 'id' | 'status'> & {
    games: Pick<Tables<'games'>, 'name' | 'slug'>
  }

  const { data } = await supabase
    .from('rooms')
    .select('id, status, games(name, slug)')
    .eq('visibility', 'public')
    .neq('status', 'ended')
    .order('created_at', { ascending: false })
    .limit(20)
  const rooms = (data ?? null) as RoomListRow[] | null

  return (
    <div className="bg-background min-h-screen">
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <PlayPageClient rooms={rooms} />
      </section>
    </div>
  )
}

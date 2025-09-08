import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import type { Tables } from '@/lib/supabase/database.types'
import { createSupabaseServer } from '@/lib/supabase/server'
import { Gamepad2, Plus, Users } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPlay() {
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Browse Public Rooms</h1>
          <p className="text-muted-foreground">Join active games and play with other players</p>
        </div>
        <Button asChild>
          <Link href="/dashboard">
            <Plus className="mr-2 h-4 w-4" />
            Create Room
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {rooms && rooms.length > 0 ? (
          <div className="grid gap-4">
            {rooms.map((r: RoomListRow) => (
              <Card
                key={r.id}
                className="border-foreground bg-card flex items-center justify-between rounded-none border-2 p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 border-foreground flex h-10 w-10 items-center justify-center rounded-none border-2 shadow-xs">
                    <Gamepad2 className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold">{r.games.name}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                      Status: {r.status}
                    </CardDescription>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/games/${r.games.slug}/${r.id}`}>
                    <Users className="mr-2 h-4 w-4" />
                    Join Room
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="bg-muted border-foreground mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none border-2 shadow-xs">
              <Gamepad2 className="text-muted-foreground h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No active rooms</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to create a room and start playing!
            </p>
            <Button asChild>
              <Link href="/dashboard">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Room
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

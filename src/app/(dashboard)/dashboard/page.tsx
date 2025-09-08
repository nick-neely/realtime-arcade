import { createRoomAction } from '@/app/(dashboard)/dashboard/actions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { requireUser } from '@/lib/auth/requireUser'
import type { Tables } from '@/lib/supabase/database.types'
import Link from 'next/link'

export const runtime = 'nodejs'

export default async function Dashboard() {
  const { supabase, user } = await requireUser()
  console.log('[Dashboard] user', user.id)

  const { data: gamesData, error: gamesError } = await supabase
    .from('games')
    .select('*')
    .order('name')
  console.log('[Dashboard] games', {
    error: gamesError,
    count: gamesData?.length,
  })
  const games = (gamesData ?? null) as Tables<'games'>[] | null

  type MyRoom = Tables<'rooms'> & {
    games: Pick<Tables<'games'>, 'name' | 'slug'>
  }

  const { data: myRoomsData, error: myRoomsError } = await supabase
    .from('rooms')
    .select('*, games(name, slug)')
    .eq('host_user_id', user.id)
    .order('created_at', { ascending: false })
  console.log('[Dashboard] myRooms', {
    error: myRoomsError,
    count: myRoomsData?.length,
  })
  const myRooms = (myRoomsData ?? null) as MyRoom[] | null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Arcade Hub</h1>
        <p className="text-muted-foreground">Create rooms and manage your games</p>
      </div>

      <section>
        <h2 className="mb-2 text-lg font-medium">Create a room</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {games?.map((g: Tables<'games'>) => (
            <Card key={g.id} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium">{g.name}</div>
                <div className="text-muted-foreground text-sm">
                  Players {g.min_players} to {g.max_players}
                </div>
              </div>
              <form action={createRoomAction.bind(null, g.id)}>
                <Button size="sm" type="submit">
                  Create
                </Button>
              </form>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-medium">Your recent rooms</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {myRooms?.map((r: MyRoom) => (
            <Card key={r.id} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium">{r.games.name}</div>
                <div className="text-muted-foreground text-sm">Status {r.status}</div>
              </div>
              <Link href={`/games/${r.games.slug}/${r.id}`} className="text-sm underline">
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

import { requireUser } from "@/lib/auth/requireUser";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createRoomAction } from "@/app/dashboard/actions";
import type { Tables } from "@/lib/supabase/database.types";

export const runtime = "nodejs";

export default async function Dashboard() {
  const { supabase, user } = await requireUser();
  console.log("[Dashboard] user", user.id);

  const { data: gamesData, error: gamesError } = await supabase
    .from("games")
    .select("*")
    .order("name");
  console.log("[Dashboard] games", { error: gamesError, count: gamesData?.length });
  const games = (gamesData ?? null) as Tables<"games">[] | null;

  type MyRoom = Tables<"rooms"> & {
    games: Pick<Tables<"games">, "name" | "slug">;
  };

  const { data: myRoomsData, error: myRoomsError } = await supabase
    .from("rooms")
    .select("*, games(name, slug)")
    .eq("host_user_id", user.id)
    .order("created_at", { ascending: false });
  console.log("[Dashboard] myRooms", { error: myRoomsError, count: myRoomsData?.length });
  const myRooms = (myRoomsData ?? null) as MyRoom[] | null;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Arcade Hub</h1>

      <section>
        <h2 className="mb-2 text-lg font-medium">Create a room</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {games?.map((g: Tables<"games">) => (
            <Card key={g.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{g.name}</div>
                <div className="text-sm text-muted-foreground">
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
        <div className="grid sm:grid-cols-2 gap-3">
          {myRooms?.map((r: MyRoom) => (
            <Card key={r.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.games.name}</div>
                <div className="text-sm text-muted-foreground">
                  Status {r.status}
                </div>
              </div>
              <Link
                href={`/games/${r.games.slug}/${r.id}`}
                className="text-sm underline"
              >
                Open
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { Tables } from "@/lib/supabase/database.types";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Gamepad2, Users } from "lucide-react";
import Link from "next/link";

export default async function Play() {
  const supabase = await createSupabaseServer();
  type RoomListRow = Pick<Tables<"rooms">, "id" | "status"> & {
    games: Pick<Tables<"games">, "name" | "slug">;
  };

  const { data } = await supabase
    .from("rooms")
    .select("id, status, games(name, slug)")
    .eq("visibility", "public")
    .neq("status", "ended")
    .order("created_at", { ascending: false })
    .limit(20);
  const rooms = (data ?? null) as RoomListRow[] | null;

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Browse Public Rooms</h1>
            <p className="text-xl text-muted-foreground">
              Join active games and play with other players
            </p>
          </div>

          <div className="space-y-4">
            {rooms && rooms.length > 0 ? (
              <div className="grid gap-4">
                {rooms.map((r: RoomListRow) => (
                  <Card
                    key={r.id}
                    className="flex items-center justify-between border-2 border-foreground rounded-none p-4 bg-card"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 border-2 border-foreground rounded-none flex items-center justify-center shadow-xs">
                        <Gamepad2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-semibold">
                          {r.games.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Status: {r.status}
                        </CardDescription>
                      </div>
                    </div>
                    <Link href={`/games/${r.games.slug}/${r.id}`}>
                      <Button>
                        <Users className="h-4 w-4 mr-2" />
                        Join Room
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted border-2 border-foreground rounded-none flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <Gamepad2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No active rooms</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to create a room and start playing!
                </p>
                <Link href="/login">
                  <Button>
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Sign In to Create Room
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

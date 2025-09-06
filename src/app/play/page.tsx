import Link from "next/link";
import { requireUser } from "@/lib/auth/requireUser";
import type { Tables } from "@/lib/supabase/database.types";

export default async function Play() {
  const { supabase } = await requireUser();
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
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Join a public room</h1>
      <div className="space-y-2">
        {rooms?.map((r: RoomListRow) => (
          <div
            key={r.id}
            className="flex items-center justify-between border rounded p-3"
          >
            <div>
              {r.games.name} • {r.status}
            </div>
            <Link
              href={`/games/${r.games.slug}/${r.id}`}
              className="text-sm underline"
            >
              Join
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

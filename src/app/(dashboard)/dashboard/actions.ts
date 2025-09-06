"use server";

import { getDb } from "@/db/client";
import { rooms, roomPlayers, games } from "@/db/schema";
import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createRoomAction(gameId: string) {
  console.log("[createRoomAction] start", { gameId });
  const sb = await createSupabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) throw new Error("Not signed in");
  console.log("[createRoomAction] user", user.id);

  const db = getDb();
  const [room] = await db
    .insert(rooms)
    .values({ gameId, hostUserId: user.id })
    .returning({ id: rooms.id });
  console.log("[createRoomAction] created room", room.id);

  await db
    .insert(roomPlayers)
    .values({ roomId: room.id, userId: user.id, role: "host" });

  // Look up the game's slug to build the correct URL
  const slugRow = await db
    .select({ slug: games.slug })
    .from(games)
    .where(eq(games.id, gameId))
    .limit(1);
  const slug = slugRow[0]?.slug ?? "copycat-ui"; // fallback if missing
  console.log("[createRoomAction] slug", slug);

  const href = `/games/${slug}/${room.id}`;
  console.log("[createRoomAction] redirecting", href);
  redirect(href);
}

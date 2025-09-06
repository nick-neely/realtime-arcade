import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

async function main() {
  const sql = postgres(process.env.DRIZZLE_DATABASE_URL!, {
    ssl: "require",
    max: 1,
    prepare: false,
  });
  const db = drizzle(sql, { schema });

  const list = [
    { slug: "copycat-ui", name: "Copycat UI", minPlayers: 1, maxPlayers: 8 },
    {
      slug: "word-territories",
      name: "Word Territories",
      minPlayers: 2,
      maxPlayers: 8,
    },
  ];

  for (const g of list) {
    const exists = await db.query.games.findFirst({
      where: eq(schema.games.slug, g.slug),
    });
    if (!exists) await db.insert(schema.games).values(g);
  }

  await sql.end({ timeout: 5 });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

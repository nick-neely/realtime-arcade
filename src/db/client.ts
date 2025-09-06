import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let client: ReturnType<typeof postgres> | null = null;

export function getDb() {
  if (!client) {
    client = postgres(process.env.SUPABASE_DB_POOL_URL!, {
      ssl: "require",
      max: 1,
      prepare: false, // important with pgbouncer
    });
  }
  return drizzle(client, { schema });
}

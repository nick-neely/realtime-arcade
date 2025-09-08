import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

async function main() {
  if (process.env.NODE_ENV === 'production' && process.env.PROCEED_MIGRATION !== 'true') {
    console.warn('Skipping migrations: NODE_ENV=production and PROCEED_MIGRATION!=true')
    process.exit(0)
  }

  const sql = postgres(process.env.DRIZZLE_DATABASE_URL!, {
    ssl: 'require',
    max: 1,
    prepare: false,
  })
  const db = drizzle(sql)
  await migrate(db, { migrationsFolder: './drizzle' })
  await sql.end({ timeout: 5 })
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})

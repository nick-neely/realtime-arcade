# Realtime Arcade

Multi-game realtime web app with a shared hub and pluggable games.

<img width="925" height="821" alt="image" src="https://github.com/user-attachments/assets/cba71b80-58b1-4c1d-bf2e-84da4eae6131" />

Built with Next.js 15 (App Router), TypeScript, TailwindCSS, shadcn/ui, Supabase Realtime (presence, broadcast, postgres_changes), and Drizzle ORM for schema and migrations. State uses TanStack Query for server data and Zustand for ephemeral UI. Features a neo-brutalist design aesthetic with motion/react animations.

This README is the single source of truth for setup, architecture, conventions, and workflows.

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-15.4.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.55.0-green?style=for-the-badge&logo=supabase)
![Drizzle](https://img.shields.io/badge/Drizzle-0.44.4-orange?style=for-the-badge&logo=drizzle)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)
![pnpm](https://img.shields.io/badge/pnpm-10.7.1-F69220?style=for-the-badge&logo=pnpm)
![Motion](https://img.shields.io/badge/Motion-React-FF6B6B?style=for-the-badge&logo=framer)

---

## Contents

- [Realtime Arcade](#realtime-arcade)
  - [Tech Stack](#tech-stack)
  - [Contents](#contents)
  - [Why this project](#why-this-project)
  - [Architecture overview](#architecture-overview)
  - [Directory structure](#directory-structure)
  - [Tech decisions](#tech-decisions)
  - [Prerequisites](#prerequisites)
  - [Environment variables](#environment-variables)
  - [Setup](#setup)
  - [Database with Drizzle](#database-with-drizzle)
  - [Supabase Realtime](#supabase-realtime)
  - [Running the app](#running-the-app)
  - [How auth works](#how-auth-works)
  - [Realtime data flow](#realtime-data-flow)
  - [Game modules](#game-modules)
  - [When to use Drizzle vs Supabase JS](#when-to-use-drizzle-vs-supabase-js)
  - [State management](#state-management)
  - [Deployment](#deployment)
  - [CI for migrations](#ci-for-migrations)
  - [Security and RLS](#security-and-rls)
  - [Performance tips](#performance-tips)
  - [Testing](#testing)
  - [Styling and Design](#styling-and-design)
    - [Design Principles](#design-principles)
    - [Color System](#color-system)
    - [Animations](#animations)
  - [Troubleshooting](#troubleshooting)
  - [Conventions](#conventions)
  - [License](#license)

---

## Why this project

- A single hub that can host many realtime games and utilities.
- Games drop in as modules with minimal wiring.
- Realtime is first class through Supabase presence, broadcast, and WAL streams.
- All database changes live in versioned Drizzle migrations. No copy pasting SQL into a console.

---

## Architecture overview

**Frontend**

- Next.js 15 App Router, mostly Server Components.
- shadcn/ui for the dashboard, lists, dialogs, and basic chrome.
- TailwindCSS for styling.
- Client components are used where interactivity or realtime is required.

**Realtime**

- Supabase Channel per room for presence and broadcast.
- A lightweight channel for `postgres_changes` on event tables.

**Data**

- Event sourced by default with `room_events` for auditability.
- Optional derived `room_state` snapshots for late joiners and fast load.
- Drizzle ORM for schema, migrations, seeds, and server side writes.

**Auth**

- Supabase Auth using email magic links and optional socials.
- RLS policies restrict read and write access by membership.

**High level flow**

1. User emits an optimistic action through broadcast for instant UI feedback.
2. The client or a server action appends an authoritative event to `room_events`.
3. All clients stream inserts from WAL and reconcile state.
4. Optional snapshot persists summarized state to `room_state`.

---

## Directory structure

```
src/
  app/
    (public)/login/
    dashboard/
    play/
    games/[slug]/[roomId]/       # shared game shell page
    api/                         # server routes if needed
  components/
    ui/                          # shadcn generated components
    hub/ room/ game/             # feature components
  db/
    schema.ts                    # Drizzle schema
    client.ts                    # pooled Drizzle client for server runtime
    run-migrations.ts            # migration runner
    seed.ts                      # seed script
  hooks/
    useRoomChannel.ts            # presence + broadcast + helpers
  lib/
    supabase/client.ts           # client-side Supabase
    supabase/server.ts           # server-side Supabase
    auth/requireUser.ts          # RSC guard
    games/registry.ts            # pluggable game registry
  games/
    copycat-ui/Client.tsx        # example client entry
    word-territories/Client.tsx  # example client entry
drizzle/
  0001_initial.sql               # generated by drizzle-kit
  0002_rls_pubs.sql              # manual RLS, policies, publications
public/
windsrf.rules.yaml               # team and AI rules
```

---

## Tech decisions

- **Drizzle ORM** owns the schema and migrations. The repo is the source of truth.
- **Supabase Realtime** is used for presence, broadcast, and WAL based `postgres_changes`.
- **TanStack Query** is used for data that originates on the server or DB.
- **Zustand** holds transient UI state and optimistic state (better for high-frequency updates like cursors and drag positions).
- **Service role key** is used only on the server in server actions or RSC for writes that must bypass RLS or need cross table consistency.

---

## Prerequisites

- Node 20
- pnpm 9
- Supabase project with Postgres
- A dedicated database user for pooled runtime connections is recommended

---

## Environment variables

Define these in `.env.local` for development and in Vercel for preview and production.

| Variable                        | Scope      | Purpose                                                              |
| ------------------------------- | ---------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | client     | Supabase project URL                                                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client     | Public anon key for auth and RLS protected reads                     |
| `SUPABASE_SERVICE_ROLE_KEY`     | server     | Service role for server actions and admin writes                     |
| `DRIZZLE_DATABASE_URL`          | local only | Non pooled Postgres URL for migrations and seeds                     |
| `SUPABASE_DB_POOL_URL`          | server     | Pooled Postgres URL through PgBouncer for runtime queries in Drizzle |
| `NEXT_PUBLIC_SITE_URL`          | client     | Base site URL used for auth redirects                                |

Notes

- Pooled URL must set prepared statements off. Drizzle config uses `prepare: false`.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

---

## Setup

1. **Install dependencies**

   ```bash
   pnpm i
   ```

2. **Initialize shadcn components**

   ```bash
   pnpm dlx shadcn@latest init
   pnpm dlx shadcn@latest add button card input label badge avatar dropdown-menu dialog sheet tooltip toast separator tabs
   ```

3. **Create a Supabase project**
   - Enable Email auth (magic link or password) and any socials you want.
   - Add your development URL to the Auth redirect allowlist, for example `http://localhost:3000`.

4. **Configure Realtime**
   - You will enable WAL streaming and publication in a migration below, not by hand.

5. **Copy and fill `.env.local`**
   Use the table above as a template.

---

## Database with Drizzle

1. **Drizzle config**
   `drizzle.config.ts` already points to `src/db/schema.ts` and `drizzle/` output.

2. **Generate initial migration**

   ```bash
   pnpm drizzle:generate
   pnpm drizzle:migrate
   ```

3. **Add policies, foreign keys, indices, publications**
   Add a manual SQL file similar to `drizzle/0002_rls_pubs.sql` that
   - Adds FKs to `auth.users` and other tables
   - Enables Row Level Security on all tables
   - Creates policies for read and write
   - Adds tables to `supabase_realtime` publication for WAL streaming
   - Creates helpful indices

   Run again

   ```bash
   pnpm drizzle:migrate
   ```

4. **Seed data**
   `src/db/seed.ts` inserts default games.

   ```bash
   pnpm db:seed
   ```

---

## Supabase Realtime

We use three lanes per room.

- **Presence** for who is online. Each client tracks a presence meta record, for example `{ name, color }`.
- **Broadcast** for low latency fire and forget actions, for example `place_block`, `move`, `claim_attempt`.
- **postgres_changes** for authoritative inserts to `room_events` and any game specific tables.

Enable WAL and publications through the migration `0002_rls_pubs.sql` by adding:

```sql
alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.room_players;
alter publication supabase_realtime add table public.room_events;
```

Add new tables that require streaming the same way in a new migration.

---

## Running the app

```bash
pnpm dev
```

Open `http://localhost:3000`.

Login flow uses a simple magic link example. Update the login page to your needs.

---

## How auth works

- Server components call `createSupabaseServer()` to read the current user and render protected pages. Non authenticated users are redirected to `/login`.
- Client components use the public Supabase client to read session and perform RLS protected inserts or selects.
- The login page uses a server action to send magic links and redirect after success.

---

## Realtime data flow

The default game shell follows this pattern.

1. **Optimistic action**
   The client sends a broadcast `{ type, payload, ts }` on channel `room:<id>`. The UI updates immediately.

2. **Authoritative write**
   Either the client inserts into `room_events` if allowed by RLS, or the client calls a server action that writes with the service role if validation is required.

3. **Stream and reconcile**
   All clients subscribe to `postgres_changes` on `room_events` with `filter: room_id=eq.<id>`. The stream is the source of truth. Optimistic state is reconciled when the authoritative event arrives.

4. **Snapshots for late joiners**
   A server action may compute a derived snapshot into `room_state`. Clients load `room_state` on mount, then stream the event tail to catch up.

---

## Game modules

Games are discovered at runtime using a registry. Each game provides a descriptor and a Client component.

**Registry**

```ts
// src/lib/games/registry.ts
export type GameDescriptor = {
  slug: string
  name: string
  channelEvents: { action: string[] }
  load: () => Promise<{ default: React.ComponentType<{ roomId: string }> }>
}

export const GAME_REGISTRY: Record<string, GameDescriptor> = {
  'copycat-ui': {
    slug: 'copycat-ui',
    name: 'Copycat UI',
    channelEvents: { action: ['place_block', 'update_block', 'delete_block'] },
    load: () => import('@/games/copycat-ui'),
  },
}
```

**Add a new game**

1. Create `src/games/<slug>/index.tsx` and implement the UI using `useRoomChannel`.
2. Register it in `registry.ts`.
3. Seed a row into `public.games` in `seed.ts`.
4. If you need extra tables, add Drizzle schema and a migration that includes RLS and publication updates.

**Room shell**
`src/app/games/[slug]/[roomId]/page.tsx` loads the descriptor, ensures membership in `room_players`, and renders the Client.

---

## When to use Drizzle vs Supabase JS

Use **Drizzle** when

- Writing or updating data that must bypass RLS, for example computing `room_state`.
- Performing multi table operations that you want to keep consistent.
- Managing schema, migrations, and seeds.

Use **Supabase JS** when

- You are on the client and want RLS protected selects or inserts.
- You need presence, broadcast, or `postgres_changes`.
- You are in a server component reading with the current user context and want RLS enforced automatically.

Rule of thumb

- Client reads and client safe writes use Supabase JS.
- Server authority writes, seeds, and schema use Drizzle.

---

## State management

- **TanStack Query** for data that comes from the database or server actions. Examples: room lists, event feeds, snapshots.
- **Zustand** for local UI concerns and optimistic state. Examples: cursor ghosts, drag positions, modal state.
- Avoid storing server state in Zustand long term. The stream or Query cache should be the source of truth.

---

## Deployment

**Vercel**

1. Import the repo.
2. Set environment variables in Preview and Production.
3. Do not run migrations in the build step.
4. Add your domains to Supabase Auth redirect allowlist.

**Supabase**

- Confirm `supabase_realtime` publication includes your streaming tables. We add them in migrations.
- Keep the database password safe. Use a dedicated user for pooled connections.

---

## CI for migrations

Run Drizzle migrations on merge to `main`. Example GitHub Action.

```yaml
name: db-migrate
on:
  push:
    branches: [main]
jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: pnpm i --frozen-lockfile
      - run: pnpm drizzle:migrate
        env:
          DRIZZLE_DATABASE_URL: ${{ secrets.DRIZZLE_DATABASE_URL }}
```

You can also run seeds in non production environments.

---

## Security and RLS

- All tables must have RLS enabled with policies in the same migration that creates them.
- Users see public rooms or rooms they joined. Private rooms require membership.
- Only room members can insert and select `room_events`.
- `room_state` is readable by members. Only service role can write.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client. Server actions only.

---

## Performance tips

- Keep broadcast payloads small, ideally under a few hundred bytes.
- Batch event writes when possible.
- Use an event tail window, for example last 50 to 200 events per client.
- Disable refetch on window focus on pages that already stream events.
- Memoize heavy components and use virtualization for long lists.
- Avoid re subscribing channels on every render. Scope channels by room.

---

## Testing

**Unit**

- Pure reducers and validators.
- Small utilities for event shaping and conflict resolution.

**Component**

- Client components with mocked Supabase client and synthetic event streams.

**Integration**

- Server actions with a temporary schema or a dedicated test database.

**End to end**

- Playwright
  - Can login with magic link helper that bypasses email by calling Supabase admin auth in test only.
  - Flow: login, create room, join from another browser context, send broadcast, see event stream.

Seeds

- Keep at least two demo games and a public room for manual verification.

---

## Styling and Design

The project follows a **neo-brutalist** design philosophy with bold, functional visual elements and purposeful animations.

### Design Principles

- **Bold but not flashy**: Strong visual presence without overwhelming motion
- **Functional over decorative**: Every visual element serves a purpose
- **Sharp edges**: No rounded corners, maintaining geometric precision
- **High contrast**: Bold color combinations with strong shadows
- **Consistent timing**: All animations use similar durations (0.4s)

### Color System

- **Primary**: Orange-red accent for key actions
- **Secondary**: Bright yellow-green for highlights
- **Accent**: Purple-blue for special elements
- **Background**: Pure white/black with no gradients
- **Borders**: High contrast black/white borders

### Animations

Uses `motion/react` (formerly Framer Motion) for micro-interactions:

- **Button feedback**: Essential hover/tap responses
- **Card hover effects**: Subtle lift animations
- **Icon scaling**: Minimal feedback on interactive elements
- **Content reveals**: Clean fade-ins for new content

All animations respect `prefers-reduced-motion` and follow neo-brutalist principles of bold, functional motion.

---

## Troubleshooting

**I do not receive `postgres_changes`**

- Confirm the table is in `supabase_realtime` publication. See `0002_rls_pubs.sql`.
- Confirm WAL is enabled in your Supabase project. Starter projects have it on by default.
- Check your filter string matches the `room_id` exactly.

**Insert is blocked by RLS**

- Inspect policies for the table and confirm `auth.uid()` has membership.
- Use a server action and Drizzle for admin writes if the operation requires validation across tables.

**Auth redirects fail locally**

- Set `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000`.
- Add this URL to the Supabase Auth redirect allowlist.

**Realtime disconnects**

- Log channel status events and back off reconnect attempts.
- Keep each room to a small number of channels, usually two.

---

## Conventions

- Types use PascalCase. Variables use camelCase. Tables use snake_case.
- Events use clear lower snake strings, for example `claim_attempt`.
- Commit prefixes: `feat`, `fix`, `chore`, `refactor`, `db`.
- New tables must ship with RLS, policies, and indices. If the table streams, add it to the publication in the same PR.

See [`.cursor/rules/ai-rules.mdc`](.cursor/rules/ai-rules.mdc) for the full ruleset.

---

## License

Add your preferred license. MIT is a common choice for templates.

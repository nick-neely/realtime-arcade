import { sql } from 'drizzle-orm'
import {
  bigserial,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

/** Enums */
export const roomVisibility = pgEnum('room_visibility', ['public', 'unlisted', 'private'])
export const roomStatus = pgEnum('room_status', ['lobby', 'active', 'ended'])
export const roomRole = pgEnum('room_role', ['host', 'player', 'spectator'])

/** Tables */

export const profiles = pgTable('profiles', {
  userId: uuid('user_id').primaryKey(), // FK to auth.users via manual migration
  username: text('username').unique(),
  displayName: text('display_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const games = pgTable('games', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  minPlayers: integer('min_players').notNull().default(1),
  maxPlayers: integer('max_players').notNull().default(8),
  version: integer('version').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const rooms = pgTable('rooms', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').unique(),
  gameId: uuid('game_id').notNull(), // FK to games.id via constraint migration
  hostUserId: uuid('host_user_id').notNull(), // FK to auth.users
  visibility: roomVisibility('visibility').notNull().default('public'),
  status: roomStatus('status').notNull().default('lobby'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  startedAt: timestamp('started_at', { withTimezone: true }),
  endedAt: timestamp('ended_at', { withTimezone: true }),
})

export const roomPlayers = pgTable('room_players', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  roomId: uuid('room_id').notNull(),
  userId: uuid('user_id').notNull(),
  role: roomRole('role').notNull().default('player'),
  joinedAt: timestamp('joined_at', { withTimezone: true }).notNull().defaultNow(),
  lastActive: timestamp('last_active', { withTimezone: true }).notNull().defaultNow(),
})

export const roomEvents = pgTable('room_events', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  roomId: uuid('room_id').notNull(),
  userId: uuid('user_id').notNull(),
  type: text('type').notNull(),
  payload: jsonb('payload').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const roomState = pgTable('room_state', {
  roomId: uuid('room_id').primaryKey(),
  snapshot: jsonb('snapshot').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

/** Useful indices through SQL in a follow-up migration */
export const extras = sql``

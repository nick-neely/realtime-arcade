import type { ComponentType } from 'react'

export type GameDescriptor = {
  slug: string
  name: string
  // Room-level realtime configuration
  channelEvents: {
    action: string[] // whitelisted broadcast event names
  }
  // Optional client reducer to simulate while waiting for DB confirm
  reducer?: <T>(state: T, event: { type: string; payload: Record<string, unknown> }) => T
  // Dynamic import to the game UI
  load: () => Promise<{ default: ComponentType<{ roomId: string }> }>
}

export const GAME_REGISTRY: Record<string, GameDescriptor> = {
  'copycat-ui': {
    slug: 'copycat-ui',
    name: 'Copycat UI',
    channelEvents: { action: ['place_block', 'update_block', 'delete_block'] },
    load: () => import('@/games/copycat-ui'),
  },
  // "word-territories": {
  //   slug: "word-territories",
  //   name: "Word Territories",
  //   channelEvents: { action: ["claim_attempt","claim_withdraw"] },
  //   load: () => import("@/games/word-territories/Client"),
  // }
}

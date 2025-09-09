'use client'

import { Computer } from '@/components/Computer'
import { Star } from '@/components/Star'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import {
  ArrowRight,
  Clock,
  Crown,
  Gamepad2,
  Star as StarIcon,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

type RoomListRow = {
  id: string
  status: string
  games: {
    name: string
    slug: string
  }
}

interface PlayPageClientProps {
  rooms: RoomListRow[] | null
}

export function PlayPageClient({ rooms }: PlayPageClientProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-12">
      {/* Hero Section */}
      <motion.div
        className="space-y-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="bg-primary/10 border-foreground inline-flex items-center gap-2 rounded-none border-2 px-4 py-2 text-sm font-medium shadow-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Zap className="text-primary h-4 w-4" />
          <span>Real-time multiplayer games</span>
        </motion.div>
        <motion.h1
          className="text-5xl leading-tight font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Play Games with Friends
          <br />
          <span className="text-primary">Right Now</span>
        </motion.h1>
        <motion.p
          className="text-muted-foreground mx-auto max-w-2xl text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Join thousands of players in real-time multiplayer games. No downloads, no waiting - just
          pure gaming fun in your browser.
        </motion.p>

        {/* Computer Animation - Desktop only for clean mobile experience */}
        <motion.div
          className="absolute top-16 left-8 hidden xl:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Computer size="xl" delay={500} />
        </motion.div>
      </motion.div>

      {/* Social Proof & Features */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Users,
            title: 'Play with Friends',
            description: 'Create private rooms and invite your friends for epic gaming sessions',
          },
          {
            icon: Zap,
            title: 'Instant Play',
            description: 'No downloads or installations - just click and play in your browser',
          },
          {
            icon: Trophy,
            title: 'Compete & Win',
            description: 'Challenge players worldwide and climb the leaderboards',
          },
        ].map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            className="space-y-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            whileHover={{
              y: -2,
              transition: { type: 'spring', stiffness: 300, damping: 25 },
            }}
          >
            <motion.div
              className="bg-primary/10 border-foreground mx-auto flex h-12 w-12 items-center justify-center rounded-none border-2 shadow-xs"
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400, damping: 25 },
              }}
            >
              <Icon className="text-primary h-6 w-6" />
            </motion.div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Games Section */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <div>
            <h2 className="text-2xl font-bold">Live Games Happening Now</h2>
            <p className="text-muted-foreground">
              {rooms && rooms.length > 0
                ? `${rooms.length} active games waiting for players`
                : 'No active games - be the first to start one!'}
            </p>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>Updated just now</span>
          </div>
        </motion.div>

        {rooms && rooms.length > 0 ? (
          <div className="grid gap-4">
            {rooms.slice(0, 6).map((r: RoomListRow, index) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <Card className="p-4">
                    <div className="flex items-center justify-center gap-8">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className="bg-primary/10 border-foreground flex h-12 w-12 items-center justify-center rounded-none border-2 shadow-xs"
                          whileHover={{
                            scale: 1.05,
                            transition: {
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            },
                          }}
                        >
                          <Gamepad2 className="text-primary h-6 w-6" />
                        </motion.div>
                        <div>
                          <CardTitle className="text-lg font-semibold">{r.games.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {r.status === 'active' ? 'In Progress' : 'Waiting'}
                            </span>
                            <span>•</span>
                            <span>Public Room</span>
                          </CardDescription>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button asChild>
                          <Link href={`/games/${r.games.slug}/${r.id}`}>
                            <Users className="mr-2 h-4 w-4" /> Join Room
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="bg-muted/30 border-foreground rounded-none border-2 py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <motion.div
              className="bg-muted border-foreground mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-none border-2 shadow-xs"
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400, damping: 25 },
              }}
            >
              <Gamepad2 className="text-muted-foreground h-10 w-10" />
            </motion.div>
            <h3 className="mb-3 text-2xl font-bold">No Games Running</h3>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              The gaming arena is quiet right now. Be the first to start a game and invite others to
              join the fun!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        className="bg-primary/5 border-foreground relative space-y-6 overflow-hidden rounded-none border-2 p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
        whileHover={{
          y: -2,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        {/* Star Animation - Subtle background decoration */}
        <motion.div
          className="absolute top-2 right-2"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Star size="sm" delay={1000} className="opacity-60 sm:opacity-100" />
        </motion.div>
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
        >
          <motion.div
            className="bg-primary/10 border-foreground inline-flex items-center gap-2 rounded-none border-2 px-3 py-1 text-sm font-medium shadow-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.4 }}
          >
            <Crown className="text-primary h-4 w-4" />
            <span>Unlock Full Experience</span>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.5 }}
          >
            Ready to Create Your Own Games?
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.6 }}
          >
            Join thousands of players who create custom rooms, invite friends, and host epic gaming
            sessions. It&apos;s completely free and takes just 30 seconds to get started.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.7 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="min-w-[200px] gap-2">
              <Link href="/login">
                <StarIcon className="h-5 w-5" />
                Start Playing Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <div className="text-muted-foreground text-sm">
            <span className="font-medium">✓</span> No credit card required
            <span className="mx-2">•</span>
            <span className="font-medium">✓</span> Instant access
          </div>
        </motion.div>

        <motion.div
          className="border-foreground grid grid-cols-3 gap-6 border-t-2 pt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.8 }}
        >
          {[
            { number: '1000+', label: 'Active Players' },
            { number: '50+', label: 'Games Available' },
            { number: '24/7', label: 'Always Online' },
          ].map(({ number, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.9 + index * 0.1 }}
              whileHover={{
                y: -2,
                transition: { type: 'spring', stiffness: 300, damping: 25 },
              }}
            >
              <div className="text-primary text-2xl font-bold">{number}</div>
              <div className="text-muted-foreground text-sm">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

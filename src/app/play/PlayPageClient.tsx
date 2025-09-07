"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  Crown,
  Gamepad2,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type RoomListRow = {
  id: string;
  status: string;
  games: {
    name: string;
    slug: string;
  };
};

interface PlayPageClientProps {
  rooms: RoomListRow[] | null;
}

export function PlayPageClient({ rooms }: PlayPageClientProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-primary/10 border-2 border-foreground rounded-none px-4 py-2 text-sm font-medium shadow-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Zap className="h-4 w-4 text-primary" />
          <span>Real-time multiplayer games</span>
        </motion.div>
        <motion.h1
          className="text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Play Games with Friends
          <br />
          <span className="text-primary">Right Now</span>
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Join thousands of players in real-time multiplayer games. No
          downloads, no waiting - just pure gaming fun in your browser.
        </motion.p>
      </motion.div>

      {/* Social Proof & Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Users,
            title: "Play with Friends",
            description:
              "Create private rooms and invite your friends for epic gaming sessions",
          },
          {
            icon: Zap,
            title: "Instant Play",
            description:
              "No downloads or installations - just click and play in your browser",
          },
          {
            icon: Trophy,
            title: "Compete & Win",
            description:
              "Challenge players worldwide and climb the leaderboards",
          },
        ].map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            whileHover={{
              y: -2,
              transition: { type: "spring", stiffness: 300, damping: 25 },
            }}
          >
            <motion.div
              className="w-12 h-12 bg-primary/10 border-2 border-foreground rounded-none flex items-center justify-center mx-auto shadow-xs"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
            >
              <Icon className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
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
                : "No active games - be the first to start one!"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <Card className="p-4">
                    <div className="flex items-center justify-center gap-8">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className="w-12 h-12 bg-primary/10 border-2 border-foreground rounded-none flex items-center justify-center shadow-xs"
                          whileHover={{
                            scale: 1.05,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            },
                          }}
                        >
                          <Gamepad2 className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <CardTitle className="font-semibold text-lg">
                            {r.games.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {r.status === "active"
                                ? "In Progress"
                                : "Waiting"}
                            </span>
                            <span>•</span>
                            <span>Public Room</span>
                          </CardDescription>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button asChild>
                          <Link href={`/games/${r.games.slug}/${r.id}`}>
                            <Users className="h-4 w-4 mr-2" /> Join Room
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
            className="text-center py-16 bg-muted/30 border-2 border-foreground rounded-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <motion.div
              className="w-20 h-20 bg-muted border-2 border-foreground rounded-none flex items-center justify-center mx-auto mb-6 shadow-xs"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
            >
              <Gamepad2 className="h-10 w-10 text-muted-foreground" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3">No Games Running</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The gaming arena is quiet right now. Be the first to start a game
              and invite others to join the fun!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        className="bg-primary/5 border-2 border-foreground rounded-none p-8 text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
        whileHover={{
          y: -2,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border-2 border-foreground rounded-none px-3 py-1 text-sm font-medium shadow-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.4 }}
          >
            <Crown className="h-4 w-4 text-primary" />
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
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.6 }}
          >
            Join thousands of players who create custom rooms, invite friends,
            and host epic gaming sessions. It's completely free and takes just
            30 seconds to get started.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.7 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="gap-2 min-w-[200px]">
              <Link href="/login">
                <Star className="h-5 w-5" />
                Start Playing Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">✓</span> No credit card required
            <span className="mx-2">•</span>
            <span className="font-medium">✓</span> Instant access
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-6 text-center pt-6 border-t-2 border-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.8 }}
        >
          {[
            { number: "1000+", label: "Active Players" },
            { number: "50+", label: "Games Available" },
            { number: "24/7", label: "Always Online" },
          ].map(({ number, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.9 + index * 0.1 }}
              whileHover={{
                y: -2,
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
            >
              <div className="text-2xl font-bold text-primary">{number}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

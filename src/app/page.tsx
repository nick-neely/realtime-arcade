'use client'

import { GameController } from '@/components/GameController'
import { Pizza } from '@/components/Pizza'
import { StarsRating } from '@/components/StarsRating'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Clock, Gamepad2, Play, Trophy, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-5xl space-y-10 text-center">
          {/* Social Proof */}
          <motion.div
            className="text-muted-foreground flex items-center justify-center space-x-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-1">
              <StarsRating delay={0} />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="bg-primary/20 border-background h-8 w-8 rounded-full border-2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + i * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                  />
                ))}
              </div>
              <span>Join 10,000+ players</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-4">
            <motion.div
              className="relative flex items-center justify-center xl:pl-8 2xl:pl-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Game Controller positioned on the left - responsive visibility */}
              <motion.div
                className="absolute top-1/2 -left-32 hidden -translate-y-1/2 opacity-0 lg:-left-16 lg:block lg:opacity-100 xl:-left-48 2xl:-left-72"
                initial={{ opacity: 0, x: -50, rotate: -10 }}
                animate={{
                  opacity: [0, 0, 1],
                  x: 0,
                  rotate: 0,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.4, times: [0, 0.5, 1] },
                  x: { duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 },
                  rotate: { duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 },
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  y: 0,
                  transition: { duration: 0.3 },
                }}
              >
                <GameController size="xl" delay={600} />
              </motion.div>

              <motion.h1
                className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:max-w-4xl lg:text-6xl xl:max-w-5xl xl:text-7xl 2xl:text-8xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                The Ultimate <span className="text-primary">Multiplayer</span> Gaming Experience
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stop playing alone. Join thousands of players in{' '}
              <span className="text-foreground font-semibold">real-time multiplayer games</span>{' '}
              where every second counts and every move matters.
            </motion.p>
          </div>

          {/* Responsive Animations - shown below content on tablet and small desktop */}
          <motion.div
            className="flex items-center justify-center space-x-4 sm:flex sm:space-x-6 lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
            >
              <GameController size="xl" delay={800} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                rotate: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Pizza size="xl" delay={1000} />
            </motion.div>
          </motion.div>

          {/* Urgency CTA */}
          <motion.div
            className="relative pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Pizza positioned to the right of the urgency CTA - responsive visibility */}
            <motion.div
              className="absolute top-1/2 -right-32 hidden -translate-y-1/2 opacity-0 xl:-right-40 xl:block xl:opacity-100 2xl:-right-72"
              initial={{ opacity: 0, x: 50, y: -30, rotate: 15 }}
              animate={{
                opacity: [0, 0, 1],
                x: 0,
                y: 0,
                rotate: 0,
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.6, times: [0, 0.5, 1] },
                x: { duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 },
                y: { duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 },
                rotate: { duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 },
              }}
              whileHover={{
                scale: 1.1,
                rotate: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Pizza size="xl" delay={800} />
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Card className="border-foreground mx-auto max-w-2xl rounded-none border-2">
                <CardHeader className="pt-6 pb-4 text-center">
                  <CardTitle className="text-primary flex items-center justify-center space-x-2 text-lg">
                    <Clock className="h-5 w-5" />
                    <span>Limited Time: Free Premium Access</span>
                  </CardTitle>
                  <CardDescription className="mt-2 text-base">
                    Get instant access to all games and features. No credit card required.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-6">
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 rounded-none px-8 py-6 text-lg shadow-lg"
                      >
                        <Link href="/login">
                          <Play className="mr-2 h-5 w-5" />
                          Start Playing Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="hover:border-foreground rounded-none border-2 px-8 py-6 text-lg"
                      >
                        <Link href="/play">
                          <Users className="mr-2 h-5 w-5" />
                          Watch Live Games
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="text-muted-foreground flex items-center justify-center space-x-8 pt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {[
              { icon: Trophy, text: 'Tournaments Daily' },
              { icon: Zap, text: 'Instant Matchmaking' },
              { icon: Users, text: 'Global Community' },
            ].map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                className="flex items-center space-x-2"
                whileHover={{
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8 text-center">
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join the Gaming Revolution
          </motion.h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              { number: '10,000+', label: 'Active Players' },
              { number: '50+', label: 'Games Available' },
              { number: '24/7', label: 'Always Active' },
            ].map(({ number, label }) => (
              <motion.div
                key={label}
                className="bg-card border-foreground rounded-none border-2 p-6 text-center shadow-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -2,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  },
                }}
              >
                <div className="text-primary mb-2 text-3xl font-bold">{number}</div>
                <div className="text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold">Why Players Choose Us</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Experience gaming like never before with cutting-edge technology and a thriving
              community.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description:
                  'Sub-50ms latency ensures your moves are instant. No lag, no excuses, just pure gaming.',
              },
              {
                icon: Users,
                title: 'Always Connected',
                description:
                  'Join thousands of players worldwide. Find matches instantly, any time of day.',
              },
              {
                icon: Trophy,
                title: 'Compete & Win',
                description:
                  'Daily tournaments, leaderboards, and exclusive rewards for top players.',
              },
            ].map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                className="space-y-4 p-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -2,
                  transition: { type: 'spring', stiffness: 300, damping: 25 },
                }}
              >
                <motion.div
                  className="bg-primary/10 border-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-none border-2 shadow-xs"
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                    },
                  }}
                >
                  <Icon className="text-primary h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card className="border-foreground mx-auto max-w-4xl rounded-none border-2">
              <CardHeader className="pb-6 text-center">
                <CardTitle className="text-4xl font-bold">Ready to Dominate?</CardTitle>
                <CardDescription className="mx-auto max-w-2xl text-xl">
                  Join the elite gaming community. Create your account in 30 seconds and start
                  playing immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-6 flex flex-col justify-center gap-4 sm:flex-row">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      asChild
                      size="lg"
                      className="bg-primary hover:bg-primary/90 rounded-none px-10 py-6 text-lg shadow-lg"
                    >
                      <Link href="/login">
                        <Gamepad2 className="mr-2 h-6 w-6" />
                        Create Free Account
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="hover:border-foreground rounded-none border-2 px-10 py-6 text-lg"
                    >
                      <Link href="/play">
                        <Users className="mr-2 h-6 w-6" />
                        Browse Live Games
                      </Link>
                    </Button>
                  </motion.div>
                </div>
                <p className="text-muted-foreground text-center text-sm">
                  No credit card required • Free forever • Join 10,000+ players
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

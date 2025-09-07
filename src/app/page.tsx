"use client";

import { StarsRating } from "@/components/StarsRating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Clock,
  Gamepad2,
  Play,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center space-y-10 max-w-5xl mx-auto">
          {/* Social Proof */}
          <motion.div
            className="flex items-center justify-center space-x-6 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center space-x-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                type: "spring",
                stiffness: 300,
              }}
            >
              <StarsRating delay={400} />
            </motion.div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 bg-primary/20 rounded-full border-2 border-background"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + i * 0.1,
                      type: "spring",
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
            <motion.h1
              className="text-6xl md:text-7xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The Ultimate{" "}
              <motion.span
                className="text-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Multiplayer
              </motion.span>{" "}
              Gaming Experience
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Stop playing alone. Join thousands of players in{" "}
              <span className="font-semibold text-foreground">
                real-time multiplayer games
              </span>{" "}
              where every second counts and every move matters.
            </motion.p>
          </div>

          {/* Urgency CTA */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="max-w-2xl mx-auto border-2 border-foreground rounded-none">
                <CardHeader className="text-center pb-4 pt-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <CardTitle className="flex items-center justify-center space-x-2 text-primary text-lg">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <Clock className="h-5 w-5" />
                      </motion.div>
                      <span>Limited Time: Free Premium Access</span>
                    </CardTitle>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <CardDescription className="text-base mt-2">
                      Get instant access to all games and features. No credit
                      card required.
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent className="pt-0 pb-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 rounded-none shadow-lg"
                      >
                        <Link href="/login">
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                          >
                            <Play className="h-5 w-5 mr-2" />
                          </motion.div>
                          Start Playing Now
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                          >
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </motion.div>
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-6 rounded-none border-2 hover:border-foreground"
                      >
                        <Link href="/play">
                          <Users className="h-5 w-5 mr-2" />
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
            className="flex items-center justify-center space-x-8 text-sm text-muted-foreground pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            {[
              { icon: Trophy, text: "Tournaments Daily", delay: 1.4 },
              { icon: Zap, text: "Instant Matchmaking", delay: 1.5 },
              { icon: Users, text: "Global Community", delay: 1.6 },
            ].map(({ icon: Icon, text, delay }, index) => (
              <motion.div
                key={text}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay }}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: index * 0.5,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join the Gaming Revolution
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10,000+", label: "Active Players", delay: 0.1 },
              { number: "50+", label: "Games Available", delay: 0.2 },
              { number: "24/7", label: "Always Active", delay: 0.3 },
            ].map(({ number, label, delay }, index) => (
              <motion.div
                key={label}
                className="bg-card border-2 border-foreground shadow-lg rounded-none p-6 text-center"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  },
                }}
              >
                <motion.div
                  className="text-3xl font-bold text-primary mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: delay + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                >
                  {number}
                </motion.div>
                <div className="text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Why Players Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience gaming like never before with cutting-edge technology
              and a thriving community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Sub-50ms latency ensures your moves are instant. No lag, no excuses, just pure gaming.",
                delay: 0.1,
                iconAnimation: { rotate: [0, 10, -10, 0] },
              },
              {
                icon: Users,
                title: "Always Connected",
                description:
                  "Join thousands of players worldwide. Find matches instantly, any time of day.",
                delay: 0.2,
                iconAnimation: { y: [0, -5, 0] },
              },
              {
                icon: Trophy,
                title: "Compete & Win",
                description:
                  "Daily tournaments, leaderboards, and exclusive rewards for top players.",
                delay: 0.3,
                iconAnimation: { rotate: [0, 5, -5, 0] },
              },
            ].map(
              (
                { icon: Icon, title, description, delay, iconAnimation },
                index
              ) => (
                <motion.div
                  key={title}
                  className="text-center space-y-4 p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -3,
                    transition: { type: "spring", stiffness: 300, damping: 25 },
                  }}
                >
                  <motion.div
                    className="w-16 h-16 bg-primary/10 border-2 border-foreground shadow-xs rounded-none flex items-center justify-center mx-auto"
                    whileHover={{
                      scale: 1.05,
                      rotate: 2,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                  >
                    <motion.div
                      animate={iconAnimation}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        delay: index * 0.5,
                      }}
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="max-w-4xl mx-auto border-2 border-foreground rounded-none">
              <CardHeader className="text-center pb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <CardTitle className="text-4xl font-bold">
                    Ready to Dominate?
                  </CardTitle>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <CardDescription className="text-xl max-w-2xl mx-auto">
                    Join the elite gaming community. Create your account in 30
                    seconds and start playing immediately.
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 rounded-none shadow-lg"
                    >
                      <Link href="/login">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        >
                          <Gamepad2 className="h-6 w-6 mr-2" />
                        </motion.div>
                        Create Free Account
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        >
                          <ArrowRight className="h-6 w-6 ml-2" />
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="text-lg px-10 py-6 rounded-none border-2 hover:border-foreground"
                    >
                      <Link href="/play">
                        <Users className="h-6 w-6 mr-2" />
                        Browse Live Games
                      </Link>
                    </Button>
                  </motion.div>
                </div>
                <motion.p
                  className="text-sm text-muted-foreground text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  No credit card required • Free forever • Join 10,000+ players
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

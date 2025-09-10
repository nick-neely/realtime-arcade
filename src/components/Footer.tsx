'use client'

import { FooterThemeSwitcher } from '@/components/FooterThemeSwitcher'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { Github, Mail, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export function Footer() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = useMemo(() => createSupabaseClient(), [])

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])
  return (
    <footer className="border-foreground bg-background border-t-2">
      <div className="container mx-auto px-4 py-4 md:py-12">
        {/* Mobile: Compact layout */}
        <div className="md:hidden">
          <div className="space-y-4">
            {/* Brand */}
            <div className="text-center">
              <Link href="/" className="flex items-center justify-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="Realtime Arcade Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="text-lg font-bold">Realtime Arcade</span>
              </Link>
              <p className="text-muted-foreground mt-2 text-xs">
                The ultimate multiplayer gaming platform
              </p>
            </div>

            {/* Links in 2 columns */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold tracking-wide uppercase">Games</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/play"
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      Browse Games
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/play"
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      Popular
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-semibold tracking-wide uppercase">Community</h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/play"
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      Join Rooms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={user ? '/dashboard' : '/login'}
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      {user ? 'Create Room' : 'Sign In'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <div className="bg-border h-4 w-px" role="separator" aria-orientation="vertical" />
              <FooterThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Desktop: Full layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="Realtime Arcade Logo"
                  width={56}
                  height={56}
                  className="h-14 w-14"
                />
                <span className="text-xl font-bold">Realtime Arcade</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                The ultimate multiplayer gaming platform. Play with friends in real-time across
                multiple games.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
                <div className="bg-border h-5 w-px" role="separator" aria-orientation="vertical" />
                <FooterThemeSwitcher />
              </div>
            </div>

            {/* Games */}
            <div className="space-y-4">
              <h3 className="font-semibold">Games</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/play"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Browse All Games
                  </Link>
                </li>
                <li>
                  <Link
                    href="/play"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Popular Games
                  </Link>
                </li>
                <li>
                  <Link
                    href="/play"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    New Releases
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h3 className="font-semibold">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/play"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Join Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    href={user ? '/dashboard' : '/login'}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {user ? 'Create Room' : 'Sign In to Create'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Leaderboards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-muted-foreground mt-4 border-t pt-4 text-center text-xs md:mt-8 md:pt-8 md:text-sm">
          <p>&copy; 2024 Realtime Arcade. Built with Next.js, Supabase, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}

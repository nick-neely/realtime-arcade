"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Gamepad2, Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function Footer() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = useMemo(() => createSupabaseClient(), []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);
  return (
    <footer className="border-t-2 border-foreground bg-background">
      <div className="container mx-auto px-4 py-4 md:py-12">
        {/* Mobile: Compact layout */}
        <div className="md:hidden">
          <div className="space-y-4">
            {/* Brand */}
            <div className="text-center">
              <Link
                href="/"
                className="flex items-center justify-center space-x-2"
              >
                <Gamepad2 className="h-5 w-5" />
                <span className="font-bold text-lg">Realtime Arcade</span>
              </Link>
              <p className="text-xs text-muted-foreground mt-2">
                The ultimate multiplayer gaming platform
              </p>
            </div>

            {/* Links in 2 columns */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold text-xs uppercase tracking-wide">
                  Games
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/play"
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                    >
                      Browse Games
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/play"
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                    >
                      Popular
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xs uppercase tracking-wide">
                  Community
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/play"
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                    >
                      Join Rooms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={user ? "/dashboard" : "/login"}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                    >
                      {user ? "Create Room" : "Sign In"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social links */}
            <div className="flex justify-center space-x-4">
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
            </div>
          </div>
        </div>

        {/* Desktop: Full layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Gamepad2 className="h-6 w-6" />
                <span className="font-bold text-xl">Realtime Arcade</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                The ultimate multiplayer gaming platform. Play with friends in
                real-time across multiple games.
              </p>
              <div className="flex space-x-4">
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
                    href={user ? "/dashboard" : "/login"}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {user ? "Create Room" : "Sign In to Create"}
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

        <div className="border-t mt-4 md:mt-8 pt-4 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>
            &copy; 2024 Realtime Arcade. Built with Next.js, Supabase, and
            Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

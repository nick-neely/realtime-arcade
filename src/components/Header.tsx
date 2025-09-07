"use client";

import { Button } from "@/components/ui/button";
import { createSupabaseClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Gamepad2, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseClient(), []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="border-b-2 border-foreground bg-background">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8" />
            <span className="font-bold text-2xl">Realtime Arcade</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              className="rounded-none border-2 border-transparent hover:border-foreground"
            >
              <Link href="/play">Browse Games</Link>
            </Button>

            {loading ? (
              <div className="w-20 h-10 bg-muted animate-pulse rounded-none" />
            ) : user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-none border-2 border-transparent hover:border-foreground"
                >
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="rounded-none border-2 border-transparent hover:border-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-none border-2 border-transparent hover:border-foreground"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="rounded-none shadow-lg">
                  <Link href="/login">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

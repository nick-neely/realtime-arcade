import { Button } from "@/components/ui/button";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Gamepad2, LogOut, User } from "lucide-react";
import Link from "next/link";

export async function ServerHeader() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b-2 border-foreground bg-background">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8" />
            <span className="font-bold text-2xl">Realtime Arcade</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/play">
              <Button
                variant="ghost"
                className="rounded-none border-2 border-transparent hover:border-foreground"
              >
                Browse Games
              </Button>
            </Link>

            {user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="rounded-none border-2 border-transparent hover:border-foreground"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <form action="/auth/signout" method="post">
                  <Button
                    variant="ghost"
                    type="submit"
                    className="rounded-none border-2 border-transparent hover:border-foreground"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="rounded-none border-2 border-transparent hover:border-foreground"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="rounded-none shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

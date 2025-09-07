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
            <Button
              asChild
              variant="ghost"
              className="rounded-none border-2 border-transparent hover:border-foreground"
            >
              <Link href="/play">Browse Games</Link>
            </Button>

            {user ? (
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

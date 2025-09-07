import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth/requireUser";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Gamepad2, Home, LogOut, Users } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require authentication for all dashboard routes
  const { user } = await requireUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b-2 border-foreground bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Gamepad2 className="h-6 w-6" />
              <span className="font-bold text-xl">Realtime Arcade</span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Gamepad2 className="h-4 w-4" />
                <span>Hub</span>
              </Link>
              <Link
                href="/play"
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>Browse Rooms</span>
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <form action="/auth/signout" method="post">
                <Button
                  variant="ghost"
                  size="sm"
                  type="submit"
                  className="rounded-none border-2 border-transparent hover:border-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

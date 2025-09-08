import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { createSupabaseServer } from '@/lib/supabase/server'
import { Gamepad2, LogOut, Menu, User } from 'lucide-react'
import Link from 'next/link'

export async function ServerHeader() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const NavigationLinks = () => (
    <>
      <Button
        asChild
        variant="ghost"
        className="hover:border-foreground rounded-none border-2 border-transparent"
      >
        <Link href="/play">Browse Games</Link>
      </Button>

      {user ? (
        <>
          <Button
            asChild
            variant="ghost"
            className="hover:border-foreground rounded-none border-2 border-transparent"
          >
            <Link href="/dashboard">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <form action="/auth/signout" method="post">
            <Button
              variant="ghost"
              type="submit"
              className="hover:border-foreground rounded-none border-2 border-transparent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </>
      ) : (
        <>
          <Button
            asChild
            variant="ghost"
            className="hover:border-foreground rounded-none border-2 border-transparent"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="rounded-none shadow-lg">
            <Link href="/login">Get Started</Link>
          </Button>
        </>
      )}
    </>
  )

  return (
    <header className="border-foreground bg-background border-b-2">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8" />
            <span className="text-2xl font-bold">Realtime Arcade</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            <NavigationLinks />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:border-foreground rounded-none border-2 border-transparent"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-4">
                  <NavigationLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}

'use client'

import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { Gamepad2, LogOut, Menu, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseClient(), [])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const NavigationLinks = () => (
    <>
      <Button
        asChild
        variant="ghost"
        className="hover:border-foreground rounded-none border-2 border-transparent"
      >
        <Link href="/play">Browse Games</Link>
      </Button>

      {loading ? (
        <div className="bg-muted h-10 w-20 animate-pulse rounded-none" />
      ) : user ? (
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
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="hover:border-foreground rounded-none border-2 border-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
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
            <ThemeSwitcher />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
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
                <div className="mt-6 flex flex-col space-y-4" onClick={() => setMenuOpen(false)}>
                  <NavigationLinks />
                  <div className="border-border flex justify-center border-t-2 pt-4">
                    <ThemeSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}

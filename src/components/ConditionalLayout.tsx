'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch by only using pathname after client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // During SSR and initial hydration, render a consistent layout
  if (!isClient) {
    // Default to the public layout during SSR to prevent hydration mismatch
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    )
  }

  // Check if we're in a dashboard route
  const isDashboardRoute = /^\/(dashboard|games)(\/|$)/.test(pathname)

  // Check if we're on the landing page
  const isLandingPage = pathname === '/'

  // For dashboard routes, just render children (dashboard layout handles its own header)
  if (isDashboardRoute) {
    return <>{children}</>
  }

  // For landing page, render without header for cleaner hero experience
  if (isLandingPage) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    )
  }

  // For other public routes, render with header and footer
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  )
}

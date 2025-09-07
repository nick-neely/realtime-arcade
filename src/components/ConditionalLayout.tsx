"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if we're in a dashboard route
  const isDashboardRoute = /^\/(dashboard|games)(\/|$)/.test(pathname);

  // Check if we're on the landing page
  const isLandingPage = pathname === "/";

  // Check if we're on the play page (handles its own server-side header)
  const isPlayPage = pathname === "/play";

  // For dashboard routes, just render children (dashboard layout handles its own header)
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // For play page, just render children (play page handles its own server-side header)
  if (isPlayPage) {
    return <>{children}</>;
  }

  // For landing page, render without header for cleaner hero experience
  if (isLandingPage) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }

  // For other public routes, render with header and footer
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

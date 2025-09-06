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
  const isDashboardRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/games/");

  // For dashboard routes, just render children (dashboard layout handles its own header)
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // For public routes, render with header and footer
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

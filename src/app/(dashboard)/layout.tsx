import { AppSidebar } from '@/components/AppSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { requireUser } from '@/lib/auth/requireUser'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Require authentication for all dashboard routes
  const { user } = await requireUser()

  return (
    <SidebarProvider>
      <AppSidebar userEmail={user.email} />
      <SidebarInset>
        <header className="border-foreground bg-background flex h-16 shrink-0 items-center gap-2 border-b-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

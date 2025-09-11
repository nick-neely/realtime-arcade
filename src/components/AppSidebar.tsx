import { FooterThemeSwitcher } from '@/components/FooterThemeSwitcher'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { Gamepad2, Home, LogOut, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Menu items for navigation
const navigationItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Hub',
    url: '/dashboard',
    icon: Gamepad2,
  },
  {
    title: 'Browse Rooms',
    url: '/dashboard/play',
    icon: Users,
  },
]

interface AppSidebarProps {
  userEmail?: string
}

export function AppSidebar({ userEmail }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          <Image
            src="/logo.png"
            alt="Realtime Arcade Logo"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <span className="text-xl font-bold">Realtime Arcade</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            {userEmail && (
              <div className="px-2 py-1">
                <p className="text-muted-foreground truncate text-sm">{userEmail}</p>
              </div>
            )}
            <SidebarSeparator />
            <div className="px-2 py-2 md:hidden">
              <FooterThemeSwitcher />
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <form action="/auth/signout" method="post" className="w-full">
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      type="submit"
                      className="hover:border-foreground w-full justify-start rounded-none border-2 border-transparent"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </Button>
                  </SidebarMenuButton>
                </form>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}

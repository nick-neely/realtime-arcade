import { Button } from "@/components/ui/button";
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
} from "@/components/ui/sidebar";
import { Gamepad2, Home, LogOut, Users } from "lucide-react";
import Link from "next/link";

// Menu items for navigation
const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Hub",
    url: "/dashboard",
    icon: Gamepad2,
  },
  {
    title: "Browse Rooms",
    url: "/dashboard/play",
    icon: Users,
  },
];

interface AppSidebarProps {
  userEmail?: string;
}

export function AppSidebar({ userEmail }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          <Gamepad2 className="h-6 w-6" />
          <span className="font-bold text-xl">Realtime Arcade</span>
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
                <p className="text-sm text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            )}
            <SidebarSeparator />
            <SidebarMenu>
              <SidebarMenuItem>
                <form action="/auth/signout" method="post" className="w-full">
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      type="submit"
                      className="w-full justify-start rounded-none border-2 border-transparent hover:border-foreground"
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
  );
}

"use client";
import {
  Settings,
  LogOut,
  User,
  ChevronDown,
  Box,
  LayoutDashboard,
  ListOrdered,
  MapPin,
  Tag,
  Terminal,
  Car,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useQueryClient } from "@tanstack/react-query";

const navItems = [
  {
    title: "Dashboard",
    children: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
    ],
  },
  {
    title: "Araç",
    children: [
      {
        title: "Marka",
        icon: Tag,
        href: "/marka",
      },
      {
        title: "Model",
        icon: Box,
        href: "/model",
      },
      {
        title: "Listele",
        icon: ListOrdered,
        href: "/liste",
      },
    ],
  },
  {
    title: "SSH",
    children: [
      {
        title: "SSH",
        icon: Terminal,
        href: "/ssh/crash",
      },
    ],
  },
  {
    title: "Adres",
    children: [
      {
        title: "Adres",
        icon: MapPin,
        href: "/address",
      },
    ],
  },
];

export default function CustomSidebar() {
  const queryClient = useQueryClient();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const router = useRouter();
  function logoutUser() {
    queryClient.removeQueries({ queryKey: ["authUser"] });
    localStorage.removeItem("accessToken");
    router.navigate({ to: "/login" });
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Voxx Car</span>
                  <span className="text-xs text-sidebar-foreground/70">
                    Workspace
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {navItems.map((item) => (
          <SidebarMenu key={item.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>{item.title}</SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children.map((child) => (
                      <SidebarMenuSubItem key={`${item.title}-${child.title}`}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === child.href}
                        >
                          <Link to={child.href}>
                            <child.icon className="size-4" />
                            <span>{child.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        ))}
      </SidebarContent>

      <SidebarSeparator className="mt-auto" />

      <SidebarFooter className="w-full">
        <SidebarMenu className="w-full">
          <SidebarMenuItem className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="size-6">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span>John Doe</span>
                    <span className="text-xs text-sidebar-foreground/70">
                      john@example.com
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-4 opacity-50" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[--radix-dropdown-menu-trigger-width]"
              >
                <DropdownMenuItem>
                  <User className="mr-2 size-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutUser}>
                  <LogOut className="mr-2 size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

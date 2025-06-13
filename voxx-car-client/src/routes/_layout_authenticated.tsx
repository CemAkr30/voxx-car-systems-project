import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import { Separator } from "@/components/ui/separator";
import CustomSidebar from "@/components/web/custom-sidebar";

export const Route = createFileRoute("/_layout_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <SidebarProvider>
        <CustomSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Outlet />
    </React.Fragment>
  );
}

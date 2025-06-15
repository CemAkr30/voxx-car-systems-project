import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import React from "react";
import { Separator } from "@/components/ui/separator";
import CustomSidebar from "@/components/web/custom-sidebar";
import { Toaster } from "@/components/ui/sonner";
import usePath from "@/hooks/use-path";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context: { user } }) => {
    if (!user) {
      throw redirect({
        to: "/login",
        statusCode: 301,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const path = usePath();
  return (
    <React.Fragment>
      <SidebarProvider>
        <CustomSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">{path}</h1>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
            <Toaster richColors position="top-right" />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </React.Fragment>
  );
}

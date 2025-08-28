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
import { authUserQueryOptions } from "@/hooks/use-auth-hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context: { user } }) => {
		if (!user) {
			throw redirect({
				to: "/login",
				statusCode: 301,
			});
		}
	},
	loader: async ({ context: { queryClient } }) => {
		await queryClient.prefetchQuery(authUserQueryOptions());
	},
	component: RouteComponent,
});

const getTitle = (path: string) => {
	switch (path) {
		case "/dashboard":
			return "Dashboard";
		case "/marka":
			return "Marka";
		case "/model":
			return "Model";
		case "/firma":
			return "Firma";
		case "/adres":
			return "Adres";
		default:
			return "Dashboard";
	}
};

function RouteComponent() {
	const path = usePath();
	const { data: user } = useSuspenseQuery(authUserQueryOptions());
	return (
		<React.Fragment>
			<SidebarProvider>
				<CustomSidebar user={user} />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<h1 className="text-lg font-semibold">{getTitle(path)}</h1>
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

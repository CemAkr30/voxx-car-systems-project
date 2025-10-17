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
	// Ana sayfalar
	if (path === "/dashboard") return "Yönetim Paneli";
	if (path === "/marka") return "Marka";
	if (path === "/model") return "Model";
	if (path === "/firma") return "Firma";
	if (path === "/arac-filo") return "Araç Filosu";
	
	// Firma detay sayfaları
	if (path.startsWith("/firma/") && path.endsWith("/detay")) return "Firma Detayları";
	if (path.startsWith("/firma/") && path.endsWith("/adres")) return "Firma Adresleri";
	if (path.startsWith("/firma/") && path.endsWith("/iletisim")) return "Firma İletişim";
	if (path.startsWith("/firma/") && path.endsWith("/kiralanan-araclar")) return "Kiralanan Araçlar";
	if (path.startsWith("/firma/") && path.includes("/")) return "Firma";
	
	// Araç filo detay sayfaları
	if (path.startsWith("/arac-filo/") && path.endsWith("/detay")) return "Araç Detayları";
	if (path.startsWith("/arac-filo/") && path.endsWith("/sigorta")) return "Sigorta Bilgileri";
	if (path.startsWith("/arac-filo/") && path.endsWith("/mtv")) return "MTV Bilgileri";
	if (path.startsWith("/arac-filo/") && path.endsWith("/muayene")) return "Muayene Bilgileri";
	if (path.startsWith("/arac-filo/") && path.endsWith("/bakim")) return "Bakım Bilgileri";
	if (path.startsWith("/arac-filo/") && path.endsWith("/hasar")) return "Hasar Bilgileri";
	if (path.startsWith("/arac-filo/") && path.endsWith("/kaza")) return "Kaza Bilgileri";
	if (path.startsWith("/arac-filo/") && path.endsWith("/alis-faturasi")) return "Alış Faturası";
	if (path.startsWith("/arac-filo/") && path.endsWith("/filodan-cikis")) return "Filodan Çıkış";
	if (path.startsWith("/arac-filo/") && path.includes("/")) return "Araç Filosu";
	
	// Form sayfaları
	if (path.includes("/arac-filo/olustur")) return "Yeni Araç Ekle";
	if (path.includes("/arac-filo/") && path.includes("/guncelle")) return "Araç Güncelle";
	
	// Varsayılan
	return "Dashboard";
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

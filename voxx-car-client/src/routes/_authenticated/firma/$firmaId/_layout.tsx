import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_authenticated/firma/$firmaId/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	const { firmaId } = Route.useParams();
	return (
		<React.Fragment>
			<div className="flex w-full flex-col gap-6">
				<Tabs defaultValue="details">
					<TabsList className="w-full h-14">
						<TabsTrigger value="details" asChild>
							<Link to="/firma/$firmaId/detay" params={{ firmaId }}>
								Firma Detayları
							</Link>
						</TabsTrigger>
						<TabsTrigger value="address" asChild>
							<Link to="/firma/$firmaId/adres" params={{ firmaId }}>
								Firma Adresleri
							</Link>
						</TabsTrigger>
						<TabsTrigger value="used-cars" asChild>
							<Link
								to="/firma/$firmaId/kullanilan-araclar"
								params={{ firmaId }}
							>
								Firmada Kullanılan Araçlar
							</Link>
						</TabsTrigger>
					</TabsList>
				</Tabs>
				<Outlet />
			</div>
		</React.Fragment>
	);
}

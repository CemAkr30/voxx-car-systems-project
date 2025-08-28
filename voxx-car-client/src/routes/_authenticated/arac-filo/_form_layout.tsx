import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/arac-filo/_form_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/$aracFiloId/_layout/bakim/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>Hello "/_authenticated/arac-filo/$aracFiloId/_layout/bakim/"!</div>
	);
}

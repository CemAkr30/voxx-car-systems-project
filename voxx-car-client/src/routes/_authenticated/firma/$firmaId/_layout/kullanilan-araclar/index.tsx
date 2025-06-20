import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/kullanilan-araclar/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>Hello "/_authenticated/firma/$id/_layout/kullanilan-araclar/"!</div>
	);
}

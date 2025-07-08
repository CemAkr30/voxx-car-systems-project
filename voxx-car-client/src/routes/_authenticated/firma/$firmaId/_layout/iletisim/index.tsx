import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/iletisim/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/firma/$firmaId/_layout/iletisim/"!</div>;
}

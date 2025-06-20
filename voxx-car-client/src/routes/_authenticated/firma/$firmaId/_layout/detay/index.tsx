import { getFirmaQueryOptions } from "@/hooks/use-firma-hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/detay/",
)({
	loader: async ({ context: { queryClient }, params: { firmaId } }) => {
		await queryClient.prefetchQuery(getFirmaQueryOptions(firmaId));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { firmaId } = Route.useParams();
	const { data: firma } = useSuspenseQuery(getFirmaQueryOptions(firmaId));
	return <pre>{JSON.stringify(firma, null, 2)}</pre>;
}

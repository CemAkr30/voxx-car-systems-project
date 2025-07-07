import AracFiloForm from "@/components/web/arac-filo/arac-filo-form";
import { getAracFiloQueryOptions } from "@/hooks/use-arac-filo-hooks";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/_form_layout/$aracFiloId/guncelle/",
)({
	beforeLoad: async ({ context: { queryClient }, params: { aracFiloId } }) => {
		await queryClient.prefetchQuery(getAracFiloQueryOptions(aracFiloId));
		await queryClient.prefetchQuery(getMarkalarQueryOptions());
		await queryClient.prefetchQuery(getFirmalarQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { aracFiloId } = Route.useParams();
	const [{ data: markalar }, { data: firmalar }, { data: aracFilo }] =
		useSuspenseQueries({
			queries: [
				getMarkalarQueryOptions(),
				getFirmalarQueryOptions(),
				getAracFiloQueryOptions(aracFiloId),
			],
		});
	return (
		<AracFiloForm
			mode="update"
			markalar={markalar}
			firmalar={firmalar}
			initialValues={aracFilo}
		/>
	);
}

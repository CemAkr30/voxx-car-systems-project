import AracFiloForm from "@/components/web/arac-filo/arac-filo-form";
import { getAracFiloQueryOptions } from "@/hooks/use-arac-filo-hooks";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/_form_layout/$aracFiloId/guncelle/",
)({
	loader: ({ context: { queryClient }, params: { aracFiloId } }) => {
		queryClient.ensureQueryData(getAracFiloQueryOptions(aracFiloId));
		queryClient.ensureQueryData(getMarkalarQueryOptions());
		queryClient.ensureQueryData(getFirmalarQueryOptions());
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

import AracFiloForm from "@/components/web/arac-filo/arac-filo-form";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/_form_layout/olustur/",
)({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(getMarkalarQueryOptions());
		queryClient.ensureQueryData(getFirmalarQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const [{ data: markalar }, { data: firmalar }] = useSuspenseQueries({
		queries: [getMarkalarQueryOptions(), getFirmalarQueryOptions()],
	});
	return <AracFiloForm mode="create" markalar={markalar} firmalar={firmalar} />;
}

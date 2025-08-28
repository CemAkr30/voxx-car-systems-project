import MtvDashboard from "@/components/web/dashboard/mtv";
import { getMtvlerQueryOptions } from "@/hooks/use-mtv-hooks";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_authenticated/dashboard")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getMtvlerQueryOptions()),
	head: () => ({
		meta: [
			{
				title: "Dashboard",
			},
			{ name: "description", content: "Learn more about MyApp" },
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const [{ data: mtvler }] = useSuspenseQueries({
		queries: [getMtvlerQueryOptions()],
	});
	return (
		<React.Fragment>
			<MtvDashboard mtvler={mtvler} />
		</React.Fragment>
	);
}

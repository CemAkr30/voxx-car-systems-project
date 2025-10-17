import Dashboard from "@/components/web/dashboard/dashboard";
import {
	getMTVDurumQueryOptions,
	getMuayeneDurumQueryOptions,
	getSigortaDurumQueryOptions,
	getFiloDurumQueryOptions,
	getFirmaAracSayisiQueryOptions,
	getKiralananAraclarQueryOptions,
} from "@/hooks/use-dashboard-hooks";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { getModellerQueryOptions } from "@/hooks/use-model-hooks";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_authenticated/dashboard")({
	loader: ({ context: { queryClient } }) => {
		// Dashboard için gerekli tüm query'leri önceden yükle
		queryClient.ensureQueryData(getMTVDurumQueryOptions("odenmemis"));
		queryClient.ensureQueryData(getMuayeneDurumQueryOptions("odenmemis"));
		queryClient.ensureQueryData(getSigortaDurumQueryOptions());
		queryClient.ensureQueryData(getFiloDurumQueryOptions("aktif"));
		queryClient.ensureQueryData(getFiloDurumQueryOptions("pasif"));
		queryClient.ensureQueryData(getFirmaAracSayisiQueryOptions());
		queryClient.ensureQueryData(getKiralananAraclarQueryOptions());
		queryClient.ensureQueryData(getMarkalarQueryOptions());
		queryClient.ensureQueryData(getModellerQueryOptions());
		queryClient.ensureQueryData(getFirmalarQueryOptions());

	},
	head: () => ({
		meta: [
			{
				title: "Dashboard",
			},
			{ name: "description", content: "Sistem geneli özet bilgiler" },
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<React.Fragment>
			<Dashboard />
		</React.Fragment>
	);
}

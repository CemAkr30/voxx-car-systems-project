import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/arac-filo/$aracFiloId/_layout/")(
	{
		beforeLoad: ({ params: { aracFiloId } }) => {
			throw redirect({ to: "/arac-filo/$aracFiloId/detay", params: { aracFiloId } });
		},
	},
);

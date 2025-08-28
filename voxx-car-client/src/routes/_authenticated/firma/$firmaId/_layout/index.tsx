import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/firma/$firmaId/_layout/")(
	{
		beforeLoad: ({ params: { firmaId } }) => {
			throw redirect({ to: "/firma/$firmaId/detay", params: { firmaId } });
		},
	},
);

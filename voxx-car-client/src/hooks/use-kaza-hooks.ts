import {
	createKaza,
	deleteKaza,
	getKazaByAracFiloId,
	updateKaza,
} from "@/requests/kaza";
import type { CreateKazaRequest, Kaza } from "@/schemas/kaza";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getKazalarByAracFiloIdQueryOptions(aracFiloId: string) {
	return queryOptions({
		queryKey: ["aracFilo", { aracFiloId }, "kaza"],
		queryFn: () => getKazaByAracFiloId(aracFiloId),
	});
}

export const useCreateKazaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (kaza: CreateKazaRequest): Promise<void> =>
			await createKaza(kaza),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateKazaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (kaza: Kaza) => await updateKaza(kaza),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteKazaMutation = (
	aracFiloId: string,
	onSuccess?: () => void,
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteKaza(id),
		async onSuccess() {
			onSuccess?.();
			await queryClient.invalidateQueries(
				getKazalarByAracFiloIdQueryOptions(aracFiloId),
			);
		},
	});
};

import {
	createModel,
	deleteModel,
	getAllModel,
	getModelByMarkaId,
	updateModel,
} from "@/requests/model";
import type { CreateModelRequest, Model } from "@/schemas/model";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getModellerQueryOptions() {
	return queryOptions({
		queryKey: ["modeller"],
		queryFn: getAllModel,
	});
}

export function getModellerByMarkaIdQueryOptions(markaId: string) {
	return queryOptions({
		queryKey: ["modeller", { markaId }],
		queryFn: () => getModelByMarkaId(markaId),
		enabled: markaId !== null || markaId !== "",
	});
}

export const useCreateModelMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (model: CreateModelRequest): Promise<void> => {
			await createModel(model);
		},
		onSuccess() {
			queryClient.invalidateQueries(getModellerQueryOptions());
			onSuccess?.();
		},
	});
};

export const useUpdateModelMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (model: Model) => await updateModel(model),
		onSuccess() {
			queryClient.invalidateQueries(getModellerQueryOptions());
			onSuccess?.();
		},
	});
};

export const useDeleteModelMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteModel(id),
		onSuccess() {
			queryClient.invalidateQueries(getModellerQueryOptions());
			onSuccess?.();
		},
	});
};

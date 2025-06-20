import {
	createModel,
	deleteModel,
	getAllModel,
	updateModel,
} from "@/requests/model";
import type { CreateModelRequest, Model } from "@/schemas/model";
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

export function modellerGetQueryOptions() {
	return queryOptions({
		queryKey: ["modeller"],
		queryFn: getAllModel,
	});
}

export const useModellerQuery = () =>
	useSuspenseQuery(modellerGetQueryOptions());

export const useCreateModelMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (model: CreateModelRequest): Promise<void> => {
			await createModel(model);
		},
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: modellerGetQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: modellerGetQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};

export const useUpdateModelMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (model: Model) => await updateModel(model),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: modellerGetQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: modellerGetQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};

export const useDeleteModelMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteModel(id),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: modellerGetQueryOptions().queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: modellerGetQueryOptions().queryKey,
			});
			onSuccess?.();
		},
	});
};

import {
	createModel,
	deleteModel,
	getAllModel,
	getModelByMarkaId,
	updateModel,
} from "@/requests/model";
import type { CreateModelRequest, Model } from "@/schemas/model";
import { queryOptions, useMutation } from "@tanstack/react-query";

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
		enabled: !!markaId && markaId.trim() !== "",
	});
}

export const useCreateModelMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (model: CreateModelRequest): Promise<void> =>
			await createModel(model),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateModelMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (model: Model) => await updateModel(model),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteModelMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (id: string) => await deleteModel(id),
		onSuccess() {
			onSuccess?.();
		},
	});
};

import {
	createFirma,
	deleteFirma,
	firmaDokumanEkle,
	getAllFirma,
	getFirma,
	getFirmaDokumanlar,
	updateFirma,
} from "@/requests/firma";
import type { CreateFirmaRequest, Firma, FirmaDokumanEkleRequest, FirmaDokuman } from "@/schemas/firma";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export function getFirmalarQueryOptions() {
	return queryOptions({
		queryKey: ["firmalar"],
		queryFn: getAllFirma,
	});
}

export function getFirmaQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["firma", { firmaId }],
		queryFn: () => getFirma(firmaId),
	});
}

export const useCreateFirmaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (firma: CreateFirmaRequest): Promise<void> =>
			await createFirma(firma),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useUpdateFirmaMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (firma: Firma) => await updateFirma(firma),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export const useDeleteFirmaMutation = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => await deleteFirma(id),
		async onSuccess() {
			onSuccess?.();
			await queryClient.invalidateQueries(getFirmalarQueryOptions());
		},
	});
};

export const useFirmaDokumanEkleMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: async (dokuman: FirmaDokumanEkleRequest): Promise<void> =>
			await firmaDokumanEkle(dokuman),
		onSuccess() {
			onSuccess?.();
		},
	});
};

export function getFirmaDokumanlarQueryOptions(firmaId: string) {
	return queryOptions({
		queryKey: ["firma-dokumanlar", { firmaId }],
		queryFn: () => getFirmaDokumanlar(firmaId),
	});
}

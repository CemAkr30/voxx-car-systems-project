import {
  createFirma,
  deleteFirma,
  getAllFirma,
  updateFirma,
} from "@/requests/firma";
import type { CreateFirmaRequest, Firma } from "@/schemas/firma";
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const firmalarGetQueryOptions = queryOptions({
  queryKey: ["firmalar"],
  queryFn: async () => await getAllFirma(),
});

export const useFirmalarQuery = () => useSuspenseQuery(firmalarGetQueryOptions);

export const useCreateFirmaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (firma: CreateFirmaRequest): Promise<void> => {
      await createFirma(firma);
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["firmalar"] });
      queryClient.invalidateQueries({ queryKey: ["firmalar"] });
      onSuccess?.();
    },
  });
};

export const useUpdateFirmaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (firma: Firma) => await updateFirma(firma),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["firmalar"] });
      queryClient.invalidateQueries({ queryKey: ["firmalar"] });
      onSuccess?.();
    },
  });
};

export const useDeleteFirmaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteFirma(id),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["firmalar"] });
      queryClient.invalidateQueries({ queryKey: ["firmalar"] });
      onSuccess?.();
    },
  });
};

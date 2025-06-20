import {
  createAdres,
  deleteAdres,
  getAllAdres,
  updateAdres,
} from "@/requests/adres";
import type { CreateAdresRequest, Adres } from "@/schemas/adres";
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function adreslerGetQueryOptions() {
  return queryOptions({
    queryKey: ["adresler"],
    queryFn: getAllAdres,
  });
}

export const useAdreslerQuery = () =>
  useSuspenseQuery(adreslerGetQueryOptions());

export const useCreateAdresMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (adres: CreateAdresRequest): Promise<void> => {
      await createAdres(adres);
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: adreslerGetQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: adreslerGetQueryOptions().queryKey,
      });
      onSuccess?.();
    },
  });
};

export const useUpdateAdresMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (adres: Adres) => await updateAdres(adres),
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: adreslerGetQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: adreslerGetQueryOptions().queryKey,
      });
      onSuccess?.();
    },
  });
};

export const useDeleteAdresMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteAdres(id),
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: adreslerGetQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: adreslerGetQueryOptions().queryKey,
      });
      onSuccess?.();
    },
  });
};

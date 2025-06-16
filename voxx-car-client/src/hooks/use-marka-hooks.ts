import {
  createMarka,
  deleteMarka,
  getAllMarka,
  updateMarka,
} from "@/requests/marka";
import type { CreateMarkaRequest, Marka } from "@/schemas/marka";
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const markalarGetQueryOptions = queryOptions({
  queryKey: ["markalar"],
  queryFn: async () => await getAllMarka(),
});

export const useMarkalarQuery = () => useSuspenseQuery(markalarGetQueryOptions);

export const useCreateMarkaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (marka: CreateMarkaRequest): Promise<void> => {
      await createMarka(marka);
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["markalar"] });
      queryClient.invalidateQueries({ queryKey: ["markalar"] });
      onSuccess?.();
    },
  });
};

export const useUpdateMarkaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (marka: Marka) => await updateMarka(marka),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["markalar"] });
      onSuccess?.();
    },
  });
};

export const useDeleteMarkaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteMarka(id),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["markalar"] });
      onSuccess?.();
    },
  });
};

import {
  createMarka,
  deleteMarka,
  getAllMarka,
  updateMarka,
} from "@/requests/marka";
import type { CreateMarkaRequest, Marka } from "@/schemas/marka";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

const queryKey: QueryKey = ["markalar"];

export const useMarkalarQuery = () =>
  useQuery({
    queryKey,
    queryFn: async () => await getAllMarka(),
  });

export const useCreateMarkaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (marka: CreateMarkaRequest): Promise<void> => {
      await createMarka(marka);
    },
    onMutate: async (marka: CreateMarkaRequest) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMarkalar = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: Marka[]) => [
        ...old,
        {
          id: "-",
          adi: marka.adi,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        },
      ]);
      return { previousMarkalar };
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey });
      onSuccess?.();
    },
    onError(...[, , context]) {
      queryClient.setQueryData(["markalar"], context?.previousMarkalar);
    },
  });
};

export const useUpdateMarkaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (marka: Marka) => await updateMarka(marka),
    onMutate: async (updatedMarka: Marka) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMarkalar = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: Marka[]) =>
        old.map((m) =>
          m.id === updatedMarka.id
            ? {
                ...m,
                adi: updatedMarka.adi,
                updatedAt: new Date().toString(),
              }
            : m
        )
      );
      return { previousMarkalar };
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.();
    },
    onError(...[, , context]) {
      queryClient.setQueryData(queryKey, context?.previousMarkalar);
    },
  });
};

export const useDeleteMarkaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      if (ids.length === 1) {
        await deleteMarka(ids[0]);
      } else {
        await Promise.all(ids.map(async (id) => await deleteMarka(id)));
      }
    },
    onMutate: async (ids: string[]) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMarkalar = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: Marka[]) =>
        old.filter((marka) => !ids.includes(marka.id))
      );
      return { previousMarkalar };
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.();
    },
    onError(...[, , context]) {
      queryClient.setQueryData(queryKey, context?.previousMarkalar);
    },
  });
};

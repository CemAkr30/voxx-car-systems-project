import type {
  CreateMarkaRequest,
  Marka,
  UpdateMarkaRequest,
} from "@/schemas/marka";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const mockData: UpdateMarkaRequest[] = [
  {
    id: 1,
    adi: "Toyota",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    adi: "Honda",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: 3,
    adi: "Ford",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-17",
  },
  {
    id: 4,
    adi: "BMW",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
  {
    id: 5,
    adi: "Mercedes",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19",
  },
  {
    id: 6,
    adi: "Audi",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: 7,
    adi: "Volkswagen",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-21",
  },
  {
    id: 8,
    adi: "Nissan",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
  },
];

export const useMarkalarQuery = () =>
  useQuery({
    queryKey: ["markalar"],
    queryFn: async () => {
      return mockData;
    },
    initialData: [],
  });

export const useCreateMarkaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["markalar"],
    mutationFn: async (marka: CreateMarkaRequest) => {
      return {
        id: mockData.length + Math.floor(Math.random() * 500000),
        adi: marka.adi,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };
    },
    onSuccess(...[data, ,]) {
      if (data) {
        queryClient.setQueryData(["markalar"], (old: Marka[]) => {
          return [data, ...old.slice(1)];
        });
      }
      onSuccess?.();
    },
  });
};

export const useUpdateMarkaMutation = (id: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["markalar", { id }],
    mutationFn: async (marka: UpdateMarkaRequest) => {
      const existingMarka = mockData.find((mrk) => mrk.id === id);
      return {
        ...existingMarka,
        adi: marka.adi,
      };
    },
    onSuccess(...[data, ,]) {
      if (data) {
        queryClient.setQueryData(["markalar"], (old: Marka[]) => {
          return [data, ...old.slice(1)];
        });
      }
      onSuccess?.();
    },
  });
};

export const useDeleteMarkaMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["markalar"],
    mutationFn: async (ids: number[]) => {
      const deletedMarka = mockData.filter((mrk) => ids.includes(mrk.id));
      return deletedMarka;
    },
    onSuccess(...[data, ,]) {
      if (data) {
        const ids = data.map((m) => m.id);
        queryClient.setQueryData(["markalar"], (old: Marka[]) => {
          return old.filter((m) => !ids.includes(m.id));
        });
      }
      onSuccess?.();
    },
  });
};

export const useOptimisticMarkaAdi = () => {
  const mutations = useMutationState({
    filters: { mutationKey: ["markalar"], status: "pending" },
  });
  const firstMutations = mutations.at(0);
  if (firstMutations) {
    const marka = firstMutations.variables as Marka;
    return marka.adi;
  }
  return undefined;
};

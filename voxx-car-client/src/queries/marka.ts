import type { Marka } from "@/types";
import { queryOptions } from "@tanstack/react-query";

export const markalarOptions = (page: number, count: number) =>
  queryOptions({
    queryKey: ["narkalar", "list", { page }, { count }],
    queryFn: async () => {
      const mockData: Marka[] = [
        {
          id: "1",
          adi: "Toyota",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
        },
        {
          id: "2",
          adi: "Honda",
          createdAt: "2024-01-16",
          updatedAt: "2024-01-16",
        },
        {
          id: "3",
          adi: "Ford",
          createdAt: "2024-01-17",
          updatedAt: "2024-01-17",
        },
        {
          id: "4",
          adi: "BMW",
          createdAt: "2024-01-18",
          updatedAt: "2024-01-18",
        },
        {
          id: "5",
          adi: "Mercedes",
          createdAt: "2024-01-19",
          updatedAt: "2024-01-19",
        },
        {
          id: "6",
          adi: "Audi",
          createdAt: "2024-01-20",
          updatedAt: "2024-01-20",
        },
        {
          id: "7",
          adi: "Volkswagen",
          createdAt: "2024-01-21",
          updatedAt: "2024-01-21",
        },
        {
          id: "8",
          adi: "Nissan",
          createdAt: "2024-01-22",
          updatedAt: "2024-01-22",
        },
      ];
      return mockData;
    },
    initialData: [],
  });

import getCurrentUser from "@/data/auth";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const authUserQueryOptions = queryOptions({
  queryKey: ["authUser"],
  queryFn: getCurrentUser,
  enabled: !!localStorage.getItem("accessToken"),
  staleTime: 5 * 60 * 1000,
  retry: 1,
});

export const useAuthUser = () => {
  return useQuery(authUserQueryOptions);
};

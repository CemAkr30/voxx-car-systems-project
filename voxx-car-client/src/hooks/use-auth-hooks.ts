import getCurrentUser from "@/data/auth";
import { login } from "@/requests/auth";
import type { LoginRequest, LoginResponse } from "@/schemas/auth";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function authUserQueryOptions() {
	return queryOptions({
		queryKey: ["authUser"],
		queryFn: getCurrentUser,
		enabled: !!localStorage.getItem("accessToken"),
		staleTime: 5 * 60 * 1000,
		retry: 1,
	});
}

export const useAuthLoginMutation = () => {
	return useMutation({
		mutationKey: ["login"],
		mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> =>
			await login(credentials),
	});
};

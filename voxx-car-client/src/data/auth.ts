import { axiosClient } from "@/lib/axios";

export default async function getCurrentUser() {
	const { data } = await axiosClient.get("/auth/userinfo");
	return data;
}

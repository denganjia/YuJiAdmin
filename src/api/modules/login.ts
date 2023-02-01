import request from "@/api/index";

export function login(params: any) {
	return request.post<{ token: string }>("/login", params);
}

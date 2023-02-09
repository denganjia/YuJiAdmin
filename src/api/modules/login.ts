import request from "@/api/index";

export function login(params: any) {
	return request.post<{ token: string }>("/login", params);
}

export function getRoutesApi() {
	return request.get("/system/menu");
}

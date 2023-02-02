import qs from "qs";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Response } from "@/types";

const config: AxiosRequestConfig = {
	// 基础路径
	baseURL: "/api",
	// 超时时间
	timeout: 10000,
	// 跨域携带凭证
	withCredentials: true,
	// params序列化
	paramsSerializer: {
		serialize: (params: any) => {
			return qs.stringify(params, { arrayFormat: "repeat" });
		}
	}
};

class Request {
	private instance: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);

		// 注入token
		this.instance.defaults.headers.common["apifoxToken"] = localStorage.getItem("token") ?? "";
		// 请求拦截器
		this.instance.interceptors.request.use(
			config => {
				return config;
			},
			error => {
				console.log(error);
			}
		);
		// 响应拦截
		this.instance.interceptors.response.use(
			value => {
				return value.data;
			},
			() => {}
		);
	}

	get<T = any>(url: string, params?: object | string, config: AxiosRequestConfig = {}) {
		return this.instance.get(url, { params, ...config }) as unknown as Promise<Response<T>>;
	}

	post<T = any>(url: string, data?: object, config: AxiosRequestConfig = {}) {
		return this.instance.post(url, data, config) as unknown as Promise<Response<T>>;
	}

	put<T = any>(url: string, data?: object, config: AxiosRequestConfig = {}) {
		return this.instance.put(url, data, config) as unknown as Promise<Response<T>>;
	}

	delete<T = any>(url: string, params?: object | string, config: AxiosRequestConfig = {}) {
		return this.instance.delete(url, { params, ...config }) as unknown as Promise<Response<T>>;
	}
}

export default new Request(config);

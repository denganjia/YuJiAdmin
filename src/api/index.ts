import qs from "qs";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

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
	}

	get(url: string, params?: object | string, config: AxiosRequestConfig = {}) {
		return this.instance.get(url, { params, ...config });
	}

	post(url: string, data?: object, config: AxiosRequestConfig = {}) {
		return this.instance.post(url, data, config);
	}

	put(url: string, data?: object, config: AxiosRequestConfig = {}) {
		return this.instance.put(url, data, config);
	}

	delete(url: string, params?: object | string, config: AxiosRequestConfig = {}) {
		return this.instance.delete(url, { params, ...config });
	}
}

export default new Request(config);

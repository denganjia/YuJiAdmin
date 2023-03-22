import { StateCreator } from "zustand";
import { Routes } from "@/types";
import { genBreadcrumb } from "@/utils/genBreadcrumb";

export interface MenuSlice {
	/**
	 * @description 侧边栏折叠状态
	 * */
	collapsed: boolean;
	/**
	 * @description 正则化后的路由JSON
	 * */
	regRouteJson: Routes;
	/**
	 * @description 侧边栏折叠方法
	 * */
	collapse: (payload: boolean) => void;
	/**
	 * @description 初始化正则路由
	 * */
	initRegRouteJson: (payload: Routes) => void;
	/**
	 * @description 面包屑
	 * */
	breadcrumb: { [key: string]: Routes };
}

export const createMenuSlice: StateCreator<MenuSlice, [["zustand/devtools", never]], [], MenuSlice> = set => ({
	collapsed: false,
	regRouteJson: [],
	collapse: payload => set(() => ({ collapsed: payload }), false, "menu/collapse"),
	initRegRouteJson: payload => {
		const result = genBreadcrumb(payload);
		return set(
			() => {
				return { regRouteJson: payload, breadcrumb: result };
			},
			false,
			"menu/initRegRouteJson"
		);
	},
	breadcrumb: {}
});

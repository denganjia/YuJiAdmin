import { StateCreator } from "zustand";
import { Routes } from "@/types";

export interface MenuSlice {
	/**
	 * @description 侧边栏折叠状态
	 * */
	collapsed: boolean;
	/**
	 * @description 正则化后的路由JSON
	 * */
	regxRouteJson: Routes;
	collapse: (payload: boolean) => void;
	initRegxRouteJson: (payload: Routes) => void;
}

export const createMenuSlice: StateCreator<MenuSlice, [["zustand/devtools", never]], [], MenuSlice> = set => ({
	collapsed: false,
	regxRouteJson: [],
	collapse: payload => set(() => ({ collapsed: payload }), false, "menu/collapse"),
	initRegxRouteJson: payload => set(() => ({ regxRouteJson: payload }), false, "menu/initRegxRouteJson")
});

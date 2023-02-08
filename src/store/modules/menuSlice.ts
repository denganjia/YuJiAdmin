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
	regRouteJson: Routes;
	collapse: (payload: boolean) => void;
	initRegRouteJson: (payload: Routes) => void;
}

export const createMenuSlice: StateCreator<MenuSlice, [["zustand/devtools", never]], [], MenuSlice> = set => ({
	collapsed: false,
	regRouteJson: [],
	collapse: payload => set(() => ({ collapsed: payload }), false, "menu/collapse"),
	initRegRouteJson: payload => set(() => ({ regRouteJson: payload }), false, "menu/initRegRouteJson")
});

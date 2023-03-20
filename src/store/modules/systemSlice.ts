import { StateCreator } from "zustand";
import { Routes } from "@/types";

export interface SystemSlice {
	jsonRoutes: Routes;
	initJsonRoutes: (payload: any) => Promise<void>;
}

export const createSystemSlice: StateCreator<SystemSlice, [["zustand/devtools", never]], [], SystemSlice> = set => ({
	jsonRoutes: [],
	initJsonRoutes: payload => {
		return new Promise(resolve => {
			set(() => ({ jsonRoutes: payload }), false, "systemSlice/initRoutes");
			resolve();
		});
	}
});

import { StateCreator } from "zustand";
import type { MenuProps } from "antd";

export interface LocaleSlice {
	// 地区
	locale: "zh" | "en";
	// 下拉菜单
	locales: MenuProps["items"];
	// 切换地区
	changeLocale: (payload: LocaleSlice["locale"]) => void;
}

export const createLocaleSlice: StateCreator<LocaleSlice, [["zustand/devtools", never]], [], LocaleSlice> = set => ({
	locale: "zh",
	locales: [
		{
			key: "zh",
			label: "简体中文"
		},
		{
			key: "en",
			label: "English"
		}
	],
	changeLocale: payload => set(() => ({ locale: payload }), false, "localSlice/changeLocal")
});

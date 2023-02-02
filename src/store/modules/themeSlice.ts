import { StateCreator } from "zustand";

export interface ThemeSlice {
	theme: "dark" | "light";
	changeTheme: (payload: ThemeSlice["theme"]) => void;
	primaryColor: string;
	changePrimaryColor: (payload: string) => void;
	componentSize: "small" | "default" | "large";
	changeComponentSize: (payload: ThemeSlice["componentSize"]) => void;
	siderBarStyle: "light" | "dark";
	changeSiderBar: (payload: ThemeSlice["siderBarStyle"]) => void;
	compact: boolean;
	toggleCompact: () => void;
	presetColors: string[];
}

export const createThemeSlice: StateCreator<ThemeSlice, [["zustand/devtools", never]], [], ThemeSlice> = set => ({
	theme: "dark",
	changeTheme: payload => set(() => ({ theme: payload }), false, "theme/changeTheme"),
	primaryColor: "#1890ff",
	changePrimaryColor: payload => set(() => ({ primaryColor: payload }), false, "theme/changePrimaryColor"),
	componentSize: "default",
	changeComponentSize: payload => set(() => ({ componentSize: payload }), false, "theme/changeComponentSize"),
	siderBarStyle: "light",
	changeSiderBar: payload => set(() => ({ siderBarStyle: payload }), false, "theme/changeSiderBar"),
	compact: false,
	toggleCompact: () => set(state => ({ compact: !state.compact }), false, "theme/toggleCompact"),
	presetColors: ["#1677ff", "#5A54F9", "#9E339F", "#ED4192", "#E0282E", "#F4801A", "#F2BD27", "#00B96B"]
});

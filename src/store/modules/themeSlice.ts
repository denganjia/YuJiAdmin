import { StateCreator } from "zustand";

export interface ThemeSlice {
	theme: "dark" | "light";
	changeTheme: (payload: ThemeSlice["theme"]) => void;
	primaryColor: string;
	changePrimaryColor: (payload: string) => void;
	componentSize: "small" | "default" | "large";
	changeComponentSize: (payload: ThemeSlice["componentSize"]) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice, [["zustand/devtools", never]], [], ThemeSlice> = set => ({
	theme: "dark",
	changeTheme: payload => set(() => ({ theme: payload }), false, "theme/changeTheme"),
	primaryColor: "#1890ff",
	changePrimaryColor: payload => set(() => ({ primaryColor: payload }), false, "theme/changePrimaryColor"),
	componentSize: "default",
	changeComponentSize: payload => set(() => ({ componentSize: payload }), false, "theme/changeComponentSize")
});

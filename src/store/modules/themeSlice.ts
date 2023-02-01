import { StateCreator } from "zustand";

export interface ThemeSlice {
	theme: "dark" | "light";
	changeTheme: (payload: ThemeSlice["theme"]) => void;
	primaryColor: string;
	changePrimaryColor: (payload: string) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice, [["zustand/devtools", never]], [], ThemeSlice> = set => ({
	theme: "dark",
	primaryColor: "#1890ff",
	changeTheme: payload => set(() => ({ theme: payload }), false, "theme/changeTheme"),
	changePrimaryColor: payload => set(() => ({ primaryColor: payload }), false, "theme/changePrimaryColor")
});

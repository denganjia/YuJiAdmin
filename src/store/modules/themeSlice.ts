import { StateCreator } from "zustand";

export interface ThemeSlice {
	theme: "dark" | "light";
	changeTheme: (payload: ThemeSlice["theme"]) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice, [["zustand/devtools", never]], [], ThemeSlice> = set => ({
	theme: "dark",
	changeTheme: payload => set(() => ({ theme: payload }), false, "theme/changeTheme")
});

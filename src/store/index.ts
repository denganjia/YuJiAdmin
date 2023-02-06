import { createLocaleSlice, createMenuSlice, createThemeSlice, LocaleSlice, MenuSlice, ThemeSlice } from "@/store/modules";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { devtools, persist } from "zustand/middleware";

export const useBoundStore = create<ThemeSlice & MenuSlice & LocaleSlice>()(
	devtools(
		persist(
			(...a) => ({
				...createMenuSlice(...a),
				...createThemeSlice(...a),
				...createLocaleSlice(...a)
			}),
			{ name: "RootStore" }
		),
		{ name: "RootStore" }
	)
);
/**
 * @name useShallowBoundStore
 * @description 携带了`shallow`的useBoundStore
 * */
export const useShallowBoundStore = (f: (state: ReturnType<typeof useBoundStore["getState"]>) => any) => {
	return useBoundStore(f, shallow);
};

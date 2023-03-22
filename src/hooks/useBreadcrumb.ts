import { useEffect, useState } from "react";
import { Routes } from "@/types";
import { useLocation } from "react-router-dom";
import { useBoundStore } from "@/store";

export const useBreadcrumb = () => {
	const [breadcrumb, setBreadcrumb] = useState<Routes>([]);
	const location = useLocation();
	const storedBreadcrumb = useBoundStore(state => state.breadcrumb);
	useEffect(() => {
		const keys = Object.keys(storedBreadcrumb);
		keys.forEach(key => {
			if (new RegExp(`${key}`).test(location.pathname)) {
				setBreadcrumb(storedBreadcrumb[key]);
			}
		});
	}, [location]);
	return breadcrumb;
};

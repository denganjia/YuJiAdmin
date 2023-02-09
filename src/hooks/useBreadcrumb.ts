import { useEffect, useState } from "react";
import { Routes } from "@/types";
import { useLocation } from "react-router-dom";
import { useBoundStore } from "@/store";

export const useBreadcrumb = () => {
	const [breadcrumb, setBreadcrumb] = useState<Routes>([]);
	const location = useLocation();
	const regRouter = useBoundStore(state => state.regRouteJson);
	useEffect(() => {
		const worker = new Worker(new URL("../worker/findBreadcrumb", import.meta.url));
		worker.postMessage({ path: location.pathname, routes: regRouter });
		worker.onmessage = ev => {
			setBreadcrumb(ev.data);
			worker.terminate();
		};
	}, [location]);
	return breadcrumb;
};

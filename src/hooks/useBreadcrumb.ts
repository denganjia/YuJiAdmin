import { useEffect, useState } from "react";
import { Routes } from "@/types";
import routerJson from "@/routes/router.json";
import { useLocation } from "react-router-dom";

export const useBreadcrumb = () => {
	const [breadcrumb, setBreadcrumb] = useState<Routes>([]);
	const location = useLocation();
	useEffect(() => {
		const worker = new Worker(new URL("../worker/findBreadcrumb", import.meta.url));
		worker.postMessage({ path: location.pathname, routes: routerJson });
		worker.onmessage = ev => {
			setBreadcrumb(ev.data);
			worker.terminate();
		};
	}, [location]);
	return breadcrumb;
};

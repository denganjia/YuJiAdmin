import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "@/error-page";
import { Index as Layout } from "@/layout";
import routerJSON from "./router.json";

let modules = import.meta.glob("@/views/*/index.tsx", { eager: true }) as Record<string, any>;
let childrenRouter: RouteObject[] = [];
let modulesKeys = Object.keys(modules);
routerJSON.forEach(async route => {
	for (const key of modulesKeys) {
		if (key.includes(route.element)) {
			let Element = modules[key].default;
			childrenRouter.push({
				path: route.path,
				element: <Element />
			});
		}
	}
});
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		errorElement: <ErrorPage />,
		children: childrenRouter
	}
]);

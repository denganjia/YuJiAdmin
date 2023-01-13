import { Routes } from "@/types";

let result: Routes = [];

const findBreadcrumb = (path: string, routes: Routes, parent: string = "") => {
	try {
		routes.forEach(route => {
			result.push(route);
			if (new RegExp(`^${parent + route.path}$`).test(path)) {
				postMessage(result);
			} else if (route.children?.length) {
				findBreadcrumb(path, route.children, route.path);
			}
			result.pop();
		});
	} catch (e) {
		console.log(e);
	}
};

self.onmessage = ev => {
	result = [];
	findBreadcrumb(ev.data.path, ev.data.routes);
};

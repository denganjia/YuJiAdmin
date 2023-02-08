import { Routes } from "@/types";

let matchReg = /:.[^/]*/;
let toReg = ".*";
const transform = (routes: Routes, parent: string = "", arr: Routes = []) => {
	try {
		routes.forEach(route => {
			let item = {
				...route,
				path: (parent + (route.path ?? "")).replace(matchReg, toReg)
			};
			if (route.children?.length) {
				item.children = transform(route.children, route.path);
			}
			arr.push(item);
		});
		return arr;
	} catch (e) {
		console.log(e);
	}
};

self.onmessage = ev => {
	postMessage(transform(ev.data.routes));
};

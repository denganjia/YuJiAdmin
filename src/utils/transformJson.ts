import { Routes } from "@/types";

export function transformJson(routes: Routes) {
	return new Promise<Routes>((resolve, reject) => {
		let result: any[] = [];
		const worker = new Worker(new URL("../worker/transformationJson", import.meta.url), { type: "module" });
		worker.postMessage({ routes });
		worker.onmessage = ev => {
			result = [...ev.data];
			resolve(result);
		};
		worker.onerror = ev => {
			reject(ev);
		};
	});
}

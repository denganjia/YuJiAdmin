import request from "@/api/index";

export namespace Dashboard {
	export type Statistics = Record<"user" | "download" | "online", number> & { version: string };
	export type Histogram = { date: string; value: number }[];
	export type PieData = {
		name: string;
		value: number;
	}[];
}

export function getStatisticsApi() {
	return request.get<Dashboard.Statistics>("/statistics");
}

export function getHistogram() {
	return request.get<Dashboard.Histogram>("/dashboard/histogram");
}

export function getPieData() {
	return request.get<Dashboard.PieData>("/dashboard/pie");
}

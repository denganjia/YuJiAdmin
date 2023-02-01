import request from "@/api/index";

export namespace Dashboard {
	export type Statistics = Record<"user" | "download" | "online", number> & { version: string };
}

export function getStatisticsApi() {
	return request.get<Dashboard.Statistics>("/statistics");
}

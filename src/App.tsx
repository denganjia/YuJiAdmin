import zhCN from "antd/locale/zh_CN";
import { ConfigProvider, Spin, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import React, { Suspense } from "react";
import routerJson from "@/routes/router.json";
import { transformJson } from "@/utils/transformJson";
import { useBoundStore } from "@/store";

const App = () => {
	const themeType = useBoundStore(state => state.theme);
	const initRegxRouteJson = useBoundStore(state => state.initRegxRouteJson);
	transformJson(routerJson).then(res => {
		initRegxRouteJson(res);
	});
	return (
		<Suspense fallback={<Spin />}>
			<ConfigProvider locale={zhCN} theme={{ algorithm: themeType === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
				<RouterProvider router={router}></RouterProvider>
			</ConfigProvider>
		</Suspense>
	);
};

export default App;

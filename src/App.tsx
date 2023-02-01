import zhCN from "antd/locale/zh_CN";
import { ConfigProvider, Spin, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import React, { Suspense } from "react";
import routerJson from "@/routes/router.json";
import { transformJson } from "@/utils/transformJson";
import { useBoundStore, useShallowBoundStore } from "@/store";

const App = () => {
	// 暗色模式 和 主色切换
	const [themeType, primaryColor, componentSize] = useShallowBoundStore(state => [
		state.theme,
		state.primaryColor,
		state.componentSize
	]);
	const initRegxRouteJson = useBoundStore(state => state.initRegxRouteJson);
	transformJson(routerJson).then(res => {
		initRegxRouteJson(res);
	});
	return (
		<Suspense fallback={<Spin />}>
			<ConfigProvider
				locale={zhCN}
				theme={{
					algorithm: themeType === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
					token: { colorPrimary: primaryColor }
				}}
				componentSize={componentSize}
			>
				<RouterProvider router={router}></RouterProvider>
			</ConfigProvider>
		</Suspense>
	);
};

export default App;

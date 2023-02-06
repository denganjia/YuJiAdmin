import zhCN from "antd/locale/zh_CN";
import { ConfigProvider, Spin, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import React, { Suspense, useEffect, useState } from "react";
import routerJson from "@/routes/router.json";
import { transformJson } from "@/utils/transformJson";
import { useBoundStore, useShallowBoundStore } from "@/store";
import { changeLanguage } from "i18next";

const App = () => {
	// 暗色模式 和 主色切换
	const [themeType, primaryColor, componentSize, compact] = useShallowBoundStore(state => [
		state.theme,
		state.primaryColor,
		state.componentSize,
		state.compact
	]);
	// 设置正则路由
	const initRegxRouteJson = useBoundStore(state => state.initRegxRouteJson);
	transformJson(routerJson).then(res => {
		initRegxRouteJson(res);
	});
	// 设置主体算法
	const [algorithm, setAlgorithm] = useState([]);
	useEffect(() => {
		let res: any = [];
		if (themeType === "dark") {
			res.push(theme.darkAlgorithm);
		} else {
			res.push(theme.defaultAlgorithm);
		}
		if (compact) {
			res.push(theme.compactAlgorithm);
		}
		setAlgorithm(() => {
			return res;
		});
	}, [themeType, compact]);
	// 设置语言
	const locale = useBoundStore(state => state.locale);
	changeLanguage(locale);
	return (
		<Suspense fallback={<Spin />}>
			<ConfigProvider
				locale={zhCN}
				theme={{
					// algorithm: themeType === "dark" ? theme.darkAlgorithm : [theme.defaultAlgorithm, theme.compactAlgorithm],
					algorithm: algorithm,
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

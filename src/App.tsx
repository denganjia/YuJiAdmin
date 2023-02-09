import zhCN from "antd/locale/zh_CN";
import { ConfigProvider, Spin, theme } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import routerJson from "@/routes/router.json";
import { transformJson } from "@/utils/transformJson";
import { useBoundStore, useShallowBoundStore } from "@/store";
import { changeLanguage } from "i18next";
import createRoute from "@/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
	// 暗色模式 和 主色切换
	const [themeType, primaryColor, componentSize, compact] = useShallowBoundStore(state => [
		state.theme,
		state.primaryColor,
		state.componentSize,
		state.compact
	]);
	// 设置正则路由
	const initRegRouteJson = useBoundStore(state => state.initRegRouteJson);
	transformJson(routerJson).then(res => {
		initRegRouteJson(res);
	});
	// 设置主题算法
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
	useEffect(() => {
		changeLanguage(locale);
	}, [locale]);
	return (
		<Suspense fallback={<Spin />}>
			<ConfigProvider
				locale={zhCN}
				theme={{
					algorithm: algorithm,
					token: { colorPrimary: primaryColor }
				}}
				componentSize={componentSize}
			>
				<RouterProvider router={createRoute()}></RouterProvider>
			</ConfigProvider>
		</Suspense>
	);
};

export default App;

import zhCN from "antd/locale/zh_CN";
import { ConfigProvider, Spin, theme } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { transformJson } from "@/utils/transformJson";
import { useBoundStore, useShallowBoundStore } from "@/store";
import { changeLanguage } from "i18next";
import Router from "./routes";

const App = () => {
	// 暗色模式 和 主色切换
	const [themeType, primaryColor, componentSize, compact] = useShallowBoundStore(state => [
		state.theme,
		state.primaryColor,
		state.componentSize,
		state.compact
	]);
	// 设置正则路由
	const [routes, initRegRouteJson] = useShallowBoundStore(state => [state.jsonRoutes, state.initRegRouteJson]);
	useEffect(() => {
		transformJson(routes).then(res => {
			initRegRouteJson(res);
		});
	}, [routes]);
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
	// 路由
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
				<Router></Router>
			</ConfigProvider>
		</Suspense>
	);
};

export default App;

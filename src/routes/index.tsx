import { createHashRouter, redirect, RouteObject } from "react-router-dom";
import ErrorPage from "./components/index";
import NotFound from "./components/404";
import { Routes } from "@/types";
import Login from "@/views/Login/index";
import React, { useEffect, useState } from "react";
import Lazy from "@/components/Lazy";
import Layout from "@/layout";
import { Config } from "@/config";
import { useBoundStore } from "@/store";

let modules = import.meta.glob("@/views/**/index.tsx", { eager: false }) as Record<string, any>;

// 动态加载路由
const getRoutes = async (router?: Routes, parent: string = "", arr: any = []) => {
	if (!router) return [];
	for (const route of router) {
		let item: RouteObject = {
			index: route.index ?? false,
			path: parent + (route.path ?? ""),
			errorElement: <ErrorPage />,
			// 此处加载路由JSON中携带的数据
			loader: () => {
				return route.data || {};
			}
		};
		//如果有element就加载组件
		if (route.element) {
			item.element = <Lazy Component={React.lazy(modules[`${Config.PageBaseUrl + route.element}.tsx`])} />;
		}
		// 如果有children子路由就递归加载
		if (route.children) {
			item.children = [...(await getRoutes(route.children ?? undefined, item.path))];
		}
		arr.push(item);
	}
	return arr;
};

const Index = () => {
	const routesJson = useBoundStore(state => state.routes);
	const [children, setChildren] = useState([]);
	useEffect(() => {
		getRoutes(routesJson).then(res => {
			setChildren(res);
		});
	}, [routesJson]);
	return createHashRouter([
		{
			path: "/",
			element: <Layout></Layout>,
			errorElement: <ErrorPage />,
			children: [{ errorElement: <ErrorPage />, children: children }],
			loader() {
				let token = localStorage.getItem("token");
				console.log(token);
				if (!token) {
					return redirect("/login");
				}
				return {};
			}
		},
		{
			path: "/login",
			element: <Login></Login>,
			errorElement: <ErrorPage />
		},
		{
			path: "*",
			element: <NotFound></NotFound>
		}
	]);
};
export default Index;

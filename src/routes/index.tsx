import { createHashRouter, RouteObject } from "react-router-dom";
import ErrorPage from "@/error-page";
import routerJSON from "./router.json";
import { Routes } from "@/types";
import Login from "@/views/Login/index";
import React from "react";
import Lazy from "@/components/Lazy";
import Layout from "@/layout";
import { Config } from "@/config";

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
let children = await getRoutes(routerJSON);

// router afterEach 相当于路由请求钩子
const loader = async () => {
	return { code: 200, data: true };
};
export const router = createHashRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		errorElement: <ErrorPage />,
		children: children,
		loader: loader
	},
	{
		path: "/login",
		element: <Login></Login>,
		errorElement: <ErrorPage />
	}
]);

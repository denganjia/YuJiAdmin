import { createHashRouter, redirect, RouteObject, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/index";
import { Routes } from "@/types";
import Login from "@/views/Login/index";
import React, { useEffect, useMemo, useState } from "react";
import Lazy from "@/components/Lazy";
import Layout from "@/layout";
import { Config } from "@/config";
import { useBoundStore } from "@/store";
import Loading from "@/components/Loading";
import NotFound from "./components/404";

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

const Router = () => {
	const routesJson = useBoundStore(state => state.jsonRoutes);
	let [children, setChildren] = useState<any[]>([]);
	useEffect(() => {
		getRoutes(routesJson).then(res => {
			setChildren(res);
		});
	}, [routesJson]);
	const router = useMemo(() => {
		return createHashRouter([
			{
				path: "/",
				element: <Layout></Layout>,
				errorElement: <ErrorPage />,
				children: [{ errorElement: <ErrorPage />, children: children }],
				loader() {
					let token = localStorage.getItem("token");
					if (!token || !routesJson.length) {
						redirect("/login");
					} else {
						redirect(Config.HOME_URL);
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
	}, [children, routesJson]);
	return <RouterProvider router={router} fallbackElement={<Loading></Loading>}></RouterProvider>;
};
export default Router;

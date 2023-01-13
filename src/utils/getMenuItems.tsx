import { Routes } from "@/types";
import { Icon } from "@/components/Icon";
import React from "react";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"];
export const getMenuItems = (router: Routes, parent: string = "", arr: MenuItem = []) => {
	router.forEach(route => {
		if (!route.isHide) {
			let item: MenuItem[number] = {
				label: route.label,
				key: parent + (route.path ?? ""),
				icon: <Icon type={route.icon}></Icon>
			};
			if (route.children?.length) {
				// @ts-expect-error
				item.children = getMenuItems(route.children, route.path);
			}
			if (!route.index) {
				arr.push(item);
			}
		}
	});
	return arr;
};

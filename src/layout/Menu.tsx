import { Menu } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { getMenuItems } from "@/utils/getMenuItems";
import { useBoundStore, useShallowBoundStore } from "@/store";

export const Nav: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const matches = useMatches();
	const [activeKey, setActiveKey] = useState<string[]>([]);
	const siderBarStyle = useShallowBoundStore(state => state.siderBarStyle);

	const routes = useBoundStore(state => state.routes);
	// 根据JSON获取左侧可见路由
	const items = getMenuItems(routes);
	const menuSelect = ({ key }: any) => {
		navigate(key);
		setActiveKey([key]);
	};
	// 根据路由变化，设置activeKey
	useEffect(() => {
		let currentMatch = matches[matches.length - 1];
		if ((currentMatch.data as any).activeKey) {
			setActiveKey([(currentMatch.data as any).activeKey]);
		} else {
			setActiveKey([location.pathname]);
		}
	}, [location]);
	return (
		<nav className="nav-content">
			<Menu
				style={{ border: "none", height: "100%" }}
				selectedKeys={activeKey}
				theme={siderBarStyle}
				items={items}
				mode={"inline"}
				onSelect={menuSelect}
			></Menu>
		</nav>
	);
};

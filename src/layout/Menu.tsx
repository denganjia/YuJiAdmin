import { Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { Icon } from "@/Components/Icon";
import { useNavigate, useLocation } from "react-router-dom";
import router from "@/routes/router.json";

export const Nav: FC = () => {
	const items = router.map(route => {
		return {
			label: route.label,
			key: route.path,
			icon: <Icon type={route.icon}></Icon>
		};
	});
	const navigate = useNavigate();
	const location = useLocation();
	const menuSelect = ({ key }: any) => {
		navigate(key);
		setActiveKey([key]);
	};
	const [activeKey, setActiveKey] = useState<string[]>([]);
	useEffect(() => {
		setActiveKey([location.pathname]);
	}, [location]);
	return (
		<Menu
			style={{ height: "100%", border: "none" }}
			selectedKeys={activeKey}
			theme="light"
			items={items}
			onSelect={menuSelect}
		></Menu>
	);
};

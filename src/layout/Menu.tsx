import { Menu } from "antd";
import { FC } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import { useNavigate, useNavigation, useLocation } from "react-router-dom";

export const Nav: FC = () => {
	const items = [
		{
			label: "总控台",
			key: "dashboard",
			icon: <DashboardOutlined />
		}
	];
	const navigate = useNavigate();
	const menuSelect = ({ key }: any) => {
		navigate(key);
	};
	return <Menu style={{ height: "100%", border: "none" }} theme="light" items={items} onSelect={menuSelect}></Menu>;
};

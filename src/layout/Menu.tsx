import { Menu } from "antd";
import { FC } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import { useNavigate, useNavigation, useLocation } from "react-router-dom";

export const Nav: FC = () => {
	const items = [
		{
			label: "总控台",
			key: "dashboard",
			icon: <DashboardOutlined />,
		},
	];
	const navigate = useNavigate();
	const menuSelect = ({ key }: any) => {
		console.log(key);
		navigate(key);
	};
	return <Menu theme="dark" items={items} onSelect={menuSelect}></Menu>;
};

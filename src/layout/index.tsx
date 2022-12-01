import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { FC, useState } from "react";
import "./index.less";
import logo from "@/assets/images/logo.png";
import { Nav } from "./Menu";
import RightContent from "./Right-Content";

const { Header, Sider, Content } = Layout;
export const Index: FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Layout>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={collapsed => {
					setCollapsed(collapsed);
				}}>
				<div className="sider-header">
					<img src={logo} alt="" className="logo" />
					{!collapsed && <span className="title">YuJi Admin</span>}
				</div>
				<Nav></Nav>
			</Sider>
			<Layout>
				<Header style={{ padding: 0 }}>
					<div className="header">
						<div className="header-left"></div>
						<RightContent></RightContent>
					</div>
				</Header>
				<Content>
					<Outlet></Outlet>
				</Content>
			</Layout>
		</Layout>
	);
};

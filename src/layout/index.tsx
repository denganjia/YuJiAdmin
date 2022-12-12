import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import "./index.less";
import logo from "@/assets/images/logo.png";
import { Nav } from "./Menu";
import RightContent from "./Right-Content";
import { Config } from "@/config";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
export const Index: FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer }
	} = theme.useToken();
	const navigate = useNavigate();
	useEffect(() => {
		navigate(Config.HOME_URL);
	}, []);
	return (
		<Layout>
			<Header style={{ padding: "0 20px", background: colorBgContainer }}>
				<div className="header">
					<div className="header-left">
						<div className="sider-header">
							<img src={logo} alt="" className="logo" />
							<span className="title">YuJi Admin</span>
						</div>
					</div>
					<RightContent></RightContent>
				</div>
			</Header>
			<Layout>
				<Sider
					theme="light"
					collapsible
					collapsed={collapsed}
					onCollapse={collapsed => {
						setCollapsed(collapsed);
					}}
				>
					<Nav></Nav>
				</Sider>
				<Content>
					<div className="content">
						<Outlet></Outlet>
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

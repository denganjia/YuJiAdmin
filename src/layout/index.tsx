import { Layout, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";
import "./index.less";
import logo from "@/assets/images/logo.png";
import { Nav } from "./Menu";
import RightContent from "./Right-Content";
import LeftContent from "./LeftContent";
import { Config } from "@/config";
import { useShallowBoundStore } from "@/store";

const { Header, Sider, Content, Footer } = Layout;
const Index: FC = () => {
	const [collapsed, collapse] = useShallowBoundStore(state => [state.collapsed, state.collapse]);
	const siderBarStyle = useShallowBoundStore(state => state.siderBarStyle);
	const { token } = theme.useToken();
	const navigate = useNavigate();
	useEffect(() => {
		navigate(Config.HOME_URL);
	}, []);
	return (
		<Layout>
			<Sider
				theme={siderBarStyle}
				collapsible
				collapsed={collapsed}
				onCollapse={collapsed => {
					collapse(collapsed);
				}}
			>
				<div className="sider-header">
					<img src={logo} alt="" className="logo" style={{ display: collapsed ? "block" : "none" }} />
					<span
						className={"title"}
						style={{ color: siderBarStyle === "light" ? token.colorText : "#ffffff", display: collapsed ? "none" : "block" }}
					>
						YuJi Admin
					</span>
				</div>
				<Nav></Nav>
			</Sider>

			<Layout>
				<Header style={{ padding: "0 20px 0 0", background: token.colorBgContainer }}>
					<div className="header">
						<LeftContent></LeftContent>
						<RightContent></RightContent>
					</div>
				</Header>
				<Content>
					<div className="content" style={{ color: token.colorText }}>
						<Outlet></Outlet>
					</div>
				</Content>
				<Footer style={{ textAlign: "center", color: token.colorTextDescription, padding: "10px 0" }}>
					<span>YuJi Admin Created by Chiyu</span>
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Index;

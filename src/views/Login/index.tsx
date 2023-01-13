import "./index.less";
import bg from "@/assets/images/bg.svg";
import { Button, Checkbox, Form, FormProps, Input, message, Space, theme, Typography } from "antd";
import { LockOutlined, TranslationOutlined, UserOutlined } from "@ant-design/icons";
import { IconFont } from "@/components/Icon";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "@/api/modules";
import { useShallowBoundStore } from "@/store";

export default function Login() {
	const navigate = useNavigate();
	const { token } = theme.useToken();
	const [themeType, changeTheme] = useShallowBoundStore(state => [state.theme, state.changeTheme]);

	const [style, setStyle] = useState<any>();
	// 根据不同的主题 设置不同的登录框样式
	useEffect(() => {
		if (themeType === "dark") {
			setStyle({
				background: "rgba(89, 89, 89, 0.25)"
			});
		} else {
			setStyle({
				background: "rgba(255, 255, 255, 0.25)",
				boxShadow: "rgba(142, 142, 142, 0.19) 0 6px 15px 0"
			});
		}
	}, [themeType]);

	// 表单提交
	const onFinished: FormProps["onFinish"] = val => {
		login(val);
		if (val && val.account === "admin" && val.password === "123456") {
			navigate("/dashboard");
		} else {
			message.error("账号密码不正确！");
		}
	};
	return (
		<div className="main-box" style={{ background: token.colorBgContainer }}>
			<header className="header">
				<Space>
					<Button
						type="text"
						icon={<IconFont style={{ fontSize: 16 }} type={themeType === "dark" ? "icon-moon-light" : "icon-sun"} />}
						onClick={() => {
							changeTheme(themeType === "dark" ? "light" : "dark");
						}}
					></Button>
					<Button type="text" icon={<TranslationOutlined style={{ fontSize: 16 }}></TranslationOutlined>}></Button>
				</Space>
			</header>
			<div className="login-box" style={style}>
				<div className="title">
					<Typography.Title level={2} style={{ color: token.colorText }}>
						YuJi-Admin
					</Typography.Title>
				</div>
				<Form
					className="form"
					autoComplete={"off"}
					onFinish={onFinished}
					initialValues={{ account: "admin", password: "123456" }}
				>
					<Form.Item rules={[{ required: true, message: "请输入账号" }]} name={"account"}>
						<Input prefix={<UserOutlined />} size={"large"} placeholder={"请输入账号:admin"}></Input>
					</Form.Item>
					<Form.Item rules={[{ required: true, message: "请输入密码" }]} name={"password"}>
						<Input.Password prefix={<LockOutlined />} size={"large"} placeholder={"请输入密码:123456"}></Input.Password>
					</Form.Item>
					<Form.Item>
						<div className={"space"}>
							<Checkbox>自动登录</Checkbox>
							<Typography.Link>忘记密码？</Typography.Link>
						</div>
					</Form.Item>
					<Form.Item>
						<Button block htmlType={"submit"} type={"primary"} size={"large"}>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
			<footer className="footer">
				<img src={bg} alt="" />
			</footer>
		</div>
	);
}

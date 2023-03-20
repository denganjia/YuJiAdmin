import "./index.less";
import { Button, Checkbox, Dropdown, Form, FormProps, Input, message, Space, theme, Typography } from "antd";
import { LockOutlined, TranslationOutlined, UserOutlined } from "@ant-design/icons";
import { IconFont } from "@/components/Icon";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoutesApi, login } from "@/api/modules";
import { useBoundStore, useShallowBoundStore } from "@/store";
import { useTranslation } from "react-i18next";
import LoginBg from "@/components/LoginBg/index";
import { Config } from "@/config";

export default function Login() {
	// 设置语言
	const [locale, locales, changeLocale] = useShallowBoundStore(state => [state.locale, state.locales, state.changeLocale]);
	// 国际化
	const { t } = useTranslation();
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

	// 注入路由
	const initRoutes = useBoundStore(state => state.initJsonRoutes);
	// 登录按钮loading
	const [loading, setLoading] = useState(false);
	// 表单提交
	const onFinished: FormProps["onFinish"] = async val => {
		setLoading(true);
		const { code, data } = await login(val);
		if (code === 200) {
			localStorage.setItem("token", data.token);
			const { data: routes } = await getRoutesApi();
			await initRoutes(routes);
			message.success(t("login.loginSuccess"));
			navigate(Config.HOME_URL);
		} else {
			message.error(t("login.errorAccountOrPwd"));
		}
		setLoading(false);
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
					<Dropdown
						menu={{
							items: locales,
							selectable: true,
							defaultSelectedKeys: [locale],
							onClick: ({ key }) => {
								changeLocale(key);
							}
						}}
					>
						<Button type="text" icon={<TranslationOutlined style={{ fontSize: 16 }}></TranslationOutlined>}></Button>
					</Dropdown>
				</Space>
			</header>
			<div className="login-box" style={style}>
				<div className="title">
					<Typography.Title level={2} style={{ color: token.colorText, marginBottom: 0 }}>
						YuJi-Admin
					</Typography.Title>
					<Typography.Text style={{ color: token.colorTextDescription }}>{t("login.subTitle")}</Typography.Text>
				</div>
				<Form
					className="form"
					autoComplete={"off"}
					onFinish={onFinished}
					initialValues={{ account: "admin", password: "123456" }}
				>
					<Form.Item rules={[{ required: true, message: t("login.form.account") ?? "" }]} name={"account"}>
						<Input prefix={<UserOutlined />} size={"large"} placeholder={(t("login.form.account") ?? "") + ": admin"}></Input>
					</Form.Item>
					<Form.Item rules={[{ required: true, message: t("login.form.password") ?? "" }]} name={"password"}>
						<Input.Password
							prefix={<LockOutlined />}
							size={"large"}
							placeholder={(t("login.form.password") ?? "") + ": 123456"}
						></Input.Password>
					</Form.Item>
					<Form.Item>
						<div className={"space"}>
							<Checkbox>{t("login.autoLogin")}</Checkbox>
							<Typography.Link>{t("login.forgotPassword")}</Typography.Link>
						</div>
					</Form.Item>
					<Form.Item>
						<Button block htmlType={"submit"} type={"primary"} size={"large"} loading={loading}>
							{t("login.login")}
						</Button>
					</Form.Item>
				</Form>
			</div>
			<footer className="footer">
				<LoginBg></LoginBg>
			</footer>
		</div>
	);
}

import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import { LogoutOutlined, SettingOutlined, TranslationOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconFont } from "@/components/Icon";
import { useShallowBoundStore } from "@/store";
import Setting from "@/layout/components/Setting";
import { useTranslation } from "react-i18next";

const RightContent: FC = () => {
	const navigate = useNavigate();
	// 国际化
	const { t } = useTranslation();
	const [theme, changeTheme] = useShallowBoundStore(state => [state.theme, state.changeTheme]);
	// 此处简化一下，在下面使用就用dark
	const [dark, setDark] = useState(theme === "dark");
	useEffect(() => {
		setDark(theme === "dark");
	}, [theme]);

	const options = [
		{
			label: t("login.logout"),
			key: "logout",
			icon: <LogoutOutlined />,
			danger: true
		}
	];
	const dropdownSelect: MenuProps["onClick"] = ({ key }) => {
		switch (key) {
			case "logout":
				navigate("/login");
				break;
		}
	};
	// 系统设置
	const [open, setOpen] = useState(false);

	// 设置语言
	const [locale, locales, changeLocale] = useShallowBoundStore(state => [state.locale, state.locales, state.changeLocale]);
	return (
		<div className="header-right">
			<Space>
				<Button
					type="text"
					icon={<IconFont style={{ fontSize: 16 }} type={dark ? "icon-sun-light" : "icon-moon"} />}
					onClick={() => {
						changeTheme(dark ? "light" : "dark");
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
				<Button
					type="text"
					icon={
						<SettingOutlined
							style={{ fontSize: 16 }}
							onClick={() => {
								setOpen(true);
							}}
						></SettingOutlined>
					}
				></Button>
				<Dropdown menu={{ items: options, onClick: dropdownSelect }} trigger={["hover"]}>
					<Avatar src="https://hooks.spicyboy.cn/assets/png/avatar-4ef6186b.png"></Avatar>
				</Dropdown>
			</Space>
			<Setting
				open={open}
				onClose={() => {
					setOpen(false);
				}}
			></Setting>
		</div>
	);
};

export default RightContent;

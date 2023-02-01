import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import { BellOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconFont } from "@/components/Icon";
import { useShallowBoundStore } from "@/store";
import Setting from "@/layout/components/Setting";

const RightContent: FC = () => {
	const navigate = useNavigate();
	const [theme, changeTheme] = useShallowBoundStore(state => [state.theme, state.changeTheme]);
	// 此处简化一下，在下面使用就用dark
	const [dark, setDark] = useState(theme === "dark");
	useEffect(() => {
		setDark(theme === "dark");
	}, [theme]);

	const options = [
		{
			label: "退出登录",
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
				<Button type="text" icon={<BellOutlined style={{ fontSize: 16 }}></BellOutlined>}></Button>
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

import { Space, Button, Avatar, Dropdown } from "antd";
import { SettingOutlined, UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { FC } from "react";

const RightContent: FC = () => {
	const options = [
		{
			label: "退出登录",
			key: "logout",
			icon: <LogoutOutlined />,
			danger: true
		}
	];
	return (
		<div className="header-right">
			<Space>
				<Button type="text" icon={<BellOutlined style={{ fontSize: 16 }}></BellOutlined>}></Button>
				<Button type="text" icon={<SettingOutlined style={{ fontSize: 16 }}></SettingOutlined>}></Button>
				<Dropdown menu={{ items: options }} trigger={["hover"]}>
					<Avatar src="https://hooks.spicyboy.cn/assets/png/avatar-4ef6186b.png"></Avatar>
				</Dropdown>
			</Space>
		</div>
	);
};

export default RightContent;

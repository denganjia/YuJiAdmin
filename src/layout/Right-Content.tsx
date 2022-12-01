import { Space, Button, Avatar, Dropdown } from "antd";
import { SettingOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { FC } from "react";

const RightContent: FC = () => {
	const options = [
		{
			label: "退出登录",
			key: "logout",
			icon: <LogoutOutlined />,
			danger: true,
		},
	];
	return (
		<div className="header-right">
			<Space>
				<Dropdown menu={{ items: options }} trigger={["click"]} arrow>
					<Avatar icon={<UserOutlined />}></Avatar>
				</Dropdown>
				<Button shape="circle" type="primary" icon={<SettingOutlined></SettingOutlined>} size="middle"></Button>
			</Space>
		</div>
	);
};

export default RightContent;

import { Button } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const System: FC = () => {
	const navigate = useNavigate();
	return (
		<div>
			<p>菜单管理</p>
			<Button
				onClick={() => {
					navigate("/system/menu/123/detail");
				}}
			>
				详情
			</Button>
		</div>
	);
};
export default System;

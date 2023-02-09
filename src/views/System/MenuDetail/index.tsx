import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

const System: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<div>
			<p>菜单详情</p>
			<p>{location.pathname}</p>
			<Button
				onClick={() => {
					navigate(-1);
				}}
			>
				返回
			</Button>
		</div>
	);
};
export default System;

import { Button } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
const System: FC = () => {
	const navigate = useNavigate();

	// let a: any = {};
	// console.log(a.s.d);

	return (
		<div>
			<p>菜单管理</p>
			<Button
				onClick={() => {
					navigate("/system/test");
				}}
			></Button>
		</div>
	);
};
export default System;

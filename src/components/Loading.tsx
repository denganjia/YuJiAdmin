import { Spin } from "antd";
import React from "react";

const Loading = () => {
	return (
		<div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Spin size="large" />
		</div>
	);
};

export default Loading;

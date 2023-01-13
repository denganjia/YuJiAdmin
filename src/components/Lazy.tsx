import React, { Suspense } from "react";
import { Spin } from "antd";

const Lazy = ({ Component }: { Component: React.LazyExoticComponent<any> }) => {
	return (
		<Suspense
			fallback={
				<div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Spin size="large" />
				</div>
			}
		>
			<Component></Component>
		</Suspense>
	);
};

export default Lazy;

import { FC } from "react";
import { Row, Col } from "antd";

const Index: FC = () => {
	return (
		<div>
			<Row gutter={16}>
				<Col xxl={6} xs={24} sm={24} md={12} lg={12} xl={6}>
					总用户
				</Col>
				<Col xxl={6} xs={24} sm={24} md={12} lg={12} xl={6}>
					总下载量
				</Col>
				<Col xxl={6} xs={24} sm={24} md={12} lg={12} xl={6}>
					当前在线
				</Col>
				<Col xxl={6} xs={24} sm={24} md={12} lg={12} xl={6}>
					当前版本
				</Col>
			</Row>
		</div>
	);
};

export default Index;

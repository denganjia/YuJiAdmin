import { FC, useEffect, useState } from "react";
import { Card, Col, Row, theme } from "antd";
import { IconFont } from "@/components/Icon";
import "./index.less";
import { Dashboard, getStatisticsApi } from "@/api/modules/dashborad";
import { useTranslation } from "react-i18next";

const Index: FC = () => {
	const { token } = theme.useToken();
	const [statistics, setStatistics] = useState<Partial<Dashboard.Statistics>>({});
	const { t } = useTranslation();
	useEffect(() => {
		getStatisticsApi().then(({ data }) => {
			setStatistics(data);
		});
	}, []);
	const icons = [
		{
			name: "icon-user",
			background: "rgb(174, 215, 255, 0.2)",
			title: t("dashboard.totalUsers"),
			value: statistics.user
		},
		{
			name: "icon-download",
			background: "rgb(255, 143, 73, 0.2)",
			title: t("dashboard.downloads"),
			value: statistics.download
		},
		{
			name: "icon-online",
			background: "rgb(128, 184, 248, 0.2)",
			title: t("dashboard.online"),
			value: statistics.online
		},
		{
			name: "icon-version",
			background: "rgba(255, 163, 59, 0.2)",
			title: t("dashboard.version"),
			value: statistics.version
		}
	];
	return (
		<div>
			<Row gutter={[16, 16]}>
				{icons.map(icon => {
					return (
						<Col xxl={6} xs={24} sm={24} md={12} lg={12} xl={6} key={icon.name}>
							<Card size={"small"}>
								<div className="main-box">
									<div className="icon" style={{ backgroundColor: icon.background }}>
										<IconFont style={{ fontSize: 24 }} type={icon.name}></IconFont>
									</div>
									<div className={"icon-content"}>
										<span className={"value"}>{icon.value}</span>
										<span className={"title"} style={{ color: token.colorTextDescription }}>
											{icon.title}
										</span>
									</div>
								</div>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default Index;

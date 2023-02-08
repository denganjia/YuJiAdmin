import { FC, useEffect, useState } from "react";
import { Card, Col, Row, theme } from "antd";
import { IconFont } from "@/components/Icon";
import "./index.less";
import { Dashboard, getStatisticsApi, getHistogram, getPieData } from "@/api/modules/dashboard";
import { useTranslation } from "react-i18next";
import { Area, AreaConfig, Pie, PieConfig } from "@ant-design/charts";

// 面积图
const AreaCharts = () => {
	const [areaData, setAreaData] = useState<Dashboard.Histogram>([]);
	useEffect(() => {
		getHistogram().then(({ data }) => {
			setAreaData(data);
		});
	}, []);
	// 面积图配置
	const areaConfig: AreaConfig = {
		data: areaData,
		xField: "date",
		yField: "value",
		padding: "auto",
		xAxis: {
			tickCount: 10,
			title: {
				text: "日期"
			}
		},
		yAxis: {
			title: {
				text: "访问量"
			}
		},
		smooth: true,
		tooltip: {
			formatter(datum) {
				return { name: "访问量", value: datum.value };
			}
		},
		areaStyle: () => {
			return {
				fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff"
			};
		}
	};
	return <Area {...areaConfig}></Area>;
};

// 饼图
const PieCharts = () => {
	const [data, setData] = useState<Dashboard.PieData>([]);
	useEffect(() => {
		getPieData().then(res => {
			setData(res.data);
		});
	}, []);
	const pieConfig: PieConfig = {
		appendPadding: 10,
		data,
		angleField: "value",
		colorField: "name",
		radius: 0.9,
		label: {
			type: "inner",
			offset: "-30%",
			content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
			style: {
				fontSize: 14,
				textAlign: "center"
			}
		},
		interactions: [
			{
				type: "element-active"
			}
		]
	};
	return <Pie {...pieConfig}></Pie>;
};

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
				<Col xs={24} sm={24} md={14} lg={14} xl={16} xxl={18}>
					<Card title={"访问数据"}>
						<AreaCharts></AreaCharts>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={10} lg={10} xl={8} xxl={6}>
					<Card title="访问来源">
						<PieCharts></PieCharts>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Index;

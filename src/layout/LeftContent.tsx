import { Breadcrumb, Button } from "antd";
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "@/store";

const LeftContent = () => {
	const [collapsed, collapse] = useBoundStore(state => [state.collapsed, state.collapse]);
	const navigate = useNavigate();
	const breadcrumbList = useBreadcrumb();
	return (
		<div className="left-content">
			{!collapsed ? (
				<Button
					type="text"
					icon={<MenuFoldOutlined style={{ fontSize: "16px" }}></MenuFoldOutlined>}
					onClick={() => {
						collapse(true);
					}}
				></Button>
			) : (
				<Button
					type="text"
					icon={<MenuUnfoldOutlined style={{ fontSize: "16px" }}></MenuUnfoldOutlined>}
					onClick={() => {
						collapse(false);
					}}
				></Button>
			)}
			<div className="breadcrumb">
				<Breadcrumb>
					<Breadcrumb.Item
						href=""
						onClick={e => {
							e.preventDefault();
							navigate("dashboard");
						}}
					>
						<HomeOutlined />
					</Breadcrumb.Item>
					{breadcrumbList.map(item => {
						return (
							<Breadcrumb.Item
								key={item.path}
								onClick={() => {
									navigate(item.path ?? "");
								}}
							>
								<span>{item.label}</span>
							</Breadcrumb.Item>
						);
					})}
				</Breadcrumb>
			</div>
		</div>
	);
};

export default LeftContent;

import { Button, Result, theme } from "antd";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { useBoundStore } from "@/store";
import { Config } from "@/config";
import { useNavigate } from "react-router-dom";

const Index = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const themeType = useBoundStore(state => state.theme);
	const { token } = theme.useToken();
	const style: CSSProperties = {
		background: themeType === "dark" ? token.colorBgBase : "#ffffff",
		height: "100vh",
		overflow: "hidden"
	};
	return (
		<div style={style}>
			<Result
				status="404"
				subTitle={<span>{t("error.notFound")}</span>}
				extra={
					<Button
						type="primary"
						onClick={() => {
							navigate(Config.HOME_URL);
						}}
					>
						{t("error.backToHome")}
					</Button>
				}
			/>
			;
		</div>
	);
};

export default Index;

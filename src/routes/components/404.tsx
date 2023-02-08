import { Result, theme } from "antd";
import { CSSProperties, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useBoundStore } from "@/store/index";
const Index = ({ extra }: { extra: ReactNode }) => {
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
			<Result status="404" subTitle={<span>{t("error.notFound")}</span>} extra={extra} />;
		</div>
	);
};

export default Index;

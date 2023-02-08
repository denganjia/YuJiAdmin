import { Result } from "antd";
import { CSSProperties, ReactNode } from "react";
import { useTranslation } from "react-i18next";
const Index = ({ error, extra }: { error: any; extra: ReactNode }) => {
	const { t } = useTranslation();
	const style: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	};
	return (
		<div>
			<Result
				status="500"
				subTitle={
					<div style={style}>
						<span>{t("error.error")}</span>
						<span>
							<i>{error.statusText || error.message || error.msg}</i>
						</span>
					</div>
				}
				extra={extra}
			/>
		</div>
	);
};
export default Index;

import { Result } from "antd";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
const Index = ({ extra }: { extra: ReactNode }) => {
	const { t } = useTranslation();
	return <Result status="403" subTitle={t("noAccess")} extra={extra} />;
};

export default Index;

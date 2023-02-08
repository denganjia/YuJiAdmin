import { useRouteError } from "react-router-dom";
import { Button } from "antd";
import { Config } from "../../config";
import { useNavigate } from "react-router-dom";
import NotFound from "./404";
import SystemError from "./500";
import NoAccess from "./403";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
	const navigate = useNavigate();
	const error: any = useRouteError();
	const { t } = useTranslation();
	const Extra = () => {
		return (
			<Button
				type="primary"
				onClick={() => {
					navigate(Config.HOME_URL);
				}}
			>
				{t("error.backToHome")}
			</Button>
		);
	};
	const ErrorResult = () => {
		switch (error.status) {
			case 404:
				return <NotFound extra={<Extra />}></NotFound>;
			case 403:
				return <NoAccess extra={<Extra />}></NoAccess>;
			default:
				return <SystemError error={error} extra={<Extra />}></SystemError>;
		}
	};
	return (
		<div>
			<ErrorResult></ErrorResult>
		</div>
	);
}

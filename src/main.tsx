import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Route } from "react-router-dom";
import { router } from "./routes";
import { ConfigProvider } from "antd";
import "antd/es/style/reset.css";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ConfigProvider locale={zhCN}>
			<RouterProvider router={router}></RouterProvider>
		</ConfigProvider>
	</React.StrictMode>,
);

import ReactDOM from "react-dom/client";
import "antd/es/style/reset.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import App from "@/App";
import "@/locales/index";
import "@icon-park/react/styles/index.css";
dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App></App>);

import { Descriptions, Divider, Drawer, Radio, RadioChangeEvent, Switch, theme } from "antd";
import { useBoundStore, useShallowBoundStore } from "@/store";
import { debounce } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
	open: boolean;
	onClose: () => void;
};
const Setting = (props: Props) => {
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { Item } = Descriptions;
	const [themeType, changeTheme, primaryColor, changePrimaryColor, componentSize, changeComponentSize] = useShallowBoundStore(
		state => [
			state.theme,
			state.changeTheme,
			state.primaryColor,
			state.changePrimaryColor,
			state.componentSize,
			state.changeComponentSize
		]
	);
	// 侧边栏样式
	const [siderBarStyle, changeSiderBar] = useShallowBoundStore(state => [state.siderBarStyle, state.changeSiderBar]);

	// sider bar change
	const siderChange = (e: RadioChangeEvent) => {
		changeSiderBar(e.target.value);
	};

	// 紧凑布局
	const [compact, toggleCompact] = useShallowBoundStore(state => [state.compact, state.toggleCompact]);
	// color pick style
	const style: React.CSSProperties = {
		background: "rgba(0,0,0,0)",
		border: "none",
		borderRadius: token.borderRadiusSM
	};
	// 主色切换
	const onColorChange = (e: any) => {
		changePrimaryColor((e.target as HTMLInputElement).value);
	};
	// Switch 切换
	const onSwitchChange = (val: boolean) => {
		changeTheme(val ? "dark" : "light");
	};
	// 组件大小切换
	const radioChange = (event: RadioChangeEvent) => {
		changeComponentSize(event.target.value);
	};
	// 预设颜色
	const presetColors = useBoundStore(state => state.presetColors);
	return (
		<Drawer open={props.open} width={500} title={t("setting.title")} onClose={props.onClose} placement={"right"}>
			<Divider>{t("setting.style.title")}</Divider>
			<Descriptions column={1} bordered>
				<Item label={t("setting.style.color")}>
					<input type="color" style={style} defaultValue={primaryColor} onChange={debounce(onColorChange, 250)} list={"colors"} />
					<datalist id="colors">
						{presetColors.map(color => (
							<option value={color} key={color}></option>
						))}
					</datalist>
				</Item>
				<Item label={t("setting.style.darkMode")}>
					<Switch checked={themeType === "dark"} onChange={onSwitchChange}></Switch>
				</Item>
				<Item label={t("setting.style.componentSize")}>
					<Radio.Group defaultValue={componentSize} onChange={radioChange}>
						<Radio.Button value={"small"}>{t("other.small")}</Radio.Button>
						<Radio.Button value={"default"}>{t("other.default")}</Radio.Button>
						<Radio.Button value={"large"}>{t("other.large")}</Radio.Button>
					</Radio.Group>
				</Item>
				<Item label={t("setting.style.sideBarStyle")}>
					<Radio.Group defaultValue={siderBarStyle} onChange={siderChange}>
						<Radio.Button value={"light"}>{t("other.light")}</Radio.Button>
						<Radio.Button value={"dark"}>{t("other.dark")}</Radio.Button>
					</Radio.Group>
				</Item>
			</Descriptions>
			<Divider>{t("setting.layout.title")}</Divider>
			<Descriptions bordered column={1}>
				<Item label={t("setting.layout.compact")}>
					<Switch checked={compact} onChange={toggleCompact}></Switch>
				</Item>
			</Descriptions>
		</Drawer>
	);
};

export default Setting;

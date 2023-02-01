import { Descriptions, Drawer, Switch, theme } from "antd";
import { useShallowBoundStore } from "@/store";
import { debounce } from "lodash";
import React from "react";

type Props = {
	open: boolean;
	onClose: () => void;
};
const Setting = (props: Props) => {
	const { token } = theme.useToken();
	const { Item } = Descriptions;
	const [themeType, changeTheme, primaryColor, changePrimaryColor] = useShallowBoundStore(state => [
		state.theme,
		state.changeTheme,
		state.primaryColor,
		state.changePrimaryColor
	]);

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
		if (val) {
			changeTheme("dark");
		} else {
			changeTheme("light");
		}
	};
	return (
		<Drawer open={props.open} width={500} title={"系统设置"} onClose={props.onClose} placement={"right"}>
			<Descriptions column={1} bordered>
				<Item label={"主色"}>
					<input type="color" style={style} defaultValue={primaryColor} onChange={debounce(onColorChange, 250)} list={"colors"} />
					<datalist id="colors">
						<option value="#faad14" />
						<option value="#fadb14" />
						<option value="#a0d911" />
						<option value="#52c41a" />
						<option value="#13c2c2" />
						<option value="#1677ff" />
						<option value="#2f54eb" />
						<option value="#722ed1" />
						<option value="#eb2f96" />
					</datalist>
				</Item>
				<Item label={"暗色模式"}>
					<Switch checked={themeType === "dark"} onChange={onSwitchChange}></Switch>
				</Item>
			</Descriptions>
		</Drawer>
	);
};

export default Setting;

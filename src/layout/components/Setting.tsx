import type { RadioChangeEvent } from "antd";
import { Descriptions, Drawer, Radio, Switch, theme } from "antd";
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
	// 组件大小切换
	const radioChange = (event: RadioChangeEvent) => {
		changeComponentSize(event.target.value);
	};
	// 预设颜色
	const colors = ["#faad14", "#fadb14", "#a0d911", "#52c41a", "#13c2c2", "#1677ff", "#2f54eb", "#722ed1", "#eb2f96", "#18a058"];
	return (
		<Drawer open={props.open} width={500} title={"系统设置"} onClose={props.onClose} placement={"right"}>
			<Descriptions column={1} bordered>
				<Item label={"主题色"}>
					<input type="color" style={style} defaultValue={primaryColor} onChange={debounce(onColorChange, 250)} list={"colors"} />
					<datalist id="colors">
						{colors.map(color => (
							<option value={color} key={color}></option>
						))}
					</datalist>
				</Item>
				<Item label={"暗色模式"}>
					<Switch checked={themeType === "dark"} onChange={onSwitchChange}></Switch>
				</Item>
				<Item label={"组件大小"}>
					<Radio.Group defaultValue={componentSize} onChange={radioChange}>
						<Radio.Button value={"small"}>小</Radio.Button>
						<Radio.Button value={"default"}>默认</Radio.Button>
						<Radio.Button value={"large"}>大</Radio.Button>
					</Radio.Group>
				</Item>
			</Descriptions>
		</Drawer>
	);
};

export default Setting;

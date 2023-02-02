import { Descriptions, Divider, Drawer, Radio, RadioChangeEvent, Switch, theme } from "antd";
import { useBoundStore, useShallowBoundStore } from "@/store";
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
		<Drawer open={props.open} width={500} title={"系统设置"} onClose={props.onClose} placement={"right"}>
			<Divider>样式设置</Divider>
			<Descriptions column={1} bordered>
				<Item label={"主题色"}>
					<input type="color" style={style} defaultValue={primaryColor} onChange={debounce(onColorChange, 250)} list={"colors"} />
					<datalist id="colors">
						{presetColors.map(color => (
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
				<Item label={"侧边栏样式"}>
					<Radio.Group defaultValue={siderBarStyle} onChange={siderChange}>
						<Radio.Button value={"light"}>亮色</Radio.Button>
						<Radio.Button value={"dark"}>暗色</Radio.Button>
					</Radio.Group>
				</Item>
			</Descriptions>
			<Divider>布局设置</Divider>
			<Descriptions bordered column={1}>
				<Item label={"紧凑布局"}>
					<Switch checked={compact} onChange={toggleCompact}></Switch>
				</Item>
			</Descriptions>
		</Drawer>
	);
};

export default Setting;

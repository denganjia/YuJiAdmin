import React, { FC } from "react";
import * as AntIcon from "@ant-design/icons";

type Props = {
	type?: string;
};
export const Icon: FC<Props> = props => {
	if (props.type) {
		//@ts-expect-error
		let MyIcon = AntIcon[props.type];
		return <MyIcon></MyIcon>;
	} else {
		return <></>;
	}
};

export const IconFont = AntIcon.createFromIconfontCN({
	scriptUrl: ["//at.alicdn.com/t/c/font_2336614_fr949zaey9u.js"]
});

import React, { FC } from "react";
import * as AntIcon from "@ant-design/icons";

type Props = {
	type: string;
};
export const Icon: FC<Props> = props => {
	if (props.type) {
		//@ts-ignore
		let MyIcon = AntIcon[props.type];
		return <MyIcon></MyIcon>;
	} else {
		return <></>;
	}
};
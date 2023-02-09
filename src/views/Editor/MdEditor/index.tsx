import React, { useState } from "react";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useBoundStore } from "@/store";

const Index = () => {
	const [text, setText] = useState("hello md-editor-rt！");
	const theme = useBoundStore(state => state.theme);
	return <MdEditor modelValue={text} onChange={setText} theme={theme} />;
};
export default Index;

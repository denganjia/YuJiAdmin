import React, { useState } from "react";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useBoundStore } from "@/store";
import md from "./index.md?raw";
const Index = () => {
	const [text, setText] = useState(md);
	const theme = useBoundStore(state => state.theme);
	return <MdEditor previewOnly modelValue={text} onChange={setText} theme={theme} />;
};
export default Index;

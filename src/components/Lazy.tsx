import React, { Suspense } from "react";
import Loading from "./Loading";

const Lazy = ({ Component }: { Component: React.LazyExoticComponent<any> }) => {
	return (
		<Suspense fallback={<Loading></Loading>}>
			<Component></Component>
		</Suspense>
	);
};

export default Lazy;

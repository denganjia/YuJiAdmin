import { useMap } from "ahooks";
import { ReactElement, useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";

function KeepAlive() {
	const [map, { set }] = useMap<string, ReactElement | null>();
	const outLet = useOutlet();
	const { pathname } = useLocation();
	useEffect(() => {
		if (!map.has(pathname)) {
			set(pathname, outLet);
		}
	}, [pathname]);

	return (
		<>
			{Array.from(map).map(([key, component]) => (
				<div key={key} style={{ contentVisibility: pathname === key ? "auto" : "hidden" }}>
					{component}
				</div>
			))}
		</>
	);
}

export default KeepAlive;

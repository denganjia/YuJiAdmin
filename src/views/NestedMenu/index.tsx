import { useLocation } from "react-router-dom";

const Index = () => {
	const location = useLocation();
	return <>多级路由:{location.pathname}</>;
};

export default Index;

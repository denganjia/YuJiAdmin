import { useLocation } from "react-router-dom";

const Index = () => {
	const location = useLocation();
	return <span>多级路由:{location.pathname}</span>;
};

export default Index;

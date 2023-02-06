import "./index.css";
import { useBoundStore } from "@/store";
import { generate } from "@ant-design/colors";

const Index = () => {
	const primaryColor = useBoundStore(state => state.primaryColor);
	let colors = generate(primaryColor);
	return (
		<svg
			width="100%"
			height="100%"
			id="svg"
			viewBox="0 0 1440 400"
			xmlns="http://www.w3.org/2000/svg"
			className="transition duration-300 ease-in-out delay-150"
		>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
					<stop offset="5%" stopColor={`${colors[6]}88`}></stop>
					<stop offset="95%" stopColor={`${colors[5]}88`}></stop>
				</linearGradient>
			</defs>
			<path
				d="M 0,400 C 0,400 0,133 0,133 C 168.66666666666663,117.53333333333333 337.33333333333326,102.06666666666668 484,93 C 630.6666666666667,83.93333333333332 755.3333333333335,81.26666666666667 911,89 C 1066.6666666666665,96.73333333333333 1253.3333333333333,114.86666666666667 1440,133 C 1440,133 1440,400 1440,400 Z"
				stroke="none"
				strokeWidth="0"
				fill="url(#gradient)"
				className="transition-all duration-300 ease-in-out delay-150 path-0"
			></path>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
					<stop offset="5%" stopColor="#002bdcff"></stop>
					<stop offset="95%" stopColor="#32ded4ff"></stop>
				</linearGradient>
			</defs>
			<path
				d="M 0,400 C 0,400 0,266 0,266 C 153.46666666666664,247.46666666666667 306.9333333333333,228.93333333333334 489,236 C 671.0666666666667,243.06666666666666 881.7333333333333,275.73333333333335 1045,285 C 1208.2666666666667,294.26666666666665 1324.1333333333332,280.1333333333333 1440,266 C 1440,266 1440,400 1440,400 Z"
				stroke="none"
				strokeWidth="0"
				fill="url(#gradient)"
				className="transition-all duration-300 ease-in-out delay-150 path-1"
			></path>
		</svg>
	);
};

export default Index;

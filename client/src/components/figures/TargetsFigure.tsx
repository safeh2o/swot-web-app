import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ChartData } from "../../types";

export default function TargetsFigure({ chartData }: { chartData: ChartData }) {
	const parsedChartData = chartData.map((pt) => ({
		x: parseFloat(pt["Tapstand FRC"]),
		y: parseFloat(pt["Household FRC"]),
	}));

	return (
		<ResponsiveContainer height={300}>
			<LineChart
				data={parsedChartData}
				margin={{
					top: 20,
					right: 20,
					left: 0,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="x" interval={0} />
				<YAxis dataKey="y" />
				<Tooltip />
				<Line type="monotone" dataKey="y" activeDot={{ r: 8 }} />
			</LineChart>
		</ResponsiveContainer>
	);
}

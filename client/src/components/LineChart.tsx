import {
	CartesianGrid,
	Line,
	LineChart as RCLineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function LineChart({ chartData }: { chartData: any }) {
	const parsedChartData = chartData.map((pt: any) => ({
		x: parseFloat(pt.x),
		y: parseFloat(pt.y),
	}));

	return (
		<ResponsiveContainer>
			<RCLineChart
				data={parsedChartData}
				margin={{
					top: 5,
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
			</RCLineChart>
		</ResponsiveContainer>
	);
}

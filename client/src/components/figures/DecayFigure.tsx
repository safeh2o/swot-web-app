import {
	CartesianGrid,
	Label,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function DecayFigure({ chartData }: { chartData: Array<any> }) {
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
				<XAxis dataKey="x" interval={0}>
					<Label
						value="Time (hours)"
						position="insideBottom"
						offset={-5}
					/>
				</XAxis>
				<YAxis dataKey="y">
					<Label
						value="FRC"
						position="insideLeft"
						offset={10}
						angle={-90}
					/>
				</YAxis>
				<Tooltip />
				<Line type="monotone" dataKey="y" activeDot={{ r: 8 }} />
			</LineChart>
		</ResponsiveContainer>
	);
}

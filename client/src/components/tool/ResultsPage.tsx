import AlarmIcon from "@mui/icons-material/Alarm";
import PendingIcon from "@mui/icons-material/Pending";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	IconButton,
	Stack,
} from "@mui/material";
import {
	DataGrid,
	GridColumns,
	GridSelectionModel,
	GridSortModel,
} from "@mui/x-data-grid";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { addHours, formatDate } from "../../helpers/dates";
import { addNotice, setLoading } from "../../reducers/notifications";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NotificationLine from "../elements/NotificationLine";
import {
	IconCheck,
	IconRowChecked,
	IconRowUnchecked,
	IconWrong,
} from "../icons";

function renderRowStatus(dataset: any) {
	if (dataset?.completionStatus === "inProgress") {
		if (
			!dataset.lastAnalyzed ||
			new Date(dataset.lastAnalyzed) < addHours(new Date(), -6)
		) {
			return (
				<Box title="Timed Out">
					<IconButton
						className={"BtnStatus timeout"}
						size="small"
						disabled
					>
						<AlarmIcon />
					</IconButton>
				</Box>
			);
		} else {
			return (
				<Box title="In Progress">
					<IconButton
						className={"BtnStatus waiting"}
						size="small"
						disabled
					>
						<PendingIcon />
					</IconButton>
				</Box>
			);
		}
	} else if (dataset?.completionStatus === "failed") {
		return (
			<Box title="Failed">
				<IconButton
					className={"BtnStatus failed"}
					size="small"
					disabled
				>
					<IconWrong />
				</IconButton>
			</Box>
		);
	} else if (dataset?.completionStatus === "complete") {
		return (
			<Box title="Complete">
				<IconButton
					className={"BtnStatus"}
					component={Link}
					to={`/results/${dataset._id}`}
					size="small"
				>
					<IconCheck />
				</IconButton>
			</Box>
		);
	}
}

const columns: GridColumns = [
	{
		field: "dateCreated",
		headerName: "Generated",
		type: "date",
		flex: 10,
		align: "left",
		headerAlign: "left",
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "userFullName",
		headerName: "User",
		description: "Number of valid samples during the dataset date range",
		type: "string",
		flex: 8,
		renderCell: ({ value }) => {
			return <span title={value}>{value}</span>;
		},
		valueGetter: ({
			row: {
				user: { name },
			},
		}) => name?.first?.slice(0, 1) + ". " + name?.last,
	},
	{
		field: "startDate",
		headerName: "Start",
		type: "date",
		flex: 9,
		align: "left",
		headerAlign: "left",
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "endDate",
		headerName: "End",
		type: "date",
		flex: 9,
		align: "left",
		headerAlign: "left",
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "maxDuration",
		headerName: "Duration",
		type: "number",
		flex: 7,
		align: "center",
		headerAlign: "left",
		valueGetter: (params) => {
			console.log(params);
			return params.row.maxDuration;
		},
	},
	{
		field: "decayScenario",
		headerName: "Decay Scenario",
		flex: 11,
		align: "left",
		headerAlign: "left",
		valueGetter: (params) => {
			switch (params.row.confidenceLevel) {
				case "optimumDecay":
					return "Optimum Decay";
				case "maxDecay":
					return "Maximum Decay";
				case "minDecay":
					return "Minimum Decay";
			}
		},
		renderCell: ({ value }) => <span title={value}>{value}</span>,
	},
	{
		field: "Status",
		headerName: "",
		flex: 3,
		align: "center",
		headerAlign: "center",
		renderCell: ({ row }) => renderRowStatus(row),
	},
];

export default function ResultsPage() {
	const [fieldsite, setFieldsite] = useState(DEFAULT_FIELDSITE);
	const [datasets, setDatasets] = useState([]);
	const [selectedDatasets, setSelectedDatasets] = useState<any[]>([]);
	const dispatch = useDispatch();
	const [resultsSortModel, setResultsSortModel] = useState<GridSortModel>([
		{ field: "dateCreated", sort: "desc" },
	]);

	useEffect(() => {
		if (fieldsite && fieldsite.name) {
			dispatch(setLoading(true));
			axios
				.get(`/api/user/datasets?fieldsite=${fieldsite._id}`)
				.then((res) => {
					setDatasets(res.data.datasets);
				})
				.finally(() => {
					dispatch(setLoading(false));
				});
		} else {
			setDatasets([]);
		}
	}, [fieldsite, dispatch]);

	function handleSelection(selectionModel: GridSelectionModel) {
		setSelectedDatasets(selectionModel || []);
	}

	function handleReanalysis() {
		dispatch(setLoading(true));
		axios
			.post("/api/results/analyze-multiple", {
				datasetIds: selectedDatasets,
			})
			.then((res) => {
				dispatch(addNotice(res.data));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}

	return (
		<>
			<section>
				<div className="section-wrap">
					<Box className="app-card">
						<Box component={"h1"} className="section-subtitle">
							View Results
						</Box>
						<Divider sx={{ my: 3, mb: 2 }} />
						<FieldsiteDropdown
							onChange={(value: any) => {
								setFieldsite(value);
							}}
						/>
						<NotificationLine
							tip={{
								content: (
									<>
										<div>
											Please contact us if the field site
											you are working in does not appear
										</div>
										<Link
											to="/contact"
											className="btn compact"
										>
											contact form
										</Link>
									</>
								),
								context: "children",
							}}
							type="notice"
						>
							<span>Is your location missing?</span>
						</NotificationLine>
					</Box>

					<Box className="app-card">
						<Button
							className="btn reanalyze"
							disabled={!selectedDatasets.length}
							onClick={handleReanalysis}
						>
							Reanalyze Selected
						</Button>
						<Divider sx={{ mt: 1, opacity: 0 }} />
						<DataGrid
							className="tool-data-grid"
							autoHeight
							rows={datasets}
							columns={columns}
							headerHeight={45}
							rowHeight={60}
							checkboxSelection
							onSelectionModelChange={handleSelection}
							getRowId={(row) => row._id}
							onSortModelChange={(sortModel) => {
								setResultsSortModel(sortModel);
							}}
							sortModel={resultsSortModel}
							components={{
								NoRowsOverlay: () => (
									<Stack
										height="100%"
										alignItems="center"
										justifyContent="center"
										sx={{
											typography: "caption",
											color: "#929eac",
											p: 4,
											minHeight: "200px",
										}}
									>
										No Datasets. Please Select a Location
										Above
									</Stack>
								),
								BaseCheckbox: forwardRef(function BaseCheckbox(
									props,
									ref
								) {
									return (
										<Checkbox
											icon={<IconRowUnchecked />}
											checkedIcon={<IconRowChecked />}
											ref={ref}
											{...props}
										/>
									);
								}),
							}}
							disableSelectionOnClick
						/>
					</Box>
				</div>
			</section>
		</>
	);
}

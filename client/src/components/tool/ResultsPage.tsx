import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import AlarmIcon from "@mui/icons-material/Alarm";
import PendingIcon from "@mui/icons-material/Pending";
import { Box, Button, Checkbox, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";

import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { addHours, formatDate } from "../../helpers/dates";
import { addNotice, setLoading } from "../../reducers/notifications";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NotificationLine from "../elements/NotificationLine";
import { IconCheck, IconRowChecked, IconRowUnchecked, IconWrong } from "../icons";
import { Dataset, Fieldsite } from "../../types";

function renderRowStatus(dataset: Dataset) {
	if (dataset?.completionStatus === "inProgress") {
		if (!dataset.lastAnalyzed || new Date(dataset.lastAnalyzed) < addHours(new Date(), -6)) {
			return (
				<Box title="Timed Out">
					<IconButton className={"BtnStatus timeout"} size="small" disabled>
						<AlarmIcon />
					</IconButton>
				</Box>
			);
		} else {
			return (
				<Box title="In Progress">
					<IconButton className={"BtnStatus waiting"} size="small" disabled>
						<PendingIcon />
					</IconButton>
				</Box>
			);
		}
	} else if (dataset?.completionStatus === "failed") {
		return (
			<Box title="Failed">
				<IconButton className={"BtnStatus failed"} size="small" disabled>
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

const CreateHeaderCellWithTooltip = (tooltipText: string) =>
	function HeaderCellWithTooltip({
		colDef: { headerName },
	}: {
		colDef: { headerName?: string };
	}) {
		return (
			<Tooltip title={tooltipText} placement="top" arrow>
				<span>{headerName}</span>
			</Tooltip>
		);
	};

const columns: GridColDef<Dataset>[] = [
	{
		field: "dateCreated",
		headerName: "Generated",
		type: "date",
		flex: 10,
		align: "left",
		headerAlign: "left",
		valueFormatter: ({ value }: { value: string }) => formatDate(value),
		renderHeader: CreateHeaderCellWithTooltip("Date the dataset was generated"),
	},
	{
		field: "userFullName",
		headerName: "User",
		type: "string",
		flex: 8,
		renderCell: ({ row }) => {
			const { name } = row.user;
			const userFullName = name?.first?.slice(0, 1) + ". " + name?.last;
			return <span title={userFullName}>{userFullName}</span>;
		},
		renderHeader: CreateHeaderCellWithTooltip("The name of the user who ran the analysis"),
	},
	{
		field: "startDate",
		headerName: "Start",
		type: "date",
		flex: 9,
		align: "left",
		headerAlign: "left",
		valueFormatter: ({ value }: { value: string }) => formatDate(value),
		renderHeader: CreateHeaderCellWithTooltip("The date of the earliest sample of the dataset"),
	},
	{
		field: "endDate",
		headerName: "End",
		type: "date",
		flex: 9,
		align: "left",
		headerAlign: "left",
		valueFormatter: ({ value }: { value: string }) => formatDate(value),
		renderHeader: CreateHeaderCellWithTooltip("The date of the latest sample of the dataset"),
	},
	{
		field: "maxDuration",
		headerName: "Duration",
		type: "number",
		flex: 7,
		align: "center",
		headerAlign: "left",
		valueGetter: (params) => {
			return params.row.maxDuration;
		},
		renderHeader: CreateHeaderCellWithTooltip(
			"Duration of household storage and use (in hours)"
		),
	},
	{
		field: "decayScenario",
		headerName: "Decay Scenario",
		flex: 11,
		align: "left",
		headerAlign: "left",
		renderCell: ({ row }) => {
			let value = "";
			switch (row.confidenceLevel) {
				case "optimumDecay":
					value = "Optimum Decay";
					break;
				case "maxDecay":
					value = "Maximum Decay";
					break;
				case "minDecay":
					value = "Minimum Decay";
					break;
			}

			return <span>{value}</span>;
		},
		renderHeader: CreateHeaderCellWithTooltip("The model used to estimate the FRC decay"),
	},
	{
		field: "Status",
		headerName: "",
		flex: 3,
		align: "center",
		headerAlign: "center",
		renderCell: ({ row }) => renderRowStatus(row),
		renderHeader: CreateHeaderCellWithTooltip("The completion status of the analysis"),
	},
];

export default function ResultsPage() {
	const [fieldsite, setFieldsite] = useState<Fieldsite | null>(DEFAULT_FIELDSITE);
	const [datasets, setDatasets] = useState<Dataset[]>([]);
	const [selectedDatasets, setSelectedDatasets] = useState<(string | number)[]>([]);
	const dispatch = useDispatch();
	const [resultsSortModel, setResultsSortModel] = useState<GridSortModel>([
		{ field: "dateCreated", sort: "desc" },
	]);

	useEffect(() => {
		if (fieldsite?._id) {
			dispatch(setLoading(true));
			axios
				.get<{ datasets: Dataset[] }>(`/api/user/datasets?fieldsite=${fieldsite._id}`)
				.then((res) => {
					setDatasets(res.data.datasets);
				})
				.catch(() => {
					console.error("Error fetching datasets");
				})
				.finally(() => {
					dispatch(setLoading(false));
				});
		} else {
			setDatasets([]);
		}
	}, [fieldsite, dispatch]);

	function handleSelection(selectionModel: GridRowSelectionModel) {
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
			.catch(() => {
				console.error("Error reanalyzing multiple datasets");
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
							onChange={(value) => {
								setFieldsite(value);
							}}
						/>
						<NotificationLine
							tip={{
								content: (
									<>
										<div>
											Please contact us if the field site you are working in
											does not appear
										</div>
										<Link to="/contact" className="btn compact">
											contact form
										</Link>
									</>
								),
								context: "icon",
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
							columnHeaderHeight={45}
							rowHeight={60}
							checkboxSelection
							onRowSelectionModelChange={handleSelection}
							getRowId={(row: Dataset) => row._id}
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
										No Datasets. Please Select a Location Above
									</Stack>
								),
								BaseCheckbox: forwardRef(function BaseCheckbox(props, ref) {
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
							disableRowSelectionOnClick
						/>
					</Box>
				</div>
			</section>
		</>
	);
}

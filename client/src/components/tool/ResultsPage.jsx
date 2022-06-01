import { Box, Button, Checkbox, Divider, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { formatDate } from "../../helpers/dates";
import { addNotice, setLoading } from "../../reducers/notifications";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NotificationLine from "../elements/NotificationLine";
import {
	IconCheck,
	IconRowChecked,
	IconRowUnchecked,
	IconWrong,
} from "../icons";

function renderRowSamples(dataset) {
	return (
		<Box
			component="span"
			sx={{
				color: dataset.samples < 100 && "#fc9170",
			}}
		>
			{dataset.samples}
		</Box>
	);
}

function renderRowStatus(dataset) {
	if (!dataset?.status?.ann?.success || !dataset?.status?.eo?.success) {
		return (
			<Button
				className={"BtnStatus waiting"}
				endIcon={<IconWrong />}
				size="small"
				fullWidth
				disabled
			>
				Not Ready
			</Button>
		);
	} else {
		return (
			<Button
				className={"BtnStatus"}
				component={Link}
				to={`/results/${dataset._id}`}
				endIcon={<IconCheck />}
				size="small"
				fullWidth
			>
				Ready
			</Button>
		);
	}
}

const columns = [
	{
		field: "dateCreated",
		headerName: "Date Generated",
		type: "date",
		flex: 0.3,
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "startDate",
		headerName: "Start Date",
		type: "date",
		flex: 0.2,
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "endDate",
		headerName: "End Date",
		type: "date",
		flex: 0.2,
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "samples",
		headerName: "Samples",
		description: "Number of valid samples during the dataset date range",
		type: "number",
		flex: 0.1,
		renderCell: ({ row }) => renderRowSamples(row),
	},
	{
		field: "status",
		headerName: "Status",
		flex: 0.2,
		renderCell: ({ row }) => renderRowStatus(row),
	},
];

export default function ResultsPage() {
	const [fieldsite, setFieldsite] = useState(DEFAULT_FIELDSITE);
	const [datasets, setDatasets] = useState([]);
	const [selectedDatasets, setSelectedDatasets] = useState([]);
	const dispatch = useDispatch();
	const [resultsSortModel, setResultsSortModel] = useState([
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
	}, [fieldsite]);

	function handleSelection(selectionModel) {
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
							onChange={(value) => {
								setFieldsite(value);
							}}
						/>
						<NotificationLine type="notice">
							Is your location missing?{" "}
							<Link to="/contact">Get in Touch</Link>
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

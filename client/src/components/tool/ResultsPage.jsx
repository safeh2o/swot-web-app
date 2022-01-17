import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { addNotice, setLoading } from "../../reducers/notifications";
import { pushView } from "../../reducers/view";
import { userSelectors } from "../../reducers/user";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { formatDate } from "../../helpers/dates";

import { Checkbox, Button, SvgIcon } from "@mui/material";

import LocationDropdown from "../elements/LocationDropdown";
import { DataGrid } from "@mui/x-data-grid";
import NotificationLine from "../elements/NotificationLine";
import axios from "axios";
import Notice from "../elements/Notice";

import {
	Card,
	CardHeader,
	Divider,
	CardContent,
	Box,
	Stack,
} from "@mui/material";

import { IconCheck } from "../icons";

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
				endIcon={<IconCheck />}
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
		renderCell: ({ row }) => {
			if (!row?.status?.ann?.success || !row?.status?.eo?.success) {
				return row.dateCreated;
			} else {
				return (
					<Link to={`/results/${row._id}`}>{row.dateCreated}</Link>
				);
			}
		},
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

// Styles
const css = {
	grid: {
		border: "none",
		"& .MuiDataGrid-columnSeparator": {
			display: "none",
		},
		"& .MuiDataGrid-columnHeaders": {
			backgroundColor: "#fcfcfc",
		},
		"& .MuiTablePagination-select": {
			backgroundColor: "#f8f8f8",
			borderRadius: "4px",
		},
		"& .MuiDataGrid-columnHeaderTitleContainer, & .MuiDataGrid-footerContainer p":
			{
				typography: "caption",
				color: "#929eac",
				fontWeight: "500",
			},
		"& .MuiDataGrid-columnHeaderTitleContainer button, & .MuiDataGrid-columnHeaderTitleContainer .MuiInputBase-root, & .MuiDataGrid-columnHeaderTitleContainer .MuiCheckbox-root":
			{
				color: "#929eac",
			},
		"& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainer":
			{
				p: 0,
			},
		"& .MuiDataGrid-columnHeader:not(:first-of-type)": {
			borderLeft: "1px solid rgb(230, 230, 230)",
		},
		"& .BtnStatus": {
			justifyContent: "space-between",
			px: 1,
			textTransform: "none",
			textDecoration: "underline dotted 1px",
			color: "#34d379",
			backgroundColor: "rgb(248, 248, 248)",
			"&.waiting": {
				color: "#fc9170",
			},
			"&:hover": {
				color: "#fff",
				backgroundColor: "primary.main",
			},
		},
		'& [data-colindex="1"]': {
			fontWeight: 500,
			"& a": {
				color: "inherit",
				textDecoration: "underline solid transparent",
				"&:hover": {
					color: "primary.main",
					textDecorationColor: "currentColor",
				},
			},
		},
		"& .MuiCheckbox-root": {
			color: "#929eac",
			borderRadius: "3rem",
		},
	},
};

export default function ResultsPage() {
	const fieldsites = useSelector(userSelectors.fieldsites);
	const [fieldsite, setFieldsite] = useState(DEFAULT_FIELDSITE);
	const [datasets, setDatasets] = useState([]);
	const [selectedDatasets, setSelectedDatasets] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "Results", path: "/results" }));
	}, []);

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
			.post("/api/results/analyze", { datasetIds: selectedDatasets })
			.then((res) => {
				dispatch(addNotice(res.data));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}

	return (
		<>
			<Card elevation={1}>
				<CardHeader
					title={"View Results"}
					titleTypographyProps={{ variant: "h2", fontWeight: "400" }}
				/>

				<Divider />

				<CardContent
					sx={{
						p: 2,
						"&:last-child": {
							p: 2,
						},
					}}
				>
					<LocationDropdown
						value={fieldsite}
						onChange={(_event, value) => {
							setFieldsite(value);
						}}
						locations={fieldsites}
					/>
				</CardContent>
			</Card>

			<NotificationLine type="notice">
				Is your location missing? &nbsp;{" "}
				<Link to="/contact">Get in Touch</Link>
			</NotificationLine>

			<Card elevation={1}>
				<CardHeader
					title={
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-start",
							}}
						>
							<Button
								variant="contained"
								size="small"
								sx={{
									color: "#fff",
									textTransform: "none",
									backgroundColor: "#4069b1",
									"&[disabled]": {
										backgroundColor: "#fcfcfc",
										borderColor: "rgba(0, 0, 0, 0.12)",
									},
								}}
								disabled={!selectedDatasets.length}
								onClick={handleReanalysis}
							>
								Reanalyze Selected
							</Button>
						</Box>
					}
				/>

				<Divider />
				<CardContent
					sx={{
						p: 0,
					}}
				>
					{/* <DataGrid
						autoHeight
						rows={datasets}
						columns={columns}
						headerHeight={45}
						rowHeight={60}
						checkboxSelection
						onSelectionModelChange={handleSelection}
						getRowId={(row) => row._id}
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
									}}
								>
									No Datasets. Please Select a Location Above
								</Stack>
							),
							BaseCheckbox: () => (
								<Checkbox
									icon={
										<SvgIcon viewBox="0 0 32 32">
											<path
												opacity="0.6"
												fill="none"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeMiterLimit="10"
												d="M29,27V5c0-1.1-0.9-2-2-2H5 C3.9,3,3,3.9,3,5v22c0,1.1,0.9,2,2,2h22C28.1,29,29,28.1,29,27z"
											/>
										</SvgIcon>
									}
									checkedIcon={
										<SvgIcon viewBox="0 0 32 32">
											<path d="M27 3H5c-1.1 0-2 .9-2 2v22c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM13.4 22.7L6.7 16l1.8-1.8 5 5L23.6 9.1l1.8 1.8-12 11.8z"></path>
										</SvgIcon>
									}
								/>
							),
						}}
						sx={{ ...css.grid }}
						disableSelectionOnClick
					/> */}
				</CardContent>
			</Card>
		</>
	);
}

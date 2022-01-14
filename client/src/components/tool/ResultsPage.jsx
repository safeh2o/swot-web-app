import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { formatDate } from "../../helpers/dates";
import { addNotice, setLoading } from "../../reducers/notifications";
import { pushView } from "../../reducers/view";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import Notice from "../elements/Notice";

function getReadyStatus(dataset) {
	if (!dataset?.status?.ann?.success || !dataset?.status?.eo?.success) {
		return <Button disabled>Not Ready</Button>;
	} else {
		return (
			<Link to={`/results/${dataset._id}`}>
				<Button color="primary">Ready</Button>
			</Link>
		);
	}
}

const columns = [
	{
		field: "dateCreated",
		headerName: "Date Generated",
		type: "date",
		flex: 10,
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "startDate",
		headerName: "Start Date",
		type: "date",
		flex: 10,
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "endDate",
		headerName: "End Date",
		type: "date",
		flex: 10,
		valueFormatter: ({ value }) => formatDate(value),
	},
	{
		field: "status",
		headerName: "Status",
		flex: 10,
		renderCell: ({ row }) => getReadyStatus(row),
	},
];

export default function ResultsPage() {
	const [fieldsite, setFieldsite] = useState(DEFAULT_FIELDSITE);
	const [datasets, setDatasets] = useState([]);
	const [selectedDatasets, setSelectedDatasets] = useState([]);
	const [sortModel, setSortModel] = useState([
		{ field: "dateCreated", sort: "desc" },
	]);
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
			<section className="content-window">
				<header>
					<div className="content-window-title">Location</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="flex-group">
						<FieldsiteDropdown
							onChange={(newFieldsite) => {
								setFieldsite(newFieldsite);
							}}
						/>
					</div>
				</section>
				<footer>
					<Link to="/contact">
						<Notice text={["Something missing?"]} />
					</Link>
				</footer>
			</section>
			<section className="content-window bleed-edges">
				<header>
					<div className="content-window-title">Results</div>
					<div className="content-window-options">
						<Button
							color="primary"
							disabled={!selectedDatasets.length}
							onClick={handleReanalysis}
						>
							Reanalyze Selected
						</Button>
					</div>
				</header>
				<section className="DataGridContainer">
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ flexGrow: 1 }}>
							<DataGrid
								rows={datasets}
								columns={columns}
								checkboxSelection
								getRowId={(row) => row._id}
								onSelectionModelChange={handleSelection}
								sortModel={sortModel}
								onSortModelChange={(model) => {
									setSortModel(model);
								}}
								sortingOrder={["desc", "asc"]}
							/>
						</div>
					</div>
				</section>
				<footer></footer>
			</section>
		</>
	);
}

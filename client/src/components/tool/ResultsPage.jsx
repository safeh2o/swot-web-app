import { useEffect, useState } from "react";
import Notice from "../elements/Notice";
import { Link } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addNotice, setLoading } from "../../reducers/notifications";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { pushView } from "../../reducers/view";
import { formatDate } from "../../helpers/dates";
import LocationDropdown from "../elements/LocationDropdown";
import { userSelectors } from "../../reducers/user";

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

	function handleSelection(params) {
		setSelectedDatasets(params.selectionModel);
	}

	function handleReanalysis() {
		axios
			.post("/api/results/analyze", { datasetIds: selectedDatasets })
			.then((res) => {
				dispatch(addNotice({ label: "success", notice: res.data }));
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
						<LocationDropdown
							value={fieldsite}
							onChange={(_event, value) => {
								setFieldsite(value);
							}}
							locations={fieldsites}
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
								sortModel={[
									{ field: "dateCreated", sort: "desc" },
								]}
							/>
						</div>
					</div>
				</section>
				<footer></footer>
			</section>
		</>
	);
}

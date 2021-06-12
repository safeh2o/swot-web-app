import React, { useEffect, useRef, useState } from "react";
import Notice from "../elements/Notice";
import { Link } from "react-router-dom";

import { DataGrid } from "@material-ui/data-grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "../../reducers/user";
import axios from "axios";
import { addNotice, setLoading } from "../../reducers/notifications";
import { DateTime } from "luxon";
import FieldsitesDropdown from "../elements/FieldsitesDropdown";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";

const columns = [
	{ field: "name", headerName: "Dataset Name", flex: 1 },
	{
		field: "dateOfReading",
		headerName: "Date Uploaded",
		type: "date",
		flex: 2,
		valueFormatter: ({ value }) => DateTime.fromISO(value).toLocaleString(),
		// sortComparator: (v1, v2) =>
		// 	DateTime.fromISO(v1).diff(DateTime.fromISO(v2)) > 0,
	},
	{
		field: "ready",
		headerName: "Ready",
		type: "boolean",
		width: "100",
		valueGetter: (params) => (params.blobName ? true : false),
	},
];

export default function ResultsPage() {
	const [fieldsite, setFieldsite] = useState(DEFAULT_FIELDSITE);
	const [datasets, setDatasets] = useState([]);
	// list of selected dataset id's
	const [selectedDatasets, setSelectedDatasets] = useState([]);
	const dispatch = useDispatch();

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
						<FieldsitesDropdown
							value={fieldsite}
							onChange={(_event, value) => {
								setFieldsite(value);
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
								sortModel={[
									{ field: "dateOfReading", sort: "desc" },
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

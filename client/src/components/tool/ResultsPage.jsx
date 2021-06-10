import React, { useEffect, useRef, useState } from "react";
import Notice from "../elements/Notice";
import { Link } from "react-router-dom";

import { DataGrid } from "@material-ui/data-grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "../../reducers/user";
import axios from "axios";
import { addNotice } from "../../reducers/notifications";
import { DateTime } from "luxon";

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

export default function ResultsPage(props) {
	const userFieldsites = useSelector(userSelectors.fieldsites);
	const [fieldsite, setFieldsite] = useState(null);
	const [datasets, setDatasets] = useState([]);
	// list of selected dataset id's
	const [selectedDatasets, setSelectedDatasets] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!fieldsite) {
			setFieldsite(userFieldsites[0]);
		}
	}, [userFieldsites]);

	useEffect(() => {
		if (fieldsite)
			axios
				.get(`/api/user/datasets?fieldsite=${fieldsite._id}`)
				.then((res) => {
					setDatasets(res.data.datasets);
				});
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
						<Autocomplete
							id="fieldsite"
							options={userFieldsites}
							getOptionLabel={(option) => option.name}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Fieldsite"
									variant="outlined"
								/>
							)}
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
			<section
				className="content-window bleed-edges"
				style={{ height: "100%" }}
			>
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
				<DataGrid
					rows={datasets}
					columns={columns}
					checkboxSelection
					getRowId={(row) => row._id}
					autoHeight
					rowCount={18}
					onSelectionModelChange={handleSelection}
					sortModel={[{ field: "dateOfReading", sort: "desc" }]}
				/>
				<footer></footer>
			</section>
		</>
	);
}

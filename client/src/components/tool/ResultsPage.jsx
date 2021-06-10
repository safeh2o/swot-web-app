import React, { Component, useEffect, useState } from "react";
import Notice from "../elements/Notice";
import FormSelectSearch from "../elements/FormSelectSearch";
import { Link } from "react-router-dom";

// icons
import ReactCountryFlag from "react-country-flag";
import DetectEmoji from "../HelperDetectEmoji";
import { DataGrid } from "@material-ui/data-grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { userSelectors } from "../../reducers/user";
import axios from "axios";

const columns = [
	{ field: "name", headerName: "Dataset Name", width: 70 },
	{ field: "dateOfReading", headerName: "Date Uploaded", width: 70 },
	{
		field: "status",
		headerName: "Status",
		width: 70,
		valueGetter: (params) => (params.blobName ? "Ready" : "Processing"),
	},
	{
		field: "id",
		headerName: "id",
		width: 70,
		valueGetter: (params) => params._id,
	},
];

export default function ResultsPage(props) {
	const userFieldsites = useSelector(userSelectors.fieldsites);
	const [fieldsite, setFieldsite] = useState(null);
	const [datasets, setDatasets] = useState([]);

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
					// setDatasets(res.data.datasets);
					const datasets = res.data.datasets.map(
						(dataset) =>
							delete Object.assign(dataset, {
								id: dataset["_id"],
							})["_id"]
					);
					setDatasets(datasets);
				});
	}, [fieldsite]);

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
			<section className="content-window bleed-edges">
				<header>
					<div className="content-window-title">Results</div>
					<div className="content-window-options">
						<button className="txt-icon button yellow">
							<i></i>
							<span>New Analysis</span>
						</button>
					</div>
				</header>
				<DataGrid rows={datasets} columns={columns} checkboxSelection />
				<footer></footer>
			</section>
		</>
	);
}

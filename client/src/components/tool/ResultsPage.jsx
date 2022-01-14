import { useEffect, useMemo, useReducer, useState } from "react";
import Notice from "../elements/Notice";
import { Link } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addNotice, setLoading } from "../../reducers/notifications";
import {
	DEFAULT_AREA,
	DEFAULT_COUNTRY,
	DEFAULT_FIELDSITE,
} from "../../constants/defaults";
import { pushView } from "../../reducers/view";
import { formatDate } from "../../helpers/dates";
import LocationDropdown from "../elements/LocationDropdown";
import { userSelectors } from "../../reducers/user";
import useForm from "../../hooks/useForm";

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
	const countries = useSelector(userSelectors.countries);
	const allAreas = useSelector(userSelectors.areas);
	const allFieldsites = useSelector(userSelectors.fieldsites);
	const { state: locations, update: updateLocations } = useForm({
		country: DEFAULT_COUNTRY,
		area: DEFAULT_AREA,
		fieldsite: DEFAULT_FIELDSITE,
	});
	const [datasets, setDatasets] = useState([]);
	const [selectedDatasets, setSelectedDatasets] = useState([]);
	const [sortModel, setSortModel] = useState([
		{ field: "dateCreated", sort: "desc" },
	]);
	const dispatch = useDispatch();
	const areas = useMemo(() => {
		return allAreas.filter(
			(area) => locations?.country?.areas?.indexOf(area._id) >= 0
		);
	}, [locations.country]);
	const fieldsites = useMemo(() => {
		console.log(allFieldsites);
		console.log(locations.area);
		return allFieldsites.filter(
			(fieldsite) =>
				locations?.area?.fieldsites?.indexOf(fieldsite._id) >= 0
		);
	}, [locations.area]);

	useEffect(() => {
		dispatch(pushView({ title: "Results", path: "/results" }));
	}, []);

	useEffect(() => {
		if (locations.fieldsite && locations.fieldsite.name) {
			dispatch(setLoading(true));
			axios
				.get(`/api/user/datasets?fieldsite=${locations.fieldsite._id}`)
				.then((res) => {
					setDatasets(res.data.datasets);
				})
				.finally(() => {
					dispatch(setLoading(false));
				});
		} else {
			setDatasets([]);
		}
	}, [locations.fieldsite]);

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
						<LocationDropdown
							value={locations.country}
							onChange={(_event, value) => {
								updateLocations({
									country: value,
									area: DEFAULT_AREA,
									fieldsite: DEFAULT_FIELDSITE,
								});
							}}
							locations={countries}
							fieldLabel="Country"
						/>
						<LocationDropdown
							value={locations.area}
							onChange={(_event, value) => {
								updateLocations({
									area: value,
									fieldsite: DEFAULT_FIELDSITE,
								});
							}}
							locations={areas}
							fieldLabel="Area"
						/>
						<LocationDropdown
							value={locations.fieldsite}
							onChange={(_event, value) => {
								updateLocations({ fieldsite: value });
							}}
							locations={fieldsites}
							fieldLabel="Fieldsite"
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

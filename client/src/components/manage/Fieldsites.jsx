import { useEffect, useState } from "react";
import Notice from "../elements/Notice";
import { Link } from "react-router-dom";
import { IconTrash } from "../icons";
import { DataGrid } from "@mui/x-data-grid";
import { DEFAULT_AREA } from "../../constants/defaults";
import { useDispatch, useSelector } from "react-redux";
import { pushView } from "../../reducers/view";
import LocationDropdown from "../elements/LocationDropdown";
import { setLoading } from "../../reducers/notifications";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";
import * as luxon from "luxon";
import { userSelectors } from "../../reducers/user";

const columns = [
	{
		field: "name",
		headerName: "Fieldsite",
		flex: 10,
		renderCell: ({ row }) => (
			<Link to={`/fieldsites/${row._id}`}>{row.name}</Link>
		),
	},
	{
		field: "totalSamples",
		headerName: "Total Samples",
		flex: 10,
		type: "number",
		valueGetter: (_params) => 123,
	},
	{
		field: "latestAnalysis",
		headerName: "Latest Analysis",
		type: "date",
		flex: 10,
		valueGetter: (_params) => luxon.DateTime.now().toISODate(),
	},
	{
		field: "safetyLevel",
		headerName: "Safety Level",
		flex: 10,
		renderCell: ({ row }) => <CircleIcon sx={{ color: "#ff0000" }} />,
	},
];

export default function Fieldsites(_props) {
	const [area, setArea] = useState(DEFAULT_AREA);
	const [fieldsites, setFieldsites] = useState([]);
	const areas = useSelector(userSelectors.areas);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "Field Sites", path: "/fieldsites" }));
	}, []);

	useEffect(() => {
		if (area && area.name) {
			dispatch(setLoading(true));
			axios
				.get(`/api/user/fieldsites?area=${area._id}`)
				.then((res) => {
					setFieldsites(res.data.fieldsites);
				})
				.finally(() => {
					dispatch(setLoading(false));
				});
		} else {
			setFieldsites([]);
		}
	}, [area]);

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
							value={area}
							onChange={(_event, value) => {
								setArea(value);
							}}
							locations={areas}
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
					<div className="content-window-title">
						Manage Fieldsites
					</div>
					<div className="content-window-options">
						<button className="button yellow">
							<span>New Fieldsite</span>
						</button>
					</div>
				</header>
				<section className="DataGridContainer">
					<div style={{ display: "flex", height: "100%" }}>
						<div style={{ flexGrow: 1 }}>
							<DataGrid
								rows={fieldsites}
								columns={columns}
								getRowId={(row) => row._id}
							/>
						</div>
					</div>
				</section>
				<br />
				<section className="table fieldsites">
					<section className="table-header">
						<div className="table-col">
							<span className="txt-icon">Fieldsite</span>
						</div>
						<div className="table-col">Total Samples</div>
						<div className="table-col">Latest Analysis</div>
						<div className="table-col">Safety Level</div>
						<div className="table-col"></div>
					</section>
					<section className="table-body">
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Arbat IDP</Link>
							</div>
							<div className="table-col">305</div>
							<div className="table-col">Feb 27 2021</div>
							<div className="table-col">
								<span className="safe-level not-safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Bardarash</Link>
							</div>
							<div className="table-col">15</div>
							<div className="table-col">Jan 11 2021</div>
							<div className="table-col">
								<span className="safe-level check"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Essian</Link>
							</div>
							<div className="table-col">105</div>
							<div className="table-col">Nov 21 2020</div>
							<div className="table-col">
								<span className="safe-level none"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Garmawa</Link>
							</div>
							<div className="table-col">0</div>
							<div className="table-col">- - -</div>
							<div className="table-col">
								<span className="safe-level safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Mimillian</Link>
							</div>
							<div className="table-col">305</div>
							<div className="table-col">Aug 17 2020</div>
							<div className="table-col">
								<span className="safe-level not-safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Mamrashan</Link>
							</div>
							<div className="table-col">234</div>
							<div className="table-col">Aug 8 2021</div>
							<div className="table-col">
								<span className="safe-level not-safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Sheikhan</Link>
							</div>
							<div className="table-col">312</div>
							<div className="table-col">Jul 26 2020</div>
							<div className="table-col">
								<span className="safe-level not-safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Tazade</Link>
							</div>
							<div className="table-col">0</div>
							<div className="table-col">- - -</div>
							<div className="table-col">
								<span className="safe-level safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
					</section>
					<section className="table-footer"></section>
				</section>
				<footer></footer>
			</section>
		</>
	);
}

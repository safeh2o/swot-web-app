import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	getUser,
	getUserPermissions,
	userSelectors,
} from "../../reducers/user";
import { Fieldsite, Area, User } from "../../types";

const getFullName = (name: { first: string; last: string }) => {
	return `${name.first} ${name.last}`;
};

export default function AreaForm() {
	const { areaId } = useParams();
	const permissions = useSelector(userSelectors.permissions);
	const area = permissions.areas.find((c: Area) => c._id === areaId);

	const [currentFieldsites, setCurrentFieldsites] = useState<Fieldsite[]>([]);
	const [currentUsers, setCurrentUsers] = useState<User[]>([]);
	const [areaName, setAreaName] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const refreshModels = () => {
		dispatch(getUser());
		dispatch(getUserPermissions());
	};

	useEffect(() => {
		const fieldsiteIds =
			area?.fieldsites.map((fieldsite) => fieldsite._id) || [];
		const userIds = area?.users.map((user) => user._id) || [];

		const initialFieldsites = permissions.fieldsites.filter(
			(a: Fieldsite) => fieldsiteIds.includes(a._id)
		);
		const initialUsers = permissions.users.filter((a: User) =>
			userIds.includes(a._id)
		);
		setCurrentFieldsites(initialFieldsites);
		setCurrentUsers(initialUsers);
		setAreaName(area?.name || "");
	}, [
		area?.fieldsites,
		area?.name,
		area?.users,
		permissions.fieldsites,
		permissions.users,
	]);

	function handleFieldsitesChange(
		_event: SyntheticEvent,
		newValue: Fieldsite[]
	) {
		setCurrentFieldsites(newValue);
	}

	function handleUsersChange(_event: SyntheticEvent, newValue: User[]) {
		setCurrentUsers(newValue);
	}

	async function handleAreaSave() {
		const body: Record<string, string | Array<string>> = {
			areaName,
			fieldsites: currentFieldsites.map((a: Fieldsite) => a._id),
			users: currentUsers.map((a: User) => a._id),
		};
		if (areaId === "new") {
			const res = await axios.post("/api/manage/area", body);

			const newAreaId = res.data.area._id;
			if (newAreaId) {
				navigate(`../${newAreaId}`, { replace: true });
			}
		} else if (areaId) {
			body.areaId = areaId;
			await axios.put(`/api/manage/area/${areaId}`, body);
		}

		refreshModels();
	}

	async function handleAreaDelete() {
		if (areaId) {
			await axios.delete(`/api/manage/area/${areaId}`);
			navigate(`..`, { replace: true });
			refreshModels();
		}
	}

	return (
		<Grid container direction="column" pt={6} spacing={3}>
			<Grid>
				<Typography variant="h6">Name</Typography>
				<TextField
					value={areaName}
					onChange={(e) => {
						setAreaName(e.target.value);
					}}
					variant="standard"
				/>
			</Grid>

			<Grid>
				<Typography variant="h6">Fieldsites</Typography>
				<Autocomplete
					multiple
					options={permissions.fieldsites}
					getOptionLabel={(option) => option.name}
					renderInput={(params) => (
						<TextField {...params} variant="standard" />
					)}
					value={currentFieldsites}
					onChange={handleFieldsitesChange}
					isOptionEqualToValue={(option, value) =>
						option._id === value._id
					}
				/>
			</Grid>

			<Grid>
				<Typography variant="h6">Users</Typography>
				<Autocomplete
					multiple
					options={permissions.users}
					getOptionLabel={(option) => getFullName(option.name)}
					renderInput={(params) => (
						<TextField {...params} variant="standard" />
					)}
					value={currentUsers}
					onChange={handleUsersChange}
					isOptionEqualToValue={(option, value) =>
						option._id === value._id
					}
				/>
			</Grid>

			<Grid container spacing={2}>
				<Grid>
					<Button
						variant="contained"
						onClick={handleAreaSave}
						color="secondary"
					>
						Save
					</Button>
				</Grid>
				<Grid>
					<Button
						variant="contained"
						onClick={handleAreaDelete}
						color="error"
					>
						Delete
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

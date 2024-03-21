import { Autocomplete, Button, Unstable_Grid2 as Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import trpc from "../../data/trpc";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { getUser, getUserPermissions, userSelectors } from "../../reducers/user";
import { Area, Fieldsite, User } from "../../types";

const getFullName = (name: { first: string; last: string }) => {
	return `${name.first} ${name.last}`;
};

export default function AreaForm() {
	const { areaId } = useParams();
	const permissions = useSelector(userSelectors.permissions);
	const area = permissions.areas.find((c: Area) => c._id === areaId);
	const isCreating = areaId === "new";

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
		const fieldsiteIds = area?.fieldsites.map((fieldsite) => fieldsite._id) ?? [];
		const userIds = area?.users.map((user) => user._id) ?? [];

		const initialFieldsites = permissions.fieldsites.filter((a: Fieldsite) =>
			fieldsiteIds.includes(a._id)
		);
		const initialUsers = permissions.users.filter((a: User) => userIds.includes(a._id));
		setCurrentFieldsites(initialFieldsites);
		setCurrentUsers(initialUsers);
		setAreaName(area?.name ?? "");
	}, [area?.fieldsites, area?.name, area?.users, permissions.fieldsites, permissions.users]);

	function handleFieldsitesChange(_event: SyntheticEvent, newValue: Fieldsite[]) {
		setCurrentFieldsites(newValue);
	}

	function handleUsersChange(_event: SyntheticEvent, newValue: User[]) {
		setCurrentUsers(newValue);
	}

	async function handleAreaSave() {
		dispatch(setLoading(true));
		if (isCreating) {
			const res = await trpc.manage.createArea
				.mutate({
					areaName,
					fieldsites: currentFieldsites.map((a: Fieldsite) => a._id),
					users: currentUsers.map((a: User) => a._id),
				})
				.then((res) => {
					dispatch(addNotice(`Area ${areaName} created`));
					return res;
				})
				.catch(() => {
					dispatch(addError("Area creation failed"));
					return undefined;
				});

			const newAreaId = res?.area._id;
			if (newAreaId) {
				navigate(`../${newAreaId}`, { replace: true });
			}
		} else if (areaId) {
			await trpc.manage.updateArea
				.mutate({
					areaId,
					areaName,
					fieldsites: currentFieldsites.map((a: Fieldsite) => a._id),
					users: currentUsers.map((a: User) => a._id),
				})
				.then(() => {
					dispatch(addNotice(`Area ${areaName} updated`));
				})
				.catch(() => {
					dispatch(addError("Area update failed"));
				});
		}
		dispatch(setLoading(false));

		refreshModels();
	}

	async function handleAreaDelete() {
		if (areaId) {
			dispatch(setLoading(true));
			await trpc.manage.deleteArea
				.mutate({ areaId })
				.then(() => {
					dispatch(addNotice(`Area ${areaName} deleted`));
				})
				.catch(() => {
					dispatch(addError("Area deletion failed"));
				});
			dispatch(setLoading(false));
			navigate(`..`, {
				replace: true,
			});
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
					renderInput={(params) => <TextField {...params} variant="standard" />}
					value={currentFieldsites}
					onChange={handleFieldsitesChange}
					isOptionEqualToValue={(option, value) => option._id === value._id}
				/>
			</Grid>

			<Grid>
				<Typography variant="h6">Users</Typography>
				<Autocomplete
					multiple
					options={permissions.users}
					getOptionLabel={(option) => getFullName(option.name)}
					renderInput={(params) => <TextField {...params} variant="standard" />}
					value={currentUsers}
					onChange={handleUsersChange}
					isOptionEqualToValue={(option, value) => option._id === value._id}
				/>
			</Grid>

			<Grid container spacing={2}>
				<Grid>
					<Button variant="contained" onClick={handleAreaSave} color="secondary">
						Save
					</Button>
				</Grid>
				{!isCreating && (
					<Grid>
						<Button variant="contained" onClick={handleAreaDelete} color="error">
							Delete
						</Button>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}

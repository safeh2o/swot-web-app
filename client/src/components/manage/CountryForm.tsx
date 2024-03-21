import { Autocomplete, Button, Unstable_Grid2 as Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import trpc from "../../data/trpc";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { getUser, getUserPermissions, userSelectors } from "../../reducers/user";
import { Area, Country } from "../../types";

export default function CountryForm() {
	const { countryId } = useParams();
	const permissions = useSelector(userSelectors.permissions);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isCreating = countryId === "new";

	const refreshModels = () => {
		dispatch(getUser());
		dispatch(getUserPermissions());
	};

	const country = permissions.countries.find((c: Country) => c._id === countryId);

	const [currentAreas, setCurrentAreas] = useState<Area[]>([]);
	const [countryName, setCountryName] = useState("");

	useEffect(() => {
		const initialAreas = permissions.areas.filter((a: Area) =>
			country?.areas.map((a) => a._id).includes(a._id)
		);
		setCurrentAreas(initialAreas);
		setCountryName(country?.name ?? "");
	}, [country?.areas, country?.name, permissions.areas]);

	function handleAreasChange(_event: SyntheticEvent, newValue: Area[]) {
		setCurrentAreas(newValue);
	}

	async function handleCountrySave() {
		const body: Record<string, string | string[]> = {
			countryName,
			areas: currentAreas.map((a: Area) => a._id),
		};
		dispatch(setLoading(true));
		if (isCreating) {
			const res = await trpc.manage.createCountry
				.mutate({
					countryName,
					areas: currentAreas.map((a: Area) => a._id),
				})
				.then((res) => {
					dispatch(addNotice(`Country ${countryName} created`));
					return res;
				})
				.catch(() => {
					dispatch(addError("Country creation failed"));
					return undefined;
				});

			const newCountryId = res?.country._id;
			if (newCountryId) {
				navigate(`../${newCountryId}`, { replace: true });
			}
		} else if (countryId) {
			body.countryId = countryId;

			await trpc.manage.updateCountry
				.mutate({
					countryId,
					countryName,
					areas: currentAreas.map((a: Area) => a._id),
				})
				.then(() => {
					dispatch(addNotice(`Country ${countryName} updated`));
				})
				.catch(() => {
					dispatch(addError("Country update failed"));
				});
		}
		dispatch(setLoading(false));

		refreshModels();
	}

	async function handleCountryDelete() {
		if (countryId) {
			dispatch(setLoading(true));
			await trpc.manage.deleteCountry
				.mutate({ countryId })
				.then(() => {
					dispatch(addNotice(`Country ${countryName} deleted`));
				})
				.catch(() => {
					dispatch(addError("Country deletion failed"));
				});
			dispatch(setLoading(false));
			navigate(`..`, { replace: true });
			refreshModels();
		}
	}

	return (
		<Grid container direction="column" pt={6} spacing={3}>
			<Grid>
				<Typography variant="h6">Name</Typography>
				<TextField
					value={countryName}
					onChange={(e) => {
						setCountryName(e.target.value);
					}}
					variant="standard"
				/>
			</Grid>

			<Grid>
				<Typography variant="h6">Areas</Typography>
				<Autocomplete
					multiple
					options={permissions.areas}
					getOptionLabel={(option) => option.name}
					renderInput={(params) => <TextField {...params} variant="standard" />}
					value={currentAreas}
					onChange={handleAreasChange}
					isOptionEqualToValue={(option, value) => option._id === value._id}
				/>
			</Grid>

			<Grid container spacing={2}>
				<Grid>
					<Button variant="contained" onClick={handleCountrySave} color="secondary">
						Save
					</Button>
				</Grid>
				{!isCreating && (
					<Grid>
						<Button variant="contained" onClick={handleCountryDelete} color="error">
							Delete
						</Button>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}

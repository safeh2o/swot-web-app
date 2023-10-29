import { AddCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { userSelectors } from "../../reducers/user";
import { Country } from "../../types";
import LocationDropdown from "../elements/LocationDropdown";

export default function ManageCountries() {
	const permissions = useSelector(userSelectors.permissions);
	const { countryId } = useParams();
	const [selectedCountry, setSelectedCountry] = useState<Country | null>(
		null
	);
	const navigate = useNavigate();

	// get selected country from url
	useEffect(() => {
		const initialSelectedCountry = permissions.countries.find(
			(c: Country) => c._id === countryId
		);
		setSelectedCountry(initialSelectedCountry || null);
	}, [countryId, permissions.countries]);

	const handleCountryChange = (country: Country | null) => {
		setSelectedCountry(country);
		if (!country) return;
		navigate(country._id, { replace: true });
	};

	const handleCreateCountry = () => {
		const newCountry = {
			name: "",
			_id: "new",
			areas: [],
		};
		handleCountryChange(newCountry);
	};

	return (
		<Box>
			<Grid container direction="row" alignItems="center" spacing={2}>
				<Grid xs={9}>
					<LocationDropdown
						value={selectedCountry}
						onChange={(_e, country) => handleCountryChange(country)}
						locations={permissions.countries}
						fieldLabel="Country"
					/>
				</Grid>
				<Grid xs>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<AddCircle />}
						onClick={handleCreateCountry}
					>
						Create New
					</Button>
				</Grid>
			</Grid>
			<Outlet />
		</Box>
	);
}

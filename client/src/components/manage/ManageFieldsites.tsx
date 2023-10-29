import { AddCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { userSelectors } from "../../reducers/user";
import { Fieldsite } from "../../types";
import LocationDropdown from "../elements/LocationDropdown";

export default function ManageFieldsites() {
	const permissions = useSelector(userSelectors.permissions);
	const { fieldsiteId } = useParams();
	const [selectedFieldsite, setSelectedFieldsite] =
		useState<Fieldsite | null>(null);
	const navigate = useNavigate();

	// get selected fieldsite from url
	useEffect(() => {
		const initialSelectedFieldsite = permissions.fieldsites.find(
			(c: Fieldsite) => c._id === fieldsiteId
		);
		setSelectedFieldsite(initialSelectedFieldsite || null);
	}, [fieldsiteId, permissions.fieldsites]);

	const handleFieldsiteChange = (fieldsite: Fieldsite | null) => {
		setSelectedFieldsite(fieldsite);
		if (!fieldsite) return;
		navigate(fieldsite._id, { replace: true });
	};

	const handleCreateFieldsite = () => {
		const newFieldsite = {
			name: "",
			_id: "new",
			fieldsites: [],
			users: [],
		};
		handleFieldsiteChange(newFieldsite);
	};

	return (
		<Box>
			<Grid container direction="row" alignItems="center" spacing={2}>
				<Grid xs={9}>
					<LocationDropdown
						value={selectedFieldsite}
						onChange={(_e, fieldsite) =>
							handleFieldsiteChange(fieldsite)
						}
						locations={permissions.fieldsites}
						fieldLabel="Fieldsite"
					/>
				</Grid>
				<Grid xs>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<AddCircle />}
						onClick={handleCreateFieldsite}
					>
						Create New
					</Button>
				</Grid>
			</Grid>
			<Outlet />
		</Box>
	);
}

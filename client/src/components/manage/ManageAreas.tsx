import { AddCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { userSelectors } from "../../reducers/user";
import { Area } from "../../types";
import LocationDropdown from "../elements/LocationDropdown";

export default function ManageAreas() {
	const permissions = useSelector(userSelectors.permissions);
	const { areaId } = useParams();
	const [selectedArea, setSelectedArea] = useState<Area | null>(null);
	const navigate = useNavigate();

	// get selected area from url
	useEffect(() => {
		const initialSelectedArea = permissions.areas.find(
			(c: Area) => c._id === areaId
		);
		setSelectedArea(initialSelectedArea || null);
	}, [areaId, permissions.areas]);

	const handleAreaChange = (area: Area | null) => {
		setSelectedArea(area);
		if (!area) return;
		navigate(area._id, { replace: true });
	};

	const handleCreateArea = () => {
		const newArea = {
			name: "",
			_id: "new",
			fieldsites: [],
			users: [],
		};
		handleAreaChange(newArea);
	};

	return (
		<Box>
			<Grid container direction="row" alignItems="center" spacing={2}>
				<Grid xs={9}>
					<LocationDropdown
						value={selectedArea}
						onChange={(_e, area) => handleAreaChange(area)}
						locations={permissions.areas}
						fieldLabel="Area"
					/>
				</Grid>
				<Grid xs>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<AddCircle />}
						onClick={handleCreateArea}
					>
						Create New
					</Button>
				</Grid>
			</Grid>
			<Outlet />
		</Box>
	);
}

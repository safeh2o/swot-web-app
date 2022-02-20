import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
	DEFAULT_AREA,
	DEFAULT_COUNTRY,
	DEFAULT_FIELDSITE,
} from "../../constants/defaults";
import useForm from "../../hooks/useForm";
import { userSelectors } from "../../reducers/user";
import LocationDropdown from "./LocationDropdown";
import { Box } from "@mui/material";

function FieldsiteDropdown(props) {
	const countries = useSelector(userSelectors.countries);
	const allAreas = useSelector(userSelectors.areas);
	const allFieldsites = useSelector(userSelectors.fieldsites);
	const { state: locations, update: updateLocations } = useForm({
		country: DEFAULT_COUNTRY,
		area: DEFAULT_AREA,
		fieldsite: DEFAULT_FIELDSITE,
	});

	const areas = useMemo(() => {
		return allAreas.filter(
			(area) => locations?.country?.areas?.indexOf(area._id) >= 0
		);
	}, [locations.country]);
	const fieldsites = useMemo(() => {
		return allFieldsites.filter(
			(fieldsite) =>
				locations?.area?.fieldsites?.indexOf(fieldsite._id) >= 0
		);
	}, [locations.area]);

	useEffect(() => {
		props.onChange(locations.fieldsite);
	}, [locations.fieldsite]);

	const css = {
		display: "grid",
		gridAutoFlow: {
			xs: "row",
			md: "column",
		},
		gap: "10px",
		"& > *": {
			flex: {
				xs: "1 0 50%",
			},
		},
	};

	return (
		<Box sx={{ ...css }}>
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
		</Box>
	);
}

FieldsiteDropdown.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default FieldsiteDropdown;

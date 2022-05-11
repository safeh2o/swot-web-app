import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
	DEFAULT_AREA,
	DEFAULT_COUNTRY,
	DEFAULT_FIELDSITE,
} from "../../constants/defaults";
import useForm from "../../hooks/useForm";
import useHashParams from "../../hooks/useHashParams";
import { userSelectors } from "../../reducers/user";
import { FieldsiteDropdown as css } from "../../styles/styles";
import LocationDropdown from "./LocationDropdown";

function FieldsiteDropdown(props) {
	const countries = useSelector(userSelectors.countries);
	const allAreas = useSelector(userSelectors.areas);
	const allFieldsites = useSelector(userSelectors.fieldsites);
	const { state: locations, update } = useForm({
		country: DEFAULT_COUNTRY,
		area: DEFAULT_AREA,
		fieldsite: DEFAULT_FIELDSITE,
	});
	// const [country, setCountry] = useState(DEFAULT_COUNTRY);
	// const [area, setArea] = useState(DEFAULT_AREA);
	// const [fieldsite, setFieldsite] = useState(DEFAULT_FIELDSITE);
	// const [searchParams, setSearchParams] = useSearchParams();
	// const location = useLocation();
	const [hashParams, setHashParams] = useHashParams();

	const updateLocations = (newLocations) => {
		update(newLocations);
		// if (newLocations.country) {
		// 	setCountry(newLocations.country);
		// }
		// if (newLocations.area) {
		// 	setArea(newLocations.area);
		// }
		// if (newLocations.fieldsite) {
		// 	setFieldsite(newLocations.fieldsite);
		// }
		updateHashStringFromLocations(newLocations);
	};

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

	const removeFromHash = (key) => {
		const newHashParams = hashParams;
		newHashParams.delete(key);
		setHashParams(newHashParams);
	};

	useEffect(() => {
		updateLocationsFromHashString();
	}, [hashParams]);

	const updateLocationsFromHashString = () => {
		const countryName = hashParams.get("country");
		const areaName = hashParams.get("area");
		const fieldsiteName = hashParams.get("fieldsite");
		let country = DEFAULT_COUNTRY,
			area = DEFAULT_AREA,
			fieldsite = DEFAULT_FIELDSITE;
		if (countryName) {
			const foundCountry = countries.find(
				(ctr) => ctr?.name === countryName
			);
			if (foundCountry) {
				country = foundCountry;
			} else {
				removeFromHash("country");
			}
		}
		update({ country });
		if (country && areaName) {
			const foundArea = areas.find((ar) => ar?.name === areaName);
			if (foundArea) {
				area = foundArea;
			} else {
				removeFromHash("area");
			}
		}
		update({ area });
		if (country && area && fieldsiteName) {
			const foundFieldsite = fieldsites.find(
				(fs) => fs?.name === fieldsiteName
			);
			if (foundFieldsite) {
				fieldsite = foundFieldsite;
			} else {
				removeFromHash("fieldsite");
			}
		}
		update({ fieldsite });
	};

	const updateHashStringFromLocations = (newLocations) => {
		const params = hashParams;
		const country = newLocations.country || locations.country;
		const area = newLocations.area || locations.area;
		const fieldsite = newLocations.fieldsite || locations.fieldsite;
		if (country?.name) {
			params.set("country", country.name);
		}
		if (area?.name) {
			params.set("area", area.name);
		}
		if (fieldsite?.name) {
			params.set("fieldsite", fieldsite.name);
		}
		setHashParams(params);
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

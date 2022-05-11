import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
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
	const [hashParams, setHashParams] = useHashParams();

	const updateLocations = (newLocations) => {
		update(newLocations);
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

	const removeFromHash = (...keys) => {
		const newHashParams = hashParams;
		for (const key of keys) {
			newHashParams.delete(key);
		}
		setHashParams(newHashParams);
	};

	useEffect(() => {
		updateLocationsFromHashString();
	}, [hashParams]);

	const updateLocationsFromHashString = () => {
		const countryName = hashParams.get("country");
		let country = DEFAULT_COUNTRY,
			area = DEFAULT_AREA,
			fieldsite = DEFAULT_FIELDSITE;
		if (countryName && countryName !== country.name) {
			const foundCountry = countries.find(
				(ctr) => ctr?.name === countryName
			);
			if (foundCountry) {
				country = foundCountry;
			} else {
				removeFromHash("country", "area", "fieldsite");
			}
		}
		update({ country });
		const areaName = hashParams.get("area");
		if (country && areaName) {
			const foundArea = allAreas.find((ar) => ar?.name === areaName);
			if (foundArea && country.areas.includes(foundArea._id)) {
				area = foundArea;
			} else {
				removeFromHash("area", "fieldsite");
			}
		}
		update({ area });
		const fieldsiteName = hashParams.get("fieldsite");
		if (country && area && fieldsiteName) {
			const foundFieldsite = allFieldsites.find(
				(fs) => fs?.name === fieldsiteName
			);
			if (
				foundFieldsite &&
				area.fieldsites.includes(foundFieldsite._id)
			) {
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

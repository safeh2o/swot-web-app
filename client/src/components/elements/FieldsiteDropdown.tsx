import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import useHashParams from "../../hooks/useHashParams";
import { userSelectors } from "../../reducers/user";
import { UnpopulatedArea, UnpopulatedCountry, UnpopulatedFieldsite } from "../../types";
import LocationDropdown from "./LocationDropdown";

const initialState = {
	country: null,
	area: null,
	fieldsite: null,
};

type Locations = {
	country?: UnpopulatedCountry | null;
	area?: UnpopulatedArea | null;
	fieldsite?: UnpopulatedFieldsite | null;
};

type FieldsiteSelector = {
	country: UnpopulatedCountry | null;
	area: UnpopulatedArea | null;
	fieldsite: UnpopulatedFieldsite | null;
};

export default function FieldsiteDropdown(props: {
	onChange: (fieldsite: UnpopulatedFieldsite | null) => void;
}) {
	const countries = useSelector(userSelectors.countries);
	const allAreas = useSelector(userSelectors.areas);
	const allFieldsites = useSelector(userSelectors.fieldsites);
	const { state: locations, update } = useForm<FieldsiteSelector>(initialState);
	const [hashParams, setHashParams] = useHashParams();
	const { onChange: onFieldsiteChange } = props;

	const updateLocations = (newLocations: Locations) => {
		update(newLocations);
		updateHashStringFromLocations(newLocations);
	};

	const areas = useMemo(() => {
		return allAreas.filter((area) => locations?.country?.areas?.includes(area._id));
	}, [locations.country?.areas, allAreas]);
	const fieldsites = useMemo(() => {
		return allFieldsites.filter((fieldsite) =>
			locations?.area?.fieldsites?.includes(fieldsite?._id)
		);
	}, [locations.area?.fieldsites, allFieldsites]);

	useEffect(() => {
		onFieldsiteChange(locations.fieldsite);
	}, [locations.fieldsite, onFieldsiteChange]);

	useEffect(() => {
		const removeFromHash = (...keys: string[]) => {
			const newHashParams = hashParams;
			for (const key of keys) {
				newHashParams.delete(key);
			}
			setHashParams(newHashParams.toString());
		};

		const countryName = hashParams.get("country");
		let country: UnpopulatedCountry | null = null,
			area: UnpopulatedArea | null = null,
			fieldsite: UnpopulatedFieldsite | null = null;
		if (countryName) {
			const foundCountry = countries.find((ctr) => ctr?.name === countryName);
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
			const foundFieldsite = allFieldsites.find((fs) => fs?.name === fieldsiteName);
			if (foundFieldsite && area.fieldsites.includes(foundFieldsite?._id)) {
				fieldsite = foundFieldsite;
			} else {
				removeFromHash("fieldsite");
			}
		}
		update({ fieldsite });
	}, [allAreas, allFieldsites, countries, hashParams, setHashParams, update]);

	const updateHashStringFromLocations = (newLocations: Locations) => {
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
		setHashParams(params.toString());
	};

	return (
		<Box className="tool-locations">
			<LocationDropdown
				value={locations.country}
				onChange={(_event, value) => {
					updateLocations({
						country: value,
						area: null,
						fieldsite: null,
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
						fieldsite: null,
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

import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../../reducers/notifications";
function LocationDropdown(props) {
	const isLoading = useSelector(notificationsSelectors.loading);

	const { locations } = props;

	useEffect(() => {
		if (
			props.value &&
			!props.value._id &&
			locations.length > 0 &&
			props.onChange
		) {
			props.onChange(null, locations[0]);
		}
	}, [locations]);

	return (
		<Autocomplete
			id="fieldsite"
			options={locations}
			getOptionLabel={(option) => option.name || ""}
			renderInput={(params) => (
				<TextField
					{...params}
					label=""
					variant="outlined"
					placeholder="Select a Location"
				/>
			)}
			loading={isLoading}
			value={props.value}
			onChange={props.onChange}
			disableClearable
			isOptionEqualToValue={(option, value) =>
				value.name === "" || option.name === value.name
			}
		/>
	);
}

LocationDropdown.propTypes = {
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default LocationDropdown;

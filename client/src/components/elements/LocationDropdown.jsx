import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../../reducers/notifications";

function LocationDropdown(props) {
	const isLoading = useSelector(notificationsSelectors.loading);

	const { locations, fieldLabel } = props;

	return (
		<Autocomplete
			className={(props.value.name !== "" && "chosen") || "disabled"}
			options={locations || []}
			getOptionLabel={(option) => option.name || ""}
			renderInput={(params) => (
				<TextField {...params} label={fieldLabel} />
			)}
			loading={isLoading}
			value={props.value}
			onChange={props.onChange}
			disableClearable
			isOptionEqualToValue={(option, value) =>
				value?.name === "" || option?.name === value?.name
			}
			fullWidth
			selectOnFocus={false}
		/>
	);
}

LocationDropdown.propTypes = {
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	fieldLabel: PropTypes.string,
	locations: PropTypes.array,
};

export default LocationDropdown;

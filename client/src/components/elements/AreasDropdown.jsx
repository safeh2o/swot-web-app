import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
function AreasDropdown(props) {
	const isLoading = useSelector(notificationsSelectors.loading);
	const userAreas = useSelector(userSelectors.areas);

	useEffect(() => {
		if (
			props.value &&
			!props.value._id &&
			userAreas.length > 0 &&
			props.onChange
		) {
			props.onChange(null, userAreas[0]);
		}
	}, [userAreas]);

	return (
		<Autocomplete
			id="area"
			options={userAreas}
			getOptionLabel={(option) => option.name || ""}
			renderInput={(params) => (
				<TextField {...params} label="" variant="outlined" />
			)}
			loading={isLoading}
			value={props.value}
			onChange={props.onChange}
			disableClearable
			getOptionSelected={(option, value) =>
				value.name === "" || option.name === value.name
			}
		/>
	);
}

AreasDropdown.propTypes = {
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default AreasDropdown;

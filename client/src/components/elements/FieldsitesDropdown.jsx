import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
function FieldsitesDropdown(props) {
	const isLoading = useSelector(notificationsSelectors.loading);
	const userFieldsites = useSelector(userSelectors.fieldsites);

	useEffect(() => {
		if (
			props.value &&
			!props.value._id &&
			userFieldsites.length > 0 &&
			props.onChange
		) {
			props.onChange(null, userFieldsites[0]);
		}
	}, [userFieldsites]);

	return (
		<Autocomplete
			id="fieldsite"
			options={userFieldsites}
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

FieldsitesDropdown.propTypes = {
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default FieldsitesDropdown;

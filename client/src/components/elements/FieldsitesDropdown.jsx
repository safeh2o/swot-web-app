import React from "react";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
function FieldsitesDropdown(props) {
	const isLoading = useSelector(notificationsSelectors.loading);
	const userFieldsites = useSelector(userSelectors.fieldsites);

	return (
		<Autocomplete
			id="fieldsite"
			options={userFieldsites}
			getOptionLabel={(option) => option.name}
			renderInput={(params) => (
				<TextField {...params} label="" variant="outlined" />
			)}
			loading={isLoading}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}

FieldsitesDropdown.propTypes = {
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default FieldsitesDropdown;

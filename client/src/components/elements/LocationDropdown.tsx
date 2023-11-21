import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../../reducers/notifications";

type Location = {
	name: string;
	_id: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LocationDropdown<T extends Location = any>({
	locations = [],
	fieldLabel,
	onChange,
	value = null,
}: {
	value?: T | null;
	onChange?: (event: React.SyntheticEvent, value: T | null) => void;
	locations?: T[];
	fieldLabel?: string;
}) {
	const isLoading = useSelector(notificationsSelectors.loading);

	return (
		<Autocomplete
			className={(value ? "chosen" : "empty-location") || "disabled"}
			options={locations}
			getOptionLabel={(option) => option.name || ""}
			renderInput={(params) => (
				<TextField {...params} label={fieldLabel} />
			)}
			loading={isLoading}
			value={value}
			onChange={onChange}
			isOptionEqualToValue={(option, value) => option?._id === value?._id}
			fullWidth
			selectOnFocus={false}
			disabled={!locations?.length}
			disableClearable={!!value}
		/>
	);
}

export default LocationDropdown;

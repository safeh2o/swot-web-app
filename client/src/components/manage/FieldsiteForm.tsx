import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { getUser, getUserPermissions, userSelectors } from "../../reducers/user";
import { Fieldsite } from "../../types";

export default function FieldsiteForm() {
	const { fieldsiteId } = useParams();
	const permissions = useSelector(userSelectors.permissions);
	const fieldsite = permissions.fieldsites.find((c: Fieldsite) => c._id === fieldsiteId);
	const isCreating = fieldsiteId === "new";

	const [fieldsiteName, setFieldsiteName] = useState(fieldsite?.name ?? "");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const refreshModels = () => {
		dispatch(getUser());
		dispatch(getUserPermissions());
	};

	async function handleFieldsiteSave() {
		const body: Record<string, string | string[]> = {
			fieldsiteName,
		};
		dispatch(setLoading(true));
		if (isCreating) {
			const res = await axios
				.post<{ fieldsite: Fieldsite }>("/api/manage/fieldsite", body)
				.then((res) => {
					dispatch(addNotice(`Fieldsite ${fieldsiteName} created`));
					return res;
				})
				.catch(() => {
					dispatch(addError("Fieldsite creation failed"));
					return undefined;
				});

			const newFieldsiteId = res?.data.fieldsite._id;
			if (newFieldsiteId) {
				navigate(`../${newFieldsiteId}`, { replace: true });
			}
		} else if (fieldsiteId) {
			body.fieldsiteId = fieldsiteId;
			await axios
				.put(`/api/manage/fieldsite/${fieldsiteId}`, body)
				.then(() => {
					dispatch(addNotice(`Fieldsite ${fieldsiteName} updated`));
				})
				.catch(() => {
					dispatch(addError("Fieldsite update failed"));
				});
		}
		dispatch(setLoading(false));

		refreshModels();
	}

	async function handleFieldsiteDelete() {
		if (fieldsiteId) {
			dispatch(setLoading(true));
			await axios
				.delete(`/api/manage/fieldsite/${fieldsiteId}`)
				.then(() => {
					dispatch(addNotice(`Fieldsite ${fieldsiteName} deleted`));
				})
				.catch(() => {
					dispatch(addError("Fieldsite deletion failed"));
				});
			dispatch(setLoading(false));
			navigate(`..`, { replace: true });
			refreshModels();
		}
	}

	return (
		<Grid container direction="column" pt={6} spacing={3}>
			<Grid>
				<Typography variant="h6">Name</Typography>
				<TextField
					value={fieldsiteName}
					onChange={(e) => {
						setFieldsiteName(e.target.value);
					}}
					variant="standard"
				/>
			</Grid>

			<Grid container spacing={2}>
				<Grid>
					<Button variant="contained" onClick={handleFieldsiteSave} color="secondary">
						Save
					</Button>
				</Grid>
				{!isCreating && (
					<Grid>
						<Button variant="contained" onClick={handleFieldsiteDelete} color="error">
							Delete
						</Button>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}

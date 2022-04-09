import { LoadingButton } from "@mui/lab";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	FormControlLabel,
	FormGroup,
	Grid,
	Typography,
} from "@mui/material";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MEGABYTE } from "../../helpers/bitcalc";
import useForm from "../../hooks/useForm";
import {
	addError,
	addNotice,
	notificationsSelectors,
	setLoading,
} from "../../reducers/notifications";
import { UploadData as css } from "../../styles/styles";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NotificationLine from "../elements/NotificationLine";
import { IconUpload } from "../icons";

const initialState = {
	files: [],
	overwrite: false,
};

export default function UploadPage() {
	const dispatch = useDispatch();
	const { state, update, reset } = useForm(initialState);
	const loading = useSelector(notificationsSelectors.loading);
	const fileInput = useRef(null);
	const disabled = state.files.length === 0 || !state?.fieldsite?._id;

	function getFormData() {
		const formData = new FormData();
		const {
			files,
			overwrite,
			fieldsite: { _id: fieldsiteId },
		} = state;
		formData.append("fieldsite", fieldsiteId);
		files.forEach((file) => {
			formData.append("files[]", file, file.name);
		});
		formData.append("overwrite", overwrite);

		return formData;
	}

	function getPreviewText() {
		if (!state || !state.files) {
			return "No files selected!";
		}
		return `${state.files.length} file${
			state.files.length > 1 ? "s" : ""
		} selected:`;
	}

	const handleFileChange = (files) => {
		update({ files });
	};

	const handleFormReset = () => {
		fileInput.current.setState({ fileObjects: [] });
		reset();
	};

	const handleFormSubmit = (e) => {
		dispatch(setLoading(true));
		const formData = getFormData();
		axios
			.post("/api/upload/append", formData)
			.then((res) => {
				dispatch(addNotice("Upload successful"));
			})
			.catch((err) => {
				dispatch(
					addError("Error occurred while trying to upload files")
				);
			})
			.finally(() => {
				dispatch(setLoading(false));
				handleFormReset();
			});
	};

	return (
		<>
			<Card sx={{ ...css.cardElement, ...css.uploadLocation }}>
				<CardHeader
					title={"Upload your Data"}
					titleTypographyProps={{ variant: "h2", fontWeight: "400" }}
				/>

				<Divider />

				<CardContent>
					<FieldsiteDropdown
						onChange={(value) => {
							update({ fieldsite: value });
						}}
					/>
				</CardContent>
			</Card>

			<NotificationLine type="notice">
				Is your location missing? &nbsp;{" "}
				<Link to="/contact">Get in Touch</Link>
			</NotificationLine>

			<Card sx={{ ...css.cardElement, ...css.uploadDrop }}>
				<CardHeader
					title={"Attach files*"}
					titleTypographyProps={{
						variant: "body1",
						fontWeight: "400",
					}}
				/>

				<Divider />
				<CardContent>
					<DropzoneArea
						Icon={IconUpload}
						onChange={handleFileChange}
						maxFileSize={50 * MEGABYTE}
						acceptedFiles={[
							".csv",
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
							"application/vnd.ms-excel",
						]}
						filesLimit={5}
						useChipsForPreview
						showPreviewsInDropzone={true}
						showPreviews={false}
						previewText={getPreviewText()}
						ref={fileInput}
					/>

					<NotificationLine type="check">
						Ensure all required columns have data...
					</NotificationLine>
					<NotificationLine type="check">
						Ensure that you upload a .csv or a .xlsx file
					</NotificationLine>
				</CardContent>
			</Card>

			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				Options for Upload:
			</Typography>

			<Card sx={{ ...css.cardElement, ...css.uploadOptions }}>
				<CardContent>
					<FormGroup>
						<FormControlLabel
							label="Overwrite Duplicate Entries"
							control={
								<Checkbox
									name="overwriteCheck"
									checked={state && state.overwrite}
									onChange={() => {
										update({ overwrite: !state.overwrite });
									}}
								/>
							}
						/>
					</FormGroup>

					<Divider />

					<NotificationLine type="guide">
						Duplicates are rows with the same dates and times
					</NotificationLine>
				</CardContent>
			</Card>

			<Card sx={{ ...css.cardElement, ...css.cardSubmit }}>
				<CardHeader
					title={"Confirm and Submit"}
					titleTypographyProps={{
						variant: "body1",
						fontWeight: "400",
					}}
				/>

				<Divider />

				<CardContent>
					<Box>
						<Button
							id="btnSubmit"
							color="primary"
							variant="contained"
							fullWidth
							onClick={handleFormSubmit}
							disabled={disabled}
							loading={loading}
						>
							Upload
						</Button>
						<Button
							type="reset"
							variant="text"
							onClick={() => handleFormReset()}
						>
							Reset Fields
						</Button>
					</Box>
					<NotificationLine type="notice">
						Make sure all fields are filled out
					</NotificationLine>
				</CardContent>
			</Card>
		</>
	);
}

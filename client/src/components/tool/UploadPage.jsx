import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	FormGroup,
	Tooltip,
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
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NotificationLine from "../elements/NotificationLine";
import {
	IconToolUpload,
	IconRowUnchecked,
	IconRowChecked,
	IconQuestionMark,
} from "../icons";

const initialState = {
	files: [],
	overwrite: true,
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

	const handleFormSubmit = () => {
		dispatch(setLoading(true));
		const formData = getFormData();
		axios
			.post("/api/upload/append", formData)
			.then(() => {
				dispatch(addNotice("Upload successful"));
			})
			.catch(() => {
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
			<section>
				<div className="section-wrap">
					<Box className="app-card">
						<Box component={"h1"} className="section-subtitle">
							Upload Your Data
						</Box>
						<Divider sx={{ my: 3, mb: 2 }} />
						<FieldsiteDropdown
							onChange={(value) => {
								update({ fieldsite: value });
							}}
						/>
						<NotificationLine type="notice">
							Is your location missing?{" "}
							<Link to="/contact">Get in Touch</Link>
						</NotificationLine>
					</Box>
					<Box className="app-card">
						<DropzoneArea
							Icon={IconToolUpload}
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
					</Box>
					<Box className="app-card">
						<Box component={"h2"}>Options for Upload:</Box>

						<Divider sx={{ my: 1 }} />

						<FormGroup className="tool-overwrite-duplicate-entries">
							<FormControlLabel
								label={"Overwrite Duplicate Entries"}
								control={
									<Checkbox
										name="overwriteCheck"
										checked={state && state.overwrite}
										onChange={() => {
											update({
												overwrite: !state.overwrite,
											});
										}}
										icon={<IconRowUnchecked />}
										checkedIcon={<IconRowChecked />}
									/>
								}
							/>
						</FormGroup>
						<Tooltip
							className="notification small"
							title={
								"Duplicates are rows with the same dates and times"
							}
							arrow
							placement="top"
							leaveDelay={500}
							enterDelay={300}
							leaveTouchDelay={500}
						>
							<span>
								<IconQuestionMark />
								<span>What&apos;s this?</span>
							</span>
						</Tooltip>
					</Box>
					<Box className="app-card">
						<Box className="form-submit">
							<Button
								id="btnSubmit"
								color="primary"
								variant="contained"
								fullWidth
								onClick={handleFormSubmit}
								disabled={disabled}
								loading={loading || undefined}
								className="btn"
								disableRipple={true}
							>
								Upload
							</Button>
							<button
								type="reset"
								onClick={() => handleFormReset()}
							>
								Reset Fields
							</button>
							<NotificationLine type="notice">
								Make sure all fields are filled out
							</NotificationLine>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

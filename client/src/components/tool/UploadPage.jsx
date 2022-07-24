import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	FormGroup,
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
import { IconRowChecked, IconRowUnchecked, IconToolUpload } from "../icons";

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
						<NotificationLine
							tip={{
								content: (
									<>
										<div>
											Please contact us if the field site
											you are working in does not appear
										</div>
										<Link
											to="/contact"
											className="btn compact"
										>
											contact form
										</Link>
									</>
								),
								context: "children",
							}}
							type="notice"
						>
							<span>Is your location missing?</span>
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

						<NotificationLine
							tip={{
								content: (
									<>
										Required columns are ts_datetime,
										ts_frc, hh_datetime and hh_frc
									</>
								),
								context: "icon",
							}}
							type="guide"
							orientation="reverse"
						>
							<span>
								Ensure all required columns have data...
							</span>
						</NotificationLine>

						<NotificationLine
							tip={{
								content: (
									<>
										File format should be Microsoft Excel
										Spreadsheet (.xlsx) or Comma-Separated
										Values (.csv) file
									</>
								),
								context: "icon",
							}}
							type="guide"
							orientation="reverse"
						>
							<span>
								Ensure that you upload a .csv or a .xlsx file
							</span>
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
						<NotificationLine
							tip={{
								content: (
									<>
										If checked, existing paired samples will
										be replaced with new rows that have
										identical tapstand datetimes
									</>
								),
								context: "icon",
							}}
							type="guide"
							orientation="reverse"
						>
							<span>
								Duplicates are rows with the same dates and
								times
							</span>
						</NotificationLine>
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
								<span>
									Check that all fields have been completed
									before moving to the next step
								</span>
							</NotificationLine>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

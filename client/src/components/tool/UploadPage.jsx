import {
	Box,
	Button,
	Checkbox,
	Chip,
	Divider,
	FormControlLabel,
	FormGroup,
	Input,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
	overwrite: true,
	fieldsite: null,
};

export default function UploadPage() {
	const dispatch = useDispatch();
	const { state, update, reset } = useForm(initialState);
	const loading = useSelector(notificationsSelectors.loading);
	const [draggingOver, setDraggingOver] = useState(false);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: () => {
			setDraggingOver(false);
		},
		onDragOver: () => {
			setDraggingOver(true);
		},
		onDragLeave: () => {
			setDraggingOver(false);
		},
		maxFiles: 5,
		accept: {
			"text/csv": [".csv"],
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
				[".xlsx"],
			"application/vnd.ms-excel": [".xls"],
		},
		multiple: true,
		maxSize: 50 * MEGABYTE,
		minSize: 1,
	});
	const [removedFileIndices, setRemovedFileIndices] = useState({});
	const files = acceptedFiles.filter((_, i) => !removedFileIndices[i]);
	const disabled = files.length === 0 || !state?.fieldsite?._id;

	useEffect(() => {
		setRemovedFileIndices({});
	}, [acceptedFiles]);

	function getFormData() {
		const formData = new FormData();
		const {
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

	const handleFormReset = () => {
		const removedFiles = {};
		for (let i = 0; i < acceptedFiles.length; i++) {
			removedFiles[i] = true;
		}
		setRemovedFileIndices(removedFiles);
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

	const getDeleteHandler = (i) => () => {
		setRemovedFileIndices((removedFileIndices) => ({
			...removedFileIndices,
			[i]: true,
		}));
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
						<Box
							className={`MuiDropzoneArea-root${
								draggingOver ? " MuiDropzoneArea-active" : ""
							}`}
							{...getRootProps()}
						>
							<Box component={"section"}>
								<Input {...getInputProps()} />
								<Box className="MuiDropzoneArea-textContainer MuiDropzoneArea-text">
									<Typography>
										Drag and drop a file here or click
									</Typography>
									<IconToolUpload className="MuiDropzoneArea-icon" />
								</Box>
								<Box className="MuiDropzoneArea-file-list">
									{acceptedFiles.map((file, i) =>
										removedFileIndices[i] ? undefined : (
											<Chip
												key={i}
												label={file?.name}
												variant="outlined"
												onDelete={getDeleteHandler(i)}
											/>
										)
									)}
								</Box>
							</Box>
						</Box>

						<FormGroup
							row
							sx={{ alignItems: "center", mt: 1 }}
							className="tool-overwrite-duplicate-entries"
						>
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
								sx={{ mr: 0 }}
							/>
							<NotificationLine
								tip={{
									content: (
										<>
											If checked, existing paired samples
											will be replaced with new rows that
											have identical tapstand datetimes
										</>
									),
									context: "icon",
								}}
								type="guide"
								orientation="reverse inline"
							>
								<span></span>
							</NotificationLine>
						</FormGroup>

						<Divider sx={{ mt: 3 }} />

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
							<span>Ensure all required columns have data</span>
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
								className="btn reset"
								type="reset"
								onClick={() => handleFormReset()}
							>
								Reset Fields
							</button>
							<NotificationLine type="notice">
								<span>
									Once you hit upload we will check your file
									has all the information we need and we will
									send you an email when your data is ready to
									analyze.
								</span>
							</NotificationLine>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

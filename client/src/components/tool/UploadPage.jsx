import {
	Box,
	Button,
	Checkbox,
	Chip,
	Divider,
	FormControlLabel,
	FormGroup,
} from "@mui/material";
import axios from "axios";
import _ from "lodash";
import { useRef, useState } from "react";
import { Importer, ImporterField } from "@safeh2o/react-csv-importer";
import "@safeh2o/react-csv-importer/dist/index.css";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MEGABYTE } from "../../helpers/bitcalc";
import useForm from "../../hooks/useForm";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NotificationLine from "../elements/NotificationLine";
import { IconRowChecked, IconRowUnchecked } from "../icons";

const initialState = {
	overwrite: true,
	fieldsite: null,
};

export default function UploadPage() {
	const dispatch = useDispatch();
	const { state, update, reset } = useForm(initialState);
	const [uploads, setUploads] = useState({});
	const currentFile = useRef();
	const { acceptedFiles } = useDropzone({
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
	const fieldNames = useRef([]);
	const uploadedFilenames = Object.keys(uploads);
	const [pendingUpload, setPendingUpload] = useState(false);
	const disabled =
		pendingUpload ||
		uploadedFilenames.length === 0 ||
		!state?.fieldsite?._id;

	function getFormData() {
		const formData = new FormData();
		const {
			overwrite,
			fieldsite: { _id: fieldsiteId },
		} = state;
		formData.append("fieldsite", fieldsiteId);
		uploadedFilenames.forEach((filename) => {
			const rows = uploads[filename];
			let csvContent = fieldNames.current.join(",") + "\n";
			for (const row of rows) {
				csvContent +=
					fieldNames.current
						.map((fieldName) => row[fieldName])
						.join(",") + "\n";
			}
			const blob = new Blob([csvContent]);
			formData.append("files[]", blob, filename);
		});
		formData.append("overwrite", overwrite);

		return formData;
	}

	const handleFormReset = () => {
		const removedFiles = {};
		for (let i = 0; i < acceptedFiles.length; i++) {
			removedFiles[i] = true;
		}
		setUploads({});
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

	const removeUpload = (filename) => {
		setUploads((uploads) => _.omit(uploads, filename));
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
								context: "icon",
							}}
							type="notice"
						>
							<span>Is your location missing?</span>
						</NotificationLine>
					</Box>
					<Box className="app-card">
						<Importer
							dataHandler={async (rows) => {
								setUploads((uploads) => {
									const prevRows =
										uploads[currentFile.current] || [];
									return {
										...uploads,
										[currentFile.current]: [
											...prevRows,
											...rows,
										],
									};
								});
							}}
							chunkSize={100000}
							defaultNoHeader={false}
							restartable={true}
							onStart={({ file, fields }) => {
								fieldNames.current = fields;
								currentFile.current = file.name;
								setPendingUpload(true);
							}}
							onComplete={() => {
								setPendingUpload(false);
							}}
							skipEmptyLines={true}
						>
							<ImporterField
								name="ts_datetime"
								label="Tapstand Time"
							/>
							<ImporterField name="ts_frc" label="Tapstand FRC" />
							<ImporterField
								name="ts_wattemp"
								label="Tapstand Water Temperature"
							/>
							<ImporterField
								name="ts_cond"
								label="Tapstand Conductivity"
							/>
							<ImporterField
								name="hh_datetime"
								label="Household Time"
							/>
							<ImporterField
								name="hh_frc"
								label="Household FRC"
							/>
						</Importer>

						<Box className="UploadArea-file-list">
							{uploadedFilenames.map((filename, i) => (
								<Chip
									key={i}
									label={filename}
									variant="outlined"
									onDelete={() => removeUpload(filename)}
								/>
							))}
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

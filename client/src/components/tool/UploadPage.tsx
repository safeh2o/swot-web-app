import { Box, Button, Checkbox, Chip, Divider, FormControlLabel, FormGroup } from "@mui/material";
import { Importer, ImporterField, ImporterFieldProps } from "@safeh2o/react-csv-importer";
import "@safeh2o/react-csv-importer/dist/index.css";
import axios from "axios";
import _ from "lodash";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import useForm from "../../hooks/useForm";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { Fieldsite } from "../../types";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NotificationLine from "../elements/NotificationLine";
import { IconRowChecked, IconRowUnchecked } from "../icons";

type UploadPageForm = {
	overwrite: boolean;
	fieldsite: Fieldsite | null;
};

const initialState: UploadPageForm = {
	overwrite: true,
	fieldsite: DEFAULT_FIELDSITE,
};

const importColumns: ImporterFieldProps[] = [
	{ name: "ts_datetime", label: "Tapstand Time" },
	{ name: "ts_frc", label: "Tapstand FRC" },
	{ name: "ts_wattemp", label: "Tapstand Water Temperature", optional: true },
	{ name: "ts_cond", label: "Tapstand Conductivity", optional: true },
	{ name: "hh_datetime", label: "Household Time" },
	{ name: "hh_frc", label: "Household FRC" },
];
type Row = Record<string, string>;

const getMissingFields = (fieldNames: string[]) => {
	const optionalFields = importColumns.filter((col) => col.optional).map((col) => col.name);
	const missingFields = optionalFields.filter(
		(optionalField) => !fieldNames.includes(optionalField)
	);

	return missingFields;
};

export default function UploadPage() {
	const dispatch = useDispatch();
	const { state, update, reset } = useForm(initialState);
	const [uploads, setUploads] = useState<Record<string, Row[]>>({});
	const currentFile = useRef<string>("");
	const uploadedFilenames = Object.keys(uploads);
	const [pendingUpload, setPendingUpload] = useState(false);
	const disabled = pendingUpload || uploadedFilenames.length === 0 || !state?.fieldsite?._id;

	function getFormData() {
		const formData = new FormData();
		const { overwrite } = state;
		const fieldsiteId = state.fieldsite?._id;
		fieldsiteId && formData.append("fieldsite", fieldsiteId);
		uploadedFilenames.forEach((filename) => {
			const rows = uploads[filename];
			if (!rows.length) {
				return;
			}
			const fieldNames = Object.keys(rows[0]);
			const missingFields = getMissingFields(fieldNames);
			const allFields = [...fieldNames, ...missingFields];
			let csvContent = allFields.join(",") + "\n";
			for (const row of rows) {
				csvContent += fieldNames.map((fieldName) => row[fieldName]).join(",") + "\n";
			}
			const blob = new Blob([csvContent]);
			formData.append("files[]", blob, filename);
		});
		formData.append("overwrite", overwrite.toString());

		return formData;
	}

	const handleFormReset = () => {
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
				dispatch(addError("Error occurred while trying to upload files"));
			})
			.finally(() => {
				dispatch(setLoading(false));
				handleFormReset();
			});
	};

	const removeUpload = (filename: string) => {
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
											Please contact us if the field site you are working in
											does not appear
										</div>
										<Link to="/contact" className="btn compact">
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
							dataHandler={async (rows: Row[]) => {
								setUploads((uploads) => {
									const prevRows = uploads[currentFile.current] || [];
									return {
										...uploads,
										[currentFile.current]: [...prevRows, ...rows],
									};
								});
							}}
							chunkSize={100000}
							defaultNoHeader={false}
							restartable={true}
							onStart={({ file }) => {
								currentFile.current = file.name;
								setPendingUpload(true);
							}}
							onComplete={() => {
								setPendingUpload(false);
							}}
							skipEmptyLines={true}
						>
							{importColumns.map((col) => (
								<ImporterField key={col.name} {...col} />
							))}
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
											If checked, existing paired samples will be replaced
											with new rows that have identical tapstand datetimes
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
										Required columns are ts_datetime, ts_frc, hh_datetime and
										hh_frc
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
									<>File format should be Comma-Separated Values (.csv) file</>
								),
								context: "icon",
							}}
							type="guide"
							orientation="reverse"
						>
							<span>Ensure that you upload a .csv file</span>
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
									Once you hit upload we will check your file has all the
									information we need and we will send you an email when your data
									is ready to analyze.
								</span>
							</NotificationLine>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

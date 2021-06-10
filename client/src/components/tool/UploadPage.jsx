import React, { useState, useRef, useReducer, useEffect } from "react";

import FormSelectSearch from "../elements/FormSelectSearch";

import { Link } from "react-router-dom";
import NoteLine from "../elements/NoteLine";
import { MEGABYTE } from "../../helpers/bitcalc";
import { DropzoneArea } from "material-ui-dropzone";
import {
	Button,
	Checkbox,
	FormControlLabel,
	makeStyles,
	TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import Autocomplete from "@material-ui/lab/Autocomplete";
import user, { userSelectors } from "../../reducers/user";
import axios from "axios";
import useForm from "../../hooks/useForm";

import { IconUpload } from "../icons";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: 0,
		},
	},
}));

const initialState = {
	response: null,
	area: null,
	fieldsite: { _id: null, name: "" },
	files: [],
	overwrite: false,
};

export default function UploadPage(props) {
	const classes = useStyles();

	const userFieldsites = useSelector(userSelectors.fieldsites);

	// const [state, formDispatch] = useReducer(simpleFormReducer, initialState);
	const { state, update, reset } = useForm(initialState);
	const [disabled, setDisabled] = useState(true);

	function getFormData() {
		const formData = new FormData();
		// Object.keys(state).forEach((field) => {
		// 	formData.append(field, state[field]);
		// })
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

	useEffect(() => {
		const isDisabled =
			state.files.length === 0 ||
			// !state.response ||
			// !state.area ||
			!state.fieldsite;
		setDisabled(isDisabled);
	}, [state]);

	const dispatch = useDispatch();

	const fileInput = useRef(null);

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
				dispatch(
					addNotice({ label: "Success", notice: "Upload success" })
				);
				// console.log(res);
			})
			.catch((err) => {
				dispatch(
					addError("Error occurred while trying to upload files")
				);
				console.log(err);
			})
			.finally(() => {
				dispatch(setLoading(false));
				handleFormReset();
			});
	};

	return (
		<form>
			{/* <h2 className="content-title">Choose a Location</h2> */}

			<section
				id="collect-data"
				className="content-window bleed-edges rich-text"
			>
				<header>
					<div className="content-window-title txt-condensed">
						Step 2. Upload Your Data
					</div>
				</header>
			</section>

			{/* <h2 className="content-title">Choose location</h2> */}

			<section className="content-window">
				<header>
					<div className="content-window-title">Location</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="flex-group">
						<label>
							<Autocomplete
								id="fieldsite"
								options={userFieldsites}
								getOptionLabel={(option) => option.name}
								renderInput={(params) => (
									<TextField
										{...params}
										label=""
										variant="outlined"
									/>
								)}
								value={state && state.fieldsite}
								onChange={(_event, value) => {
									update({
										fieldsite: value,
									});
								}}
							/>
							<span className="label">Fieldsite</span>
						</label>
					</div>
				</section>
				<footer>
					<Link to="/contact">
						<NoteLine text="Fieldsite Missing? ... Contact Us" />
					</Link>
				</footer>
			</section>

			{/* <h2 className="content-title">Upload Data</h2> */}

			<section className="content-window">
				<header>
					<div className="content-window-title">
						Add File(s){" "}
						<i>
							<img src="assets/icons/asterix.svg" alt="" />
						</i>
					</div>
					<div className="section-options"></div>
				</header>
				<section>
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
				</section>

				<footer>
					<NoteLine text="Ensure all required columns have data..." />
					<NoteLine text="Ensure that you upload a .csv or a .xlsx file" />
				</footer>
			</section>

			<section id="news" className="content-window">
				<header>
					<div className="content-window-title">Upload Settings</div>
					<div className="section-options"></div>
				</header>
				<section>
					<label className="checkbox">
						<input
							checked={state && state.overwrite}
							onChange={() => {
								update({
									overwrite: !state.overwrite,
								});
							}}
							name="overwriteCheck"
							type="checkbox"
						/>
						<span className="label">
							Overwrite Duplicate Entries
						</span>
					</label>
				</section>
				<footer>
					<NoteLine text="Duplicates are rows with the same dates and times" />
				</footer>
			</section>

			<section id="" className="content-window">
				<section>
					<div className={"submission-wrap " + classes.root}>
						<Button
							className="button green submit"
							color="primary"
							variant="contained"
							onClick={handleFormSubmit}
							disabled={disabled}
						>
							Upload
						</Button>
						<Button
							className="button reset"
							type="reset"
							variant="contained"
							color=""
							onClick={handleFormReset}
						>
							Reset Fields
						</Button>
					</div>
				</section>

				<footer>
					<NoteLine text="Make sure all fields are filled out" />
				</footer>
			</section>
		</form>
	);
}

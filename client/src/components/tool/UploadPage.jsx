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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { MEGABYTE } from "../../helpers/bitcalc";
import useForm from "../../hooks/useForm";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";
import { pushView } from "../../reducers/view";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NotificationLine from "../elements/NotificationLine";
import { IconUpload } from "../icons";

const initialState = {
	response: null,
	area: null,
	fieldsite: DEFAULT_FIELDSITE,
	files: [],
	overwrite: false,
};

export default function UploadPage() {
	const dispatch = useDispatch();
	const fieldsites = useSelector(userSelectors.fieldsites);

	useEffect(() => {
		dispatch(pushView({ title: "Upload", path: "/upload" }));
	}, []);

	const { state, update, reset } = useForm(initialState);
	const [disabled, setDisabled] = useState(true);
	const fileInput = useRef(null);

	useEffect(() => {
		const isDisabled = state.files.length === 0 || !state.fieldsite._id;
		setDisabled(isDisabled);
	}, [state]);

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
		// fileInput.current.setState({ fileObjects: [] });
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
			});
	};

	// Styles
	const css = {
		cardElement: {
			overflow: "visible",
			marginBottom: "30px",
			"& .MuiCardContent-root": {
				p: 2,
				"&:last-child": {
					p: 2,
				},
			},
		},
		uploadLocation: {
			marginBottom: "0",
		},
		uploadDrop: {
			"& .MuiDropzoneArea-root": {
				maxWidth: "720px",
				minHeight: "225px",
				margin: "16px auto",
				backgroundColor: "#F9F9F9",
				backgrounImage:
					"url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CCCCCCFF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e\")",
				borderRadius: "8px",
				"& .MuiDropzoneArea-text": {
					marginTop: "40px",
					marginBottom: "20px",
				},
				"& .MuiDropzoneArea-textContainer": {
					color: "#929eac",
				},
				"& .MuiDropzoneArea-icon": {
					width: "6rem",
					height: "6rem",
					color: "#ccc",
					fill: "#ccc",
				},
				"& .MuiChip-root": {
					m: 2,
					backgroundColor: "primary.main",
					color: "#fff",
					"& .MuiSvgIcon-root": {
						color: "#fff",
					},
				},
			},
			"& .notification": {
				paddingLeft: "20px",
				paddingBottom: "8px",
			},
			"& .MuiFormGroup-root": {
				pl: 2,
			},
			"& .MuiCheckbox-root": {
				p: 1,
				"& svg": {
					fill: "#F9F9F9",
					"& .base": {
						boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
						filter: "drop-shadow( 1px 1px 1px rgba(0, 0, 0, .1))",
					},
				},
				"&:not(.Mui-checked)": {
					"& svg": {
						fill: "#F9F9F9",
						stroke: "#888",
						strokeWidth: "1px",
					},
				},
				"&.Mui-checked": {
					"& svg": {
						fill: "#4069b1",
						stroke: "#305ba8",
						strokeWidth: "3px",
						"& .check": {
							fill: "#fff",
							stroke: "none",
						},
					},
				},
			},
		},
		cardSubmit: {
			"& button": { textTransform: "capitalize" },
			"& #btnSubmit": {
				color: "white",
				mb: 1,
			},
		},
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

					<Divider
						sx={{
							mt: 4,
							opacity: 0,
						}}
					/>

					<Typography
						variant="h4"
						component="div"
						sx={{
							mt: 2,
							mb: 1,
							color: "#888",
							fontWeight: "500",
						}}
					>
						<Box component="span">Options for Upload:</Box>
					</Typography>

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
									icon={
										<svg
											viewBox="0 0 32 32"
											width="40px"
											height="40px"
										>
											<path
												className="base"
												strokeMiterlimit="10"
												d="M26 29H6c-1.7 0-3-1.3-3-3V6c0-1.7 1.3-3 3-3h20c1.7 0 3 1.3 3 3v20c0 1.7-1.3 3-3 3z"
											></path>
										</svg>
									}
									checkedIcon={
										<svg
											viewBox="0 0 32 32"
											width="40px"
											height="40px"
										>
											<path
												className="base"
												strokeMiterlimit="10"
												d="M26 29H6c-1.7 0-3-1.3-3-3V6c0-1.7 1.3-3 3-3h20c1.7 0 3 1.3 3 3v20c0 1.7-1.3 3-3 3z"
											></path>
											<path
												className="check"
												d="M13.5 22.3l-6.2-6.2 1.4-1.3 4.8 4.7 9.8-9.9 1.4 1.4z"
											></path>
										</svg>
									}
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
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Button
								id="btnSubmit"
								color="primary"
								variant="contained"
								fullWidth
								onClick={() => {
									handleFormSubmit();
								}}
								disabled={disabled}
							>
								Upload
							</Button>
						</Grid>
						<Grid item xs={"auto"}>
							<Button
								type="reset"
								variant="text"
								onClick={() => {
									handleFormReset();
								}}
							>
								Reset Fields
							</Button>
						</Grid>
						<Grid item xs={12}>
							<NotificationLine type="notice">
								Make sure all fields are filled out
							</NotificationLine>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
	Card,
	CardHeader,
	Divider,
	CardContent,
	Box,
	Grid,
	Slider,
	Stack,
} from "@mui/material";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	FormControl,
	Radio,
	RadioGroup,
	FormControlLabel,
	Typography,
} from "@mui/material/";

import { IconCalendar } from "../icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";

import _ from "lodash";
import { DateTime } from "luxon";
import axios from "axios";

import useForm from "../../hooks/useForm";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { pushView } from "../../reducers/view";
import { userSelectors } from "../../reducers/user";
import { addError, addNotice, setLoading } from "../../reducers/notifications";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import LocationDropdown from "../elements/LocationDropdown";
import NotificationLine from "../elements/NotificationLine";

const initialState = {
	fieldsite: DEFAULT_FIELDSITE,
	startDate: null,
	endDate: null,
	duration: 3,
	confidence: "optimumDecay",
};

export default function AnalyzePage() {
	const dispatch = useDispatch();
	const fieldsites = useSelector(userSelectors.fieldsites);

	useEffect(() => {
		dispatch(pushView({ title: "Analyze", path: "/analyze" }));
	}, []);

	const { state, update, reset } = useForm(initialState);
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		const { fieldsite, startDate, endDate, duration, confidence } = state;
		setDisabled(
			!fieldsite._id ||
				(!startDate && !endDate) ||
				!duration ||
				!confidence
		);
	}, [state]);

	function selectDate(delta) {
		update({
			startDate: DateTime.now()
				.minus({
					days: delta,
				})
				.toJSDate(),
			endDate: DateTime.now().toJSDate(),
		});
	}

	function selectAllTimeDate() {
		update({
			startDate: null,
			endDate: DateTime.now().toJSDate(),
		});
	}

	function handleFormSubmit() {
		dispatch(setLoading(true));
		axios
			.post("/api/upload/analyze", state)
			.then(() => {
				dispatch(addNotice("Dataset successfully sent for analysis"));
			})
			.catch((err) => {
				const message =
					err?.response?.data?.error ||
					"Error occurred while trying to analyze";
				dispatch(addError(message));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}

	function handleDateChange(newRange) {
		let startDate = null,
			endDate = null;
		if (newRange) {
			[startDate, endDate] = newRange;
		}
		update({ startDate, endDate });
	}

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
			"& .MuiAccordionSummary-expandIconWrapper": {
				"& svg": {
					width: "0.92em",
					height: "0.92em",
				},
			},
		},
		analyzeLocation: {
			marginBottom: "0",
		},
		analyzeDateRange: {
			zIndex: 10,
			"& .MuiButton-root": {
				textTransform: "none",
			},
			stackElement: {
				justifyContent: "start",
				alignContent: "start",
				maxWidth: "440px",
				"& .MuiButton-root": {
					typography: "caption",
					fontWeight: "500",
					color: "white",
					border: "none",
					padding: "6px 16px",
					marginBottom: "8px",
					width: "auto",
					boxShadow: "1px 1px 2px rgba(0,0,0,0.2)",
					"&:hover": {},
				},
			},
			"& .title": {
				color: "#929eac",
			},
			// @wojtekmaj/react-daterange-picker
			"& .react-daterange-picker": {
				width: "100%",
				maxWidth: "440px",
				marginTop: "48px",
				"& *": {
					fontFamily: "inherit",
				},
				"& .react-daterange-picker__wrapper": {
					width: "100%",
					flexWrap: "wrap",
					border: "none",
					justifyContent: "start",
				},
				"& .react-daterange-picker__inputGroup": {
					position: "relative",
					flex: { xs: "0 1 100%", sm: "0 1 45%" },
					flexWrap: "wrap",
					padding: 0,
					height: "auto",
					backgroundColor: "#f9f9f9",
					border: "1px solid",
					borderColor: "rgba(0, 0, 0, 0.23)",
					borderRadius: "4px",
					"& .react-date-picker__inputGroup__divider": {
						typography: { xs: "body1" },
					},
					"&::before": {
						position: "absolute",
						left: "8px",
						bottom: "calc(100% + 4px)",
						typography: "caption",
						fontWeight: "500",
						color: "#929eac",
					},
					"&:nth-of-type(1)": {
						marginBottom: { xs: "28px", sm: "16px" },
						marginRight: { sm: "8px" },
						"&::before": {
							content: '"from"',
						},
					},
					"&:not(:nth-of-type(1))::before": {
						content: '"to"',
					},
				},
				"& .react-daterange-picker__range-divider": {
					display: "none",
					flex: { xs: "0 1 100%", sm: "0 1 calc(10% - 4px)" },
					lineHeight: "0",
					background: "transparent",
					padding: "4px 6px",
					color: "#929eac",
					textAlign: "center",
				},
				"& .react-daterange-picker__calendar-button": {
					display: "inline-flex",
					alignItems: "center",
					padding: "4px",
					borderRadius: "4px",
					marginRight: "10px",
					color: "#929eac",
					"&:hover": {
						backgroundColor: "rgb(249, 249, 249)",
					},
				},
				"& .react-daterange-picker__clear-button": {
					display: "inline-flex",
					alignItems: "center",
					order: 2,
					fontSize: "1rem",
					color: "#929eac",
					backgroundColor: "rgb(249, 249, 249)",
				},
				"&.react-daterange-picker--closed": {
					"& .react-daterange-picker__clear-button": {
						display: "none",
					},
				},
				"&.react-daterange-picker--open": {
					"& .react-daterange-picker__calendar-button": {
						backgroundColor: "rgb(249, 249, 249)",
					},
				},
				'& [type="text"], & [type="number"], & .MuiTextField-root': {
					typography: "body1",
					fontWeight: "500!important",
					backgroundColor: "transparent",
					padding: "16.5px 16px",
				},
				"& .react-daterange-picker__wrapper > *": {
					marginBottom: "16px",
				},
				"& .react-daterange-picker__calendar": {
					"& .react-calendar": {
						boxShadow:
							"0px 2px 4px -1px rgba(0,0,0,0.1),0px 1px 4px 0px rgba(0,0,0,0.075),0px 2px 6px 0px rgba(0,0,0,0.05)",
					},
				},
				"& .": {},
			},
		},
		analyzeStorageDuration: {
			mb: 0,
			"& .MuiAccordionSummary-root": {
				typography: "h5",
				p: 2,
			},
			sliderWrapper: {
				px: 2,
				my: 2,
			},
			"& label": {
				display: "flex",
				justifyContent: "space-between",
				typography: "caption",
				fontWeight: "500",
				color: "#929eac",
				pt: 2,
				pb: 1,
				"& span": {
					position: "relative",
					flex: "0 1 auto",
					width: "2rem",
					textAlign: "center",
				},
				"& span:nth-of-type(1)": {
					marginLeft: "-1rem",
				},
				"& span:nth-last-of-type(1)": {
					marginRight: "-1rem",
				},
			},
			"& .MuiSlider-root": {
				"& .MuiSlider-valueLabel": {
					textAlign: "center",
					background: "#4069b1",
					"& .MuiSlider-valueLabelCircle::after": {
						display: "block",
						content: '"hrs"',
						fontSize: "75%",
					},
				},
			},
		},
		analyzeConfidenceLevel: {
			boxShadow: "inset 0px 3px 4px rgba(0,0,0,0.075)",
			"& .MuiAccordionSummary-root": {
				typography: "h5",
				p: 2,
			},
			"& .MuiAccordionDetails-root": {
				p: 2,
			},
			"& .MuiFormControl-root": {
				pl: 2,
				mb: 2,
			},
			"& .MuiRadio-root": {
				"& svg": {
					fill: "#F9F9F9",
					stroke: "rgba(0, 0, 0, 0.23)",
					strokeWidth: "1px",
				},
				"&.Mui-checked": {
					"& svg": {
						fill: "#4069b1",
						stroke: "#305ba8",
						strokeWidth: "3px",
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
			<Card sx={{ ...css.cardElement, ...css.analyzeLocation }}>
				<CardHeader
					title={"Send for Analysis"}
					titleTypographyProps={{ variant: "h2", fontWeight: "400" }}
				/>

				<Divider />

				<CardContent
					sx={{
						p: 2,
						"&:last-child": {
							p: 2,
						},
					}}
				>
					<LocationDropdown
						onChange={(_event, value) => {
							update({
								fieldsite: value,
							});
						}}
						value={state && state.fieldsite}
						locations={fieldsites}
					/>
				</CardContent>
			</Card>

			<NotificationLine type="notice">
				Is your location missing? &nbsp;{" "}
				<Link to="/contact">Get in Touch</Link>
			</NotificationLine>

			<Card sx={{ ...css.cardElement, ...css.analyzeDateRange }}>
				<CardHeader title="Provide a Date Range *" />
				<Divider />
				<CardContent>
					<Grid>
						<Grid item xs={12}>
							<Stack
								sx={{ ...css.analyzeDateRange.stackElement }}
								direction="column"
								justifyContent="space-between"
								alignItems="start"
							>
								<Button
									variant="contained"
									onClick={() => {
										selectDate(30);
										// console.log('');
									}}
									sx={{ width: "100%" }}
								>
									Last 30 Days
								</Button>
								<Button
									variant="contained"
									onClick={() => {
										selectDate(60);
										// console.log('');
									}}
									sx={{ width: "100%" }}
								>
									Last 60 Days
								</Button>
								<Button
									variant="contained"
									onClick={() => {
										selectAllTimeDate();
										// console.log('');
									}}
									sx={{ width: "100%" }}
								>
									All-Time
								</Button>
							</Stack>

							<DateRangePicker
								format={"y-MM-dd"}
								yearPlaceholder={"YYYY"}
								monthPlaceholder={"M"}
								dayPlaceholder={"D"}
								rangeDivider={false}
								calendarIcon={
									<>
										<IconCalendar /> &nbsp; Open Celandar
									</>
								}
								clearIcon={
									<>
										<ClearIcon />
									</>
								}
								value={[state.startDate, state.endDate]}
								onChange={handleDateChange}
								sx={{ width: "100%" }}
							/>

							<Divider />

							<NotificationLine type="guide">
								How does setting the Date Range work?
							</NotificationLine>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<Typography
				variant="h3"
				component="div"
				sx={{
					mb: 2,
					color: "#888",
				}}
			>
				<Box component="span">Options for Analysis:</Box>
			</Typography>

			<Card sx={{ ...css.cardElement }}>
				<Accordion
					sx={{ ...css.analyzeStorageDuration }}
					defaultExpanded={true}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						Duration of Household Storage and Use (Units in Hours)
					</AccordionSummary>
					<AccordionDetails>
						<Divider />
						<Grid sx={{ px: 2 }}>
							<Grid item xs={12}>
								<Box
									sx={{
										...css.analyzeStorageDuration
											.sliderWrapper,
									}}
								>
									<Box
										component="label"
										htmlFor="HouseholdDuration"
									>
										{_.range(3, 27, 3).map((hour) => (
											<Box component="span" key={hour}>
												{hour}
											</Box>
										))}
									</Box>
									<Slider
										name="household-duration"
										aria-label="Household Duration"
										marks
										color="primary"
										min={3}
										max={24}
										step={3}
										valueLabelDisplay="on"
										value={state.duration}
										onChange={(_e, duration) => {
											update({ duration });
											// console.log('');
										}}
									/>
								</Box>

								<Divider />

								<NotificationLine type="guide">
									How should I determine the storage time?
								</NotificationLine>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
				<Divider />
				<Accordion sx={{ ...css.analyzeConfidenceLevel }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						Modelling Confidence Level (Advanced)
					</AccordionSummary>
					<Divider />
					<AccordionDetails>
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="confidence"
								name="confidence"
								value={state.confidence}
								onChange={(_e, confidence) => {
									update({ confidence });
									// console.log('');
								}}
							>
								{[
									{
										value: "minDecay",
										label: "Minimum Decay",
									},
									{
										value: "optimumDecay",
										label: "Optimum Decay",
									},
									{
										value: "maxDecay",
										label: "Maximum Decay",
									},
								].map((listitem, index) => (
									<FormControlLabel
										key={"decay-" + index}
										value={listitem.value}
										control={
											<Radio
												color="primary"
												icon={
													<svg
														viewBox="0 0 32 32"
														width="2.5rem"
														height="2.5rem"
													>
														<circle
															cx="16"
															cy="16"
															r="14"
															strokeMiterlimit="10"
														></circle>
													</svg>
												}
												checkedIcon={
													<svg
														viewBox="0 0 32 32"
														width="2.5rem"
														height="2.5rem"
													>
														<circle
															cx="16"
															cy="16"
															r="14"
															strokeMiterlimit="10"
														></circle>
													</svg>
												}
											/>
										}
										label={listitem.label}
										disableTypography
									/>
								))}
							</RadioGroup>
						</FormControl>

						<Divider />

						<NotificationLine type="guide">
							Which scenario should I choose?
						</NotificationLine>
					</AccordionDetails>
				</Accordion>
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
								onClick={handleFormSubmit}
								disabled={disabled}
							>
								Analyze
							</Button>
						</Grid>
						<Grid item xs={"auto"}>
							<Button
								type="reset"
								variant="text"
								onClick={() => {
									reset();
									// console.log('');
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

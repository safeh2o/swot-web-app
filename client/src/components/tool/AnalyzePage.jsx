import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Divider, Slider, Stack, TextField } from "@mui/material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material/";
import axios from "axios";
import _ from "lodash";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import useForm from "../../hooks/useForm";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { AnalyzePage as css } from "../../styles/styles";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
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
				update({ startDate: null, endDate: null });
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

	return (
		<>
			<section>
				<div className="section-wrap">
					<Box className="app-card">
						<Box component={"h1"} className="section-subtitle">
							Send for Analysis
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
						<Box component={"h2"}>Provide a Date Range *</Box>

						<Divider sx={{ mb: 3, mt: 1 }} />

						<Box sx={{ maxWidth: "80%", mx: "auto" }}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DateRangePicker
									startText="Start Date"
									endText="End Date"
									className="date-range-picker"
									value={[state.startDate, state.endDate]}
									onChange={handleDateChange}
									renderInput={(startProps, endProps) => (
										<>
											<TextField
												{...startProps}
												sx={{
													flex: 1,
												}}
											/>
											<Box sx={{ mx: 1 }}> to </Box>
											<TextField
												{...endProps}
												sx={{
													flex: 1,
												}}
											/>
										</>
									)}
								/>
							</LocalizationProvider>
							<Stack
								flexDirection={"row"}
								className="tool-date-range"
							>
								<button onClick={() => selectDate(30)}>
									Last 30 Days
								</button>
								<button onClick={() => selectDate(60)}>
									Last 60 Days
								</button>
								<button onClick={() => selectAllTimeDate()}>
									All-Time
								</button>
							</Stack>
						</Box>

						<Divider sx={{ my: 2, mb: 2 }} />

						<NotificationLine type="guide">
							How does setting the Date Range work?
						</NotificationLine>
					</Box>
					<Box className="app-card">
						<Box component={"h2"}>Options for Analysis:</Box>

						<Divider
							sx={{
								my: 1,
								borderBottomWidth: "3px",
							}}
						/>

						<Accordion
							defaultExpanded={true}
							sx={{ ...css.analyzeStorageDuration }}
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								Duration of Household Storage and Use (Units in
								Hours)
							</AccordionSummary>
							<AccordionDetails>
								<Divider sx={{ my: 1, opacity: 0 }} />
								<Box className="slider_wrap">
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
										}}
									/>
								</Box>
								<NotificationLine type="guide">
									How should I determine the storage time?
								</NotificationLine>
							</AccordionDetails>
						</Accordion>

						<Divider
							sx={{
								my: 1,
								borderBottomWidth: "3px",
							}}
						/>

						<Accordion sx={{ ...css.analyzeConfidenceLevel }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								Modelling Confidence Level (Advanced)
							</AccordionSummary>
							<AccordionDetails>
								<FormControl component="fieldset">
									<RadioGroup
										aria-label="confidence"
										name="confidence"
										value={state.confidence}
										onChange={(_e, confidence) => {
											update({ confidence });
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
								<NotificationLine type="guide">
									Which scenario should I choose?
								</NotificationLine>
							</AccordionDetails>
						</Accordion>

						<Divider
							sx={{
								my: 1,
								borderBottomWidth: "3px",
							}}
						/>
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
							>
								Analyze
							</Button>
							<button type="reset" onClick={() => reset()}>
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

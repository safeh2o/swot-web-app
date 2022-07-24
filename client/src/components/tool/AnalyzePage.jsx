import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Divider, Slider, Stack, TextField, Tooltip } from "@mui/material";
import { IconQuestionMark } from "../icons";
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
						<Box component={"h2"}>Provide a Date Range *</Box>

						<Divider sx={{ mb: 2, mt: 1 }} />

						<Box className="tool-date-range">
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
								className="date-range-buttons"
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
						<NotificationLine
							tip={{
								content: (
									<>
										Select the start and end dates for the
										period you would like to send for
										analysis, or select
										&lsquo;all-time&rsquo; to use the whole
										dataset
									</>
								),
								context: "icon",
							}}
							type="guide"
							orientation="reverse"
						>
							<span>How does setting the Date Range work</span>
						</NotificationLine>
					</Box>
					<Box className="app-card">
						<Box component={"h2"}>Options for Analysis:</Box>

						<Divider sx={{ mb: 2, mt: 1 }} />

						<Accordion
							defaultExpanded={true}
							className="tool-accordion"
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								Duration of Household Storage and Use (Units in
								Hours)
							</AccordionSummary>
							<AccordionDetails>
								<Box className="tool-household-storage">
									<Box
										component="label"
										htmlFor="HouseholdDuration"
										className="household-storage-labels"
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
										className="household-storage-slider"
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

								<NotificationLine
									tip={{
										content: (
											<>
												The FRC Target Recommendation
												will be determined based on the
												typical amount of time people in
												your field site are storing
												water. Longer storage times will
												require higher levels of FRC to
												keep water protected.
												<hr />
												<a
													href="/blog"
													className="btn compact"
												>
													learn more
												</a>
											</>
										),
										context: "icon",
									}}
									type="guide"
									orientation="reverse"
								>
									<span>
										How should I determine the storage time
									</span>
								</NotificationLine>
							</AccordionDetails>
						</Accordion>

						<Divider
							sx={{
								my: 1,
								mx: -2,
								borderBottomWidth: "3px",
							}}
						/>

						<Accordion className="tool-accordion">
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								Modelling Confidence Level (Advanced)
							</AccordionSummary>
							<AccordionDetails>
								<FormControl
									component="fieldset"
									fullWidth
									className="tool-modeling-confidence-level"
								>
									<RadioGroup
										aria-label="confidence"
										name="confidence"
										value={state.confidence}
										className="modeling-confidence-level-radio-group"
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
															<svg viewBox="0 0 32 32">
																<circle
																	cx="16"
																	cy="16"
																	r="14"
																	strokeMiterlimit="10"
																></circle>
															</svg>
														}
														checkedIcon={
															<svg viewBox="0 0 32 32">
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
								<NotificationLine
									tip={{
										content: (
											<>
												Neeed Text
												<hr />
												<a
													href="/blog"
													className="btn compact"
												>
													learn more
												</a>
											</>
										),
										context: "icon",
									}}
									type="guide"
									orientation="reverse"
								>
									<span>Which scenario should I choose</span>
								</NotificationLine>
							</AccordionDetails>
						</Accordion>
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
								Analyze
							</Button>
							<button type="reset" onClick={() => reset()}>
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

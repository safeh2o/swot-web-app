import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Slider,
	Stack,
	TextField,
} from "@mui/material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material/";
import axios from "axios";
import _ from "lodash";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import useForm from "../../hooks/useForm";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";
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
									}}
									sx={{ width: "100%" }}
								>
									Last 30 Days
								</Button>
								<Button
									variant="contained"
									onClick={() => {
										selectDate(60);
									}}
									sx={{ width: "100%" }}
								>
									Last 60 Days
								</Button>
								<Button
									variant="contained"
									onClick={() => {
										selectAllTimeDate();
									}}
									sx={{ width: "100%" }}
								>
									All-Time
								</Button>
							</Stack>

							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DateRangePicker
									value={[state.startDate, state.endDate]}
									onChange={handleDateChange}
									renderInput={(startProps, endProps) => (
										<>
											<TextField {...startProps} />
											<Box sx={{ mx: 1 }}> to </Box>
											<TextField {...endProps} />
										</>
									)}
									sx={{ width: "100%" }}
								/>
							</LocalizationProvider>
							{/* <DateRangePicker
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
							/> */}

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

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
													marginLeft: "auto",
													maxWidth: "250px",
												}}
											/>
											<Box sx={{ mx: 1 }}> to </Box>
											<TextField
												{...endProps}
												sx={{
													marginRight: "auto",
													maxWidth: "250px",
												}}
											/>
										</>
									)}
								/>
							</LocalizationProvider>

							<Stack
								sx={{ ...css.analyzeDateRange.stackElement }}
								direction="column"
								justifyContent="space-between"
								alignItems="start"
							>
								<Button
									variant="text"
									onClick={() => selectDate(30)}
								>
									Last 30 Days
								</Button>
								<Button
									variant="text"
									onClick={() => selectDate(60)}
								>
									Last 60 Days
								</Button>
								<Button
									variant="text"
									onClick={() => selectAllTimeDate()}
								>
									All-Time
								</Button>
							</Stack>

							<Divider className="divider" />

							<NotificationLine type="guide">
								How does setting the Date Range work?
							</NotificationLine>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				Options for Analysis:
			</Typography>

			<Card sx={{ ...css.analyzeStorageDuration }}>
				<Accordion defaultExpanded={true}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						Duration of Household Storage and Use (Units in Hours)
					</AccordionSummary>
					<Divider />
					<AccordionDetails>
						<Box className="slider_wrap">
							<Box component="label" htmlFor="HouseholdDuration">
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
					</AccordionDetails>
				</Accordion>
			</Card>
			<Card sx={{ ...css.cardElement }}>
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
					<Box>
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
						<Button
							type="reset"
							variant="text"
							onClick={() => reset()}
						>
							Reset Fields
						</Button>
					</Box>
					<NotificationLine type="notice">
						Make sure all fields are filled out
					</NotificationLine>
				</CardContent>
			</Card>
		</>
	);
}

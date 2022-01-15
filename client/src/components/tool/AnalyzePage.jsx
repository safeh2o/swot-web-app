import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	ButtonGroup,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Slider,
	Stack,
	TextField,
	useTheme,
} from "@mui/material";
import axios from "axios";
import _ from "lodash";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import useForm from "../../hooks/useForm";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { pushView } from "../../reducers/view";
import FieldsiteDropdown from "../elements/FieldsiteDropdown";
import NoteLine from "../elements/NoteLine";

const initialState = {
	fieldsite: DEFAULT_FIELDSITE,
	startDate: null,
	endDate: null,
	duration: 3,
	confidence: "optimumDecay",
};

export default function AnalyzePage() {
	const dispatch = useDispatch();
	const theme = useTheme();

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

	return (
		<form role="form" autoComplete="off">
			<section
				id="collect-data"
				className="content-window bleed-edges rich-text"
			>
				<header>
					<div className="content-window-title">
						Step 3. Request Analysis of Data
					</div>
				</header>
			</section>

			<section className="content-window">
				<header>
					<div className="content-window-title">Location</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="flex-group">
						<FieldsiteDropdown
							onChange={(value) => {
								update({ fieldsite: value });
							}}
						/>
					</div>
				</section>
				<footer>
					<Link to="/contact">
						<NoteLine text="Something missing?" />
					</Link>
				</footer>
			</section>

			<h2 className="content-title">Provide a Date Range</h2>

			<section id="date-range" className="content-window">
				<section>
					<ButtonGroup
						size="large"
						color="primary"
						aria-label="large outlined primary button group"
					>
						<Stack direction={{ xs: "column", sm: "row" }}>
							<Button
								onClick={() => {
									selectDate(30);
								}}
								sx={{ width: "100%" }}
							>
								Last 30 Days
							</Button>
							<Button
								onClick={() => {
									selectDate(60);
								}}
								sx={{ width: "100%" }}
							>
								Last 60 Days
							</Button>
							<Button
								onClick={() => {
									selectAllTimeDate();
								}}
								sx={{ width: "100%" }}
							>
								All-Time
							</Button>
						</Stack>
					</ButtonGroup>
					<label>
						<span className="label">
							<span className="note">
								* Choose ranges above, or adjust below
							</span>
						</span>

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
							/>
						</LocalizationProvider>
					</label>
				</section>

				<footer>
					<span className="txt-icon guide txt-sm">
						<i>
							<img src="assets/icons/guides.svg" alt="" />
						</i>
						<span>Choosing a date range</span>
					</span>
				</footer>
			</section>

			<h2 className="content-title">Analysis Parameters</h2>

			<section id="household-duration" className="content-window">
				<header>
					<div className="content-window-title">
						Duration of Household Storage and Use (Units in Hours)
					</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="range">
						<label htmlFor="HouseholdDuration" className="labels">
							{_.range(3, 27, 3).map((hour) => (
								<span key={hour}>
									<span>{hour}</span>
								</span>
							))}
						</label>
						<Slider
							name="household-duration"
							aria-label="Household Duration"
							marks
							min={3}
							max={24}
							step={3}
							valueLabelDisplay="off"
							value={state.duration}
							onChange={(_e, duration) => {
								update({ duration });
							}}
						/>
					</div>
				</section>

				<footer>
					<span className="txt-icon guide txt-sm">
						<i>
							<img src="assets/icons/guides.svg" alt="" />
						</i>
						<span>How should I determine the storage time?</span>
					</span>
				</footer>
			</section>

			<Accordion id="confidence-level" className="content-window">
				<AccordionSummary
					className="header"
					expandIcon={<ExpandMoreIcon />}
				>
					<div className="content-window-title">
						Modelling Confidence Level (Advanced)
					</div>
					<div className="section-options"></div>
				</AccordionSummary>

				<AccordionDetails>
					<section className="section">
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="confidence"
								name="confidence"
								value={state.confidence}
								onChange={(_e, confidence) => {
									update({ confidence });
								}}
							>
								<FormControlLabel
									value="minDecay"
									control={<Radio color="primary" />}
									label="Minimum Decay"
								/>

								<FormControlLabel
									value="optimumDecay"
									control={<Radio color="primary" />}
									label="Optimum Decay"
								/>

								<FormControlLabel
									value="maxDecay"
									control={<Radio color="primary" />}
									label="Maximum Decay"
								/>
							</RadioGroup>
						</FormControl>
					</section>

					<footer className="footer">
						<span className="txt-icon guide txt-sm">
							<i>
								<img src="assets/icons/guides.svg" alt="" />
							</i>
							<span>Which scenario should I choose?</span>
						</span>
					</footer>
				</AccordionDetails>
			</Accordion>

			<section id="" className="content-window">
				<section>
					<div
						className={"submission-wrap"}
						style={{ margin: theme.spacing(1) }}
					>
						<Button
							className="button green submit"
							color="primary"
							variant="contained"
							onClick={handleFormSubmit}
							disabled={disabled}
						>
							Analyze
						</Button>
						<Button
							className="button reset"
							type="reset"
							variant="contained"
							onClick={() => {
								reset();
							}}
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

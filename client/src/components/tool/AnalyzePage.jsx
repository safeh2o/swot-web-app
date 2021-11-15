import { useEffect, useState } from "react";
import {
	Slider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	useTheme,
	Button,
	ButtonGroup,
	FormControl,
	Radio,
	FormControlLabel,
	RadioGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useDispatch, useSelector } from "react-redux";
import NoteLine from "../elements/NoteLine";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import axios from "axios";
import useForm from "../../hooks/useForm";

import { IconCalendar } from "../icons";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { pushView } from "../../reducers/view";
import LocationDropdown from "../elements/LocationDropdown";
import { userSelectors } from "../../reducers/user";

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
				dispatch(
					addNotice({ label: "success", notice: "Analyze Success" })
				);
			})
			.catch(() =>
				dispatch(addError("Error occurred while trying to analyze"))
			)
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
						<label>
							<LocationDropdown
								onChange={(_event, value) => {
									update({
										fieldsite: value,
									});
								}}
								value={state && state.fieldsite}
								locations={fieldsites}
							/>
							<span className="label">Fieldsite</span>
						</label>
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
						<Button
							onClick={() => {
								selectDate(30);
							}}
						>
							Last 30 Days
						</Button>
						<Button
							onClick={() => {
								selectDate(60);
							}}
						>
							Last 60 Days
						</Button>
						<Button
							onClick={() => {
								selectAllTimeDate();
							}}
						>
							All-Time
						</Button>
					</ButtonGroup>
					<label>
						<span className="label">
							<span className="note">
								* Choose ranges above, or adjust below
							</span>
						</span>
						<DateRangePicker
							rangeDivider={" to "}
							calendarIcon={<IconCalendar />}
							clearIcon={<ClearIcon />}
							value={[state.startDate, state.endDate]}
							onChange={handleDateChange}
						/>
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
							valueLabelDisplay="on"
							min={3}
							max={24}
							step={3}
							valueLabelDisplay={"off"}
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

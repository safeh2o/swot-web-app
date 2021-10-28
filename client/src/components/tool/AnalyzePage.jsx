import React, { useEffect, useState } from "react";
// Styles
import { withStyles, makeStyles } from "@material-ui/core/styles";
// Slider
import Slider from "@material-ui/core/Slider";
// Accordion
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionExpandMoreIcon from "@material-ui/icons/ExpandMore";
// Date Picker
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "../../reducers/user";
import ClearIcon from "@material-ui/icons/Clear";
import {
	Button,
	ButtonGroup,
	FormControl,
	Radio,
	FormControlLabel,
	RadioGroup,
} from "@material-ui/core";
import NoteLine from "../elements/NoteLine";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import axios from "axios";
import useForm from "../../hooks/useForm";
import FieldsitesDropdown from "../elements/FieldsitesDropdown";

import { IconCalendar } from "../icons";
import { DEFAULT_FIELDSITE } from "../../constants/defaults";
import { pushView } from "../../reducers/view";

const FromSlider_HouseholdDuration_Hours = [
	{ value: 3 },
	{ value: 6 },
	{ value: 9 },
	{ value: 12 },
	{ value: 15 },
	{ value: 18 },
	{ value: 21 },
	{ value: 24 },
];

const SliderThumbBoxShadow =
	"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const FormSlider = withStyles({
	root: {
		color: "#4069b1",
		height: 10,
		padding: "15px 0",
	},
	thumb: {
		height: "2.6rem",
		width: "2.6rem",
		backgroundColor: "#4069b1",
		boxShadow: SliderThumbBoxShadow,
		marginTop: "-1rem",
		marginLeft: "-1.3rem",
		"&:focus, &:hover, &$active": {
			transform: "scale(1.1)",
			boxShadow:
				"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				boxShadow: SliderThumbBoxShadow,
			},
		},
	},
	active: {},
	track: {
		height: 10,
	},
	rail: {
		height: 10,
		opacity: 0.5,
		backgroundColor: "#bfbfbf",
	},
	mark: {
		backgroundColor: "#bfbfbf",
		height: 15,
		width: 2,
		marginTop: -5,
		marginLeft: -1,
	},
	markActive: {
		opacity: 1,
		backgroundColor: "currentColor",
	},
})(Slider);

const Accordion = withStyles({
	root: {
		"&:before": {
			display: "none",
		},
		"&$expanded": {
			margin: "20px 30px 40px",
		},
		borderRadius: "7px",
	},
	expanded: {
		margin: 0,
	},
})(MuiAccordion);

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const AccordionSummary = withStyles({
	root: {
		borderBottom: "1px solid #dde6ed",
		margin: 0,
	},
	content: {
		margin: 0,
		"&$expanded": {
			margin: 0,
		},
	},
	expanded: {
		margin: 0,
	},
	expandIcon: {
		padding: "0 12px 0 0",
	},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
	root: {
		padding: "0",
		flexDirection: "column",
	},
}))(MuiAccordionDetails);

const initialState = {
	fieldsite: DEFAULT_FIELDSITE,
	startDate: null,
	endDate: null,
	duration: 3,
	confidence: "optimumDecay",
};

export default function AnalyzePage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "Analyze", path: "/analyze" }));
	}, []);

	const classes = useStyles();

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
							<FieldsitesDropdown
								onChange={(_event, value) => {
									update({
										fieldsite: value,
									});
								}}
								value={state && state.fieldsite}
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

			<h2 className="content-title">Options For Analysis</h2>

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
							{FromSlider_HouseholdDuration_Hours.map((hour) => (
								<span key={hour.value}>
									<span>{hour.value}</span>
								</span>
							))}
						</label>
						<FormSlider
							name="household-duration"
							aria-label="Household Duration"
							marks={FromSlider_HouseholdDuration_Hours}
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
					expandIcon={<MuiAccordionExpandMoreIcon />}
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
					<div className={"submission-wrap " + classes.root}>
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

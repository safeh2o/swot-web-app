import React, { useEffect, useReducer, useState } from "react";
import FormSelectSearch from "../elements/FormSelectSearch";
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
import TextField from "@material-ui/core/TextField";
// Tool Tip
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "../../reducers/user";
import {
	Button,
	ButtonGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@material-ui/core";
import NoteLine from "../elements/NoteLine";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import axios from "axios";
import useForm from "../../hooks/useForm";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		width: 300 + theme.spacing(3) * 2,
// 	},
// 	margin: {
// 		height: theme.spacing(3),
// 	},
// }));

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
			margin: "20px 20px 40px",
		},
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

// Guides
const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: "#f5f5f9",
		color: "rgba(0, 0, 0, 0.87)",
		maxWidth: 380,
		border: "2px solid #dadde9",
		padding: "20px 30px",
		boxShadow: "4px 4px 5px rgb(0, 0, 0, .10)",
	},
}))(Tooltip);

const initialState = {
	fieldsite: null,
	startDate: null,
	endDate: null,
	duration: 3,
	confidence: "optimum",
	name: "",
	description: "",
};

export default function AnalyzePage(props) {
	const classes = useStyles();

	const userFieldsites = useSelector(userSelectors.fieldsites);
	const { state, update, reset } = useForm(initialState);
	const [disabled, setDisabled] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const {
			fieldsite,
			startDate,
			endDate,
			duration,
			confidence,
			name,
			description,
		} = state;
		setDisabled(
			!fieldsite ||
				(!startDate && !endDate) ||
				!duration ||
				!confidence ||
				!name ||
				!description
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

	function handleFormSubmit() {
		dispatch(setLoading(true));
		axios
			.post("/api/upload/analyze", state)
			.then((res) => {
				dispatch(
					addNotice({ label: "success", notice: "Analyze Success" })
				);
			})
			.catch((err) =>
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
			<h2 className="content-title">Choose a Location</h2>

			<section className="content-window">
				<header>
					<div className="content-window-title">Location</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="flex-group">
						{/* <label className="space">
                <FormSelectSearch options={OptionsResponse} icon={true} />
                <span className="label">Country</span>
              </label>
              <label className="space">
                <FormSelectSearch options={OptionsArea} />
                <span className="label">Area</span>
              </label> */}
						<Autocomplete
							id="fieldsite"
							options={userFieldsites}
							getOptionLabel={(option) => option.name}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Fieldsite"
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
					</div>
				</section>
				<footer>
					<Link to="/contact">
						<NoteLine text="Something missing?" />
					</Link>
				</footer>
			</section>

			<h2 className="content-title">Name the Dataset</h2>

			<section className="content-window">
				<section>
					<TextField
						label="Dataset Name"
						onChange={(e) => {
							update({ name: e.target.value });
						}}
					/>
					<br />
					<TextField
						label="Dataset Description"
						multiline
						onChange={(e) => {
							update({ description: e.target.value });
						}}
					/>
				</section>
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
								selectDate(9999);
							}}
						>
							All-Time
						</Button>
					</ButtonGroup>
					<span className="custom-range-title">
						<span className="note">
							* Click icon to show calender
						</span>
					</span>
					<DateRangePicker
						value={[state.startDate, state.endDate]}
						onChange={handleDateChange}
					/>
				</section>

				<footer>
					<HtmlTooltip
						placement="top-start"
						interactive
						TransitionComponent={Fade}
						title={
							<>
								<Typography variant="h5">
									Choosing a Date Range
								</Typography>
								<Typography variant="body1">
									<em>{"And here's"}</em> <b>{"some"}</b>{" "}
									<u>{"amazing content"}</u>.{" "}
									{"It's very engaging. Right?"}
									<br />
									<a href="">Learn more...</a>
								</Typography>
							</>
						}
					>
						<span className="txt-icon guide txt-sm">
							<i>
								<img src="assets/icons/guides.svg" alt="" />
							</i>
							<span>Choosing a Date Range</span>
						</span>
					</HtmlTooltip>
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
					<HtmlTooltip
						placement="top-start"
						interactive
						TransitionComponent={Fade}
						title={
							<>
								<Typography variant="h5">
									How should I determine the storage time?
								</Typography>
								<Typography variant="body1">
									<em>{"And here's"}</em> <b>{"some"}</b>{" "}
									<u>{"amazing content"}</u>.{" "}
									{"It's very engaging. Right?"}
								</Typography>
							</>
						}
					>
						<span className="txt-icon guide txt-sm">
							<i>
								<img src="assets/icons/guides.svg" alt="" />
							</i>
							<span>
								How should I determine the storage time?
							</span>
						</span>
					</HtmlTooltip>
				</footer>
			</section>

			<Accordion id="confidence-level" className="content-window">
				<AccordionSummary
					className="header"
					expandIcon={<MuiAccordionExpandMoreIcon />}
				>
					<div className="content-window-title">Advanced Options</div>
					<div className="section-options"></div>
				</AccordionSummary>

				<AccordionDetails>
					<section className="section">
						<FormControl component="fieldset">
							<FormLabel component="legend">
								Confidence Level
							</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="gender1"
								value={state.confidence}
								onChange={(_e, confidence) => {
									update({ confidence });
								}}
							>
								<FormControlLabel
									value="minimum"
									control={<Radio color="primary" />}
									label="Minimum Decay"
								/>
								<FormControlLabel
									value="optimum"
									control={<Radio color="primary" />}
									label="Optimum Decay"
								/>
								<FormControlLabel
									value="maximum"
									control={<Radio color="primary" />}
									label="Maximum Decay"
								/>
							</RadioGroup>
						</FormControl>
					</section>

					<footer className="footer">
						<HtmlTooltip
							placement="top-start"
							interactive
							TransitionComponent={Fade}
							title={
								<>
									<Typography variant="h5">
										Which scenario should I choose?
									</Typography>
									<Typography variant="body1">
										<em>{"And here's"}</em> <b>{"some"}</b>{" "}
										<u>{"amazing content"}</u>.{" "}
										{"It's very engaging. Right?"}
									</Typography>
								</>
							}
						>
							<span className="txt-icon guide txt-sm">
								<i>
									<img src="assets/icons/guides.svg" alt="" />
								</i>
								<span>Which scenario should I choose?</span>
							</span>
						</HtmlTooltip>
					</footer>
				</AccordionDetails>
			</Accordion>

			<section id="" className="content-window">
				<section>
					<div className={"submission-wrap " + classes.root}>
						<Button
							color="primary"
							variant="contained"
							onClick={handleFormSubmit}
							disabled={disabled}
						>
							Analyze
						</Button>
						<Button
							type="reset"
							variant="contained"
							color="secondary"
							onClick={() => {
								reset();
							}}
						>
							Reset
						</Button>
					</div>
				</section>

				<footer>
					<span className="txt-icon notice">
						<i>
							<img src="assets/icons/notice.svg" alt="" />
						</i>
						<span>Make sure all fields are filled out</span>
					</span>
				</footer>
			</section>
		</form>
	);
}

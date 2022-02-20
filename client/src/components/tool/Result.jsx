// Frontend Imports
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	SvgIcon,
	Tooltip,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { pushView } from "../../reducers/view";

export default function Result() {
	const { datasetId } = useParams();
	const defaultDataset = {
		nSamples: 122,
		validSamples: 76,
		dateCreated: "--/--/--",
		startDate: "--/--/--",
		endDate: "--/--/--",
		frcTarget: 0,
		maxDuration: 0,
		tsFrc: 0,
		hhSafety: 0,
		eo: { reco: 0.6 },
	};
	const [dataset, setDataset] = useState(defaultDataset);
	const [locationData, setLocationData] = useState({
		fieldsiteName: "",
		areaName: "",
		countryName: "",
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: datasetId, path: `/results/${datasetId}` }));
	}, []);

	const handleReanalysis = () => {
		dispatch(setLoading(true));
		fetch(`/api/results/analyzedataset?datasetId=${datasetId}`)
			.then((res) => res.text())
			.then((data) => dispatch(addNotice(data)))
			.catch((err) => dispatch(addError(err)))
			.finally(() => {
				dispatch(setLoading(false));
			});
	};

	useEffect(() => {
		axios
			.get(`/api/datasets/${datasetId}`)
			.then(({ data }) => {
				setDataset(data.dataset);
				setLocationData(data.locationData);
			})
			.catch(() => {
				setDataset(defaultDataset);
			});
	}, [datasetId]);

	const parseDecayScenario = (scenarioKey) => {
		switch (scenarioKey) {
			case "minDecay":
				return "Minimum Decay Scenario";
			case "optimumDecay":
				return "Optimum Decay Scenario";
			case "maxDecay":
				return "Maximum Decay Scenario";
			default:
				return "";
		}
	};

	const parseDate = (date) => date?.slice(0, 10) || String.fromCharCode(8734);

	// Custom Elements
	const Type = Typography; // extends Typography Component

	// Styles
	const css = {
		buttonBackToResults: {
			display: "block",
			fontSize: "0.85em",
			alignItems: "center",
			justifyContent: "flex-start",
			backgroundColor: "#161819",
			borderRadius: "2px",
			color: "#fcfcfc",
			width: "100%",
			py: 1,
			px: 2,
			mb: 3,
			hover: {
				backgroundColor: "#161819",
			},
		},
		hr: {
			borderColor: "rgba(0,0,0,0.05)",
			borderWidth: "2px",
			marginTop: "30px",
			marginBottom: "30px",
		},
		cardElement: {
			marginBottom: "15px",
			//

			//
			"& .sup": {
				position: "relative",
				fontSize: "1.1em",
				top: "0px",
				marginLeft: "4px",
			},
			"& .low": {
				borderLeftColor: "#CC6633",
				"& .MuiTypography-inputValue": {
					color: "#CC6633",
				},
			},
			"& .pass": {
				borderLeftColor: "#679289",
				"& .MuiTypography-inputValue": {
					color: "#679289",
				},
			},
		},
		stat: {
			display: "inline-block",
			borderLeft: "1.5px solid #eee",
			padding: "0 20px 10px 10px",
			margin: "5px 0px",
			//
			"& .MuiTypography-inputValue": {
				display: "flex",
				fontSize: "20px",
				fontWeight: 500,
			},
			"& .MuiTypography-inputLabel": {
				fontSize: "15px",
				fontWeight: 400,
				paddingRight: "20px",
				"& svg": {
					width: ".6em",
					height: ".6em",
					verticalAlign: "text-top",
					color: "#ccc",
					marginLeft: "3px",
				},
			},
			divider: {
				opacity: 0,
			},
			range: {
				display: "flex",
				seperator: {
					fontSize: "15px",
					alignSelf: "center",
					margin: "0 .75rem",
				},
			},
			unit: {
				fontSize: "1.35rem",
				opacity: 0.8,
				marginLeft: "5px",
			},
		},
		//
		buttonDownloadReport: {
			wrapper: {
				display: "flex",
				alignItems: "center",
				backgroundColor: "#161819",
				color: "#fcfcfc",
				p: 3,
				mb: 4,
				"&:hover": {
					backgroundColor: "#333",
				},
			},
			icon: {
				flex: "1 0 1.9em",
				width: "1.9em",
				height: "1.9em",
				maxWidth: "1.9em",
				maxHeight: "1.9em",
				marginRight: "auto",
				fontSize: "inherit!important",
			},
			text: {
				fontSize: "1rem",
				lineHeight: 1,
				textTransform: "capitalize",
				pl: 2,
				pr: 2,
			},
		},
		buttonReanalyzeReport: {
			wrapper: {
				alignItems: "center",
				fontWeight: "600",
				color: "currentColor",
				backgroundColor: "#ddd",
				py: 1,
				pr: 2,
				my: 0,
				mx: 1,
				"&:hover": {
					color: "white",
					backgroundColor: "#555",
				},
			},
			icon: {
				mr: 2,
				ml: 1,
			},
		},
		resultFiles: {
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
			mb: 6,
			"& .btn-download": {
				color: "#fff",
				textTransform: "unset",
				backgroundColor: "primary.main",
				padding: "10px",
				marginRight: ".5em",
				"& svg": {
					width: ".8em",
					height: ".8em",
					marginRight: ".5em",
				},
			},
			"& .btn-reanalyze": {
				backgroundColor: "#111",
			},
		},
	};

	return (
		<>
			{/* <h4>Coming soon...</h4> */}
			<Button
				component={NavLink}
				to={`/results`}
				sx={{ ...css.buttonBackToResults }}
			>
				Back to All Results
			</Button>

			{/* Location */}
			<Card id="result-location" sx={{ ...css.cardElement }}>
				<CardHeader title="Location" />
				<Divider />
				<CardContent>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{locationData.countryName}
						</Type>
						<Type variant="inputLabel">Country</Type>
					</Box>

					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{locationData.areaName}
						</Type>
						<Type variant="inputLabel">Area</Type>
					</Box>

					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{locationData.fieldsiteName}
						</Type>
						<Type variant="inputLabel">Fieldsite</Type>
					</Box>
				</CardContent>
			</Card>

			{/* Analysis Requested */}
			<Card id="result-analysis-requested" sx={{ ...css.cardElement }}>
				<CardHeader title="Analysis Requested" />
				<Divider />
				<CardContent>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{parseDate(dataset?.dateCreated)}
						</Type>
						<Type variant="inputLabel">Date of Analysis</Type>
					</Box>

					<Divider sx={{ ...css.stat.divider }} />

					<Box sx={{ ...css.stat }}>
						<Box sx={{ ...css.stat.range }}>
							<Type variant="inputValue">
								{parseDate(dataset?.startDate)}{" "}
							</Type>
							<Type
								component="span"
								sx={{ ...css.stat.range.seperator }}
							>
								to
							</Type>
							<Type variant="inputValue">
								{parseDate(dataset?.endDate)}
							</Type>
						</Box>
						<Type variant="inputLabel">
							Date Range of Analysis Requested
						</Type>
					</Box>

					<Divider sx={{ ...css.stat.divider }} />

					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{dataset.maxDuration} hrs
						</Type>
						<Type variant="inputLabel">
							Length of storage time to analyse for
						</Type>
					</Box>

					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{parseDecayScenario(dataset.confidenceLevel)}
						</Type>
						<Type variant="inputLabel">
							Modelling confidence level
						</Type>
					</Box>
				</CardContent>
			</Card>

			<Divider sx={{ ...css.hr }} />

			{/* Dataset Summary */}
			<Card id="result-dataset-summary" sx={{ ...css.cardElement }}>
				<CardHeader title="Dataset Summary" />
				<Divider />
				<CardContent>
					<Box sx={{ ...css.stat }}>
						<Box sx={{ ...css.stat.range }}>
							<Type variant="inputValue">
								{parseDate(dataset?.firstSample)}
							</Type>
							<Type
								component="span"
								sx={{ ...css.stat.range.seperator }}
							>
								to
							</Type>
							<Type variant="inputValue">
								{parseDate(dataset?.lastSample)}
							</Type>
						</Box>
						<Type variant="inputLabel">
							Date Range Analyzed{" "}
							<Tooltip
								title="Date of the earliest sample found, to the date of
							the latest sample found, in the dataset that is
							actually sent for analysis."
								arrow
								placement="top"
							>
								<SvgIcon viewBox="0 0 32 32">
									<path
										fill="currentColor"
										d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm.2 26.1c-1.2 0-2.2-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.1-.9 2.1-2.1 2.1zm2.4-9.4c-.9.6-.9 1.5-.9 1.5l.2 1.7-3.5.3-.2-1.7c-.1-1 .3-3.2 2.4-4.7.5-.3 1.7-1.5 1.7-2.4 0-1.1-1-2.1-2.3-2.1s-2.3.9-2.3 2.1c0 .2.1.3.2.6l.3.5-3.3 1.5-.3-.5c-.3-.7-.4-1.4-.4-2.1 0-3.1 2.6-5.6 5.8-5.6s5.8 2.7 5.8 5.7c0 2.9-2.9 5-3.2 5.2z"
									></path>
								</SvgIcon>
							</Tooltip>
						</Type>
					</Box>
					<Divider sx={{ ...css.stat.divider }} />
					<Box
						sx={{ ...css.stat }}
						className={dataset.nSamples < 100 ? "low" : "pass"}
					>
						<Type variant="inputValue">
							{dataset.nSamples}
							{/* if total samples are less than 100 */}
							<SvgIcon viewBox="0 0 32 32" className="sup">
								{dataset.nSamples < 100 ? (
									<path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M17.4,23h-2.8v-2.8h2.8V23z M17.4,17.4h-2.8V9h2.8V17.4z" />
								) : (
									<path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm-2.4 20.4-6.3-6.3 1.9-1.8 4.4 4.3 9.1-9.1 1.9 1.9-11 11z" />
								)}
							</SvgIcon>
						</Type>
						<Type variant="inputLabel">
							Number of Data Samples Sent for Analysis
							<Tooltip
								title="This is total number of the data records found for that date range."
								arrow
								placement="top"
							>
								<SvgIcon viewBox="0 0 32 32">
									<path
										fill="currentColor"
										d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm.2 26.1c-1.2 0-2.2-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.1-.9 2.1-2.1 2.1zm2.4-9.4c-.9.6-.9 1.5-.9 1.5l.2 1.7-3.5.3-.2-1.7c-.1-1 .3-3.2 2.4-4.7.5-.3 1.7-1.5 1.7-2.4 0-1.1-1-2.1-2.3-2.1s-2.3.9-2.3 2.1c0 .2.1.3.2.6l.3.5-3.3 1.5-.3-.5c-.3-.7-.4-1.4-.4-2.1 0-3.1 2.6-5.6 5.8-5.6s5.8 2.7 5.8 5.7c0 2.9-2.9 5-3.2 5.2z"
									></path>
								</SvgIcon>
							</Tooltip>
						</Type>
					</Box>
				</CardContent>
			</Card>

			{/* SWOT FRC Target */}
			<Card id="result-frc-target" sx={{ ...css.cardElement }}>
				<CardHeader title="SWOT FRC Target" />
				<Divider />
				<CardContent>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{dataset?.eo?.reco?.toFixed(2)} mg/l
						</Type>
						<Type variant="inputLabel">
							SWOT FRC Target Recommendation
							<Tooltip
								title={
									<>
										You should aim for this FRC value at the
										tapstand in order to ensure water is
										safe to drink after storing in the home.{" "}
										<a href="/contact">learn more</a>
									</>
								}
								arrow
								placement="top"
							>
								<SvgIcon viewBox="0 0 32 32">
									<path
										fill="currentColor"
										d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm.2 26.1c-1.2 0-2.2-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.1-.9 2.1-2.1 2.1zm2.4-9.4c-.9.6-.9 1.5-.9 1.5l.2 1.7-3.5.3-.2-1.7c-.1-1 .3-3.2 2.4-4.7.5-.3 1.7-1.5 1.7-2.4 0-1.1-1-2.1-2.3-2.1s-2.3.9-2.3 2.1c0 .2.1.3.2.6l.3.5-3.3 1.5-.3-.5c-.3-.7-.4-1.4-.4-2.1 0-3.1 2.6-5.6 5.8-5.6s5.8 2.7 5.8 5.7c0 2.9-2.9 5-3.2 5.2z"
									></path>
								</SvgIcon>
							</Tooltip>
						</Type>
					</Box>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">? hrs</Type>
						<Type variant="inputLabel">
							Duration of protection
							<Tooltip
								title={
									<>
										You should aim for this FRC value at the
										tapstand in order to ensure water is
										safe to drink after storing in the home.{" "}
										<a href="/contact">learn more</a>
									</>
								}
								arrow
								placement="top"
							>
								<SvgIcon viewBox="0 0 32 32">
									<path
										fill="currentColor"
										d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm.2 26.1c-1.2 0-2.2-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.1-.9 2.1-2.1 2.1zm2.4-9.4c-.9.6-.9 1.5-.9 1.5l.2 1.7-3.5.3-.2-1.7c-.1-1 .3-3.2 2.4-4.7.5-.3 1.7-1.5 1.7-2.4 0-1.1-1-2.1-2.3-2.1s-2.3.9-2.3 2.1c0 .2.1.3.2.6l.3.5-3.3 1.5-.3-.5c-.3-.7-.4-1.4-.4-2.1 0-3.1 2.6-5.6 5.8-5.6s5.8 2.7 5.8 5.7c0 2.9-2.9 5-3.2 5.2z"
									></path>
								</SvgIcon>
							</Tooltip>
						</Type>
					</Box>
				</CardContent>
			</Card>

			{/* Household Water Safety Status */}
			<Card id="result-household-status" sx={{ ...css.cardElement }}>
				<CardHeader title="Household Water Safety Status" />
				<Divider />
				<CardContent>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">? %</Type>
						<Type variant="inputLabel">
							Current household water safety
							<Tooltip
								title={
									<>
										Count of HH samples &gt;= 0.2 mg/L using
										subset of samples in date range.
									</>
								}
								arrow
								placement="top"
							>
								<SvgIcon viewBox="0 0 32 32">
									<path
										fill="currentColor"
										d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm.2 26.1c-1.2 0-2.2-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.1-.9 2.1-2.1 2.1zm2.4-9.4c-.9.6-.9 1.5-.9 1.5l.2 1.7-3.5.3-.2-1.7c-.1-1 .3-3.2 2.4-4.7.5-.3 1.7-1.5 1.7-2.4 0-1.1-1-2.1-2.3-2.1s-2.3.9-2.3 2.1c0 .2.1.3.2.6l.3.5-3.3 1.5-.3-.5c-.3-.7-.4-1.4-.4-2.1 0-3.1 2.6-5.6 5.8-5.6s5.8 2.7 5.8 5.7c0 2.9-2.9 5-3.2 5.2z"
									></path>
								</SvgIcon>
							</Tooltip>
						</Type>
					</Box>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">? %</Type>
						<Type variant="inputLabel">
							Predicted household water safety
							<Tooltip
								title="Predicted HH safety rate when the FRC target
									is implemented"
								arrow
								placement="top"
							>
								<SvgIcon viewBox="0 0 32 32">
									<path
										fill="currentColor"
										d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm.2 26.1c-1.2 0-2.2-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.1-.9 2.1-2.1 2.1zm2.4-9.4c-.9.6-.9 1.5-.9 1.5l.2 1.7-3.5.3-.2-1.7c-.1-1 .3-3.2 2.4-4.7.5-.3 1.7-1.5 1.7-2.4 0-1.1-1-2.1-2.3-2.1s-2.3.9-2.3 2.1c0 .2.1.3.2.6l.3.5-3.3 1.5-.3-.5c-.3-.7-.4-1.4-.4-2.1 0-3.1 2.6-5.6 5.8-5.6s5.8 2.7 5.8 5.7c0 2.9-2.9 5-3.2 5.2z"
									></path>
								</SvgIcon>
							</Tooltip>
						</Type>
					</Box>
				</CardContent>
			</Card>

			{/* Download Options */}
			<Box id="result-files" sx={{ ...css.resultFiles }}>
				<Button
					href={`/api/results/download?datasetId=${datasetId}`}
					className="btn-download"
				>
					<SvgIcon viewBox="0 0 32 32">
						<path d="M9.8 14.7c-.4-.4-.5-1-.3-1.5s.7-.8 1.2-.8h3.9V5c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3v7.4h3.9c.5 0 1 .3 1.2.8.2.5.1 1.1-.3 1.5l-5.2 5.2c-.1.1-.3.2-.4.3-.2.1-.3.1-.5.1s-.4 0-.5-.1c-.1-.1-.3-.1-.4-.3l-5.2-5.2zm17.2 3c-.7 0-1.3.6-1.3 1.3v6.7H6.3V19c0-.7-.6-1.3-1.3-1.3s-1.3.6-1.3 1.3v7c0 1.3 1 2.3 2.3 2.3h20c1.3 0 2.3-1 2.3-2.3v-7c0-.7-.6-1.3-1.3-1.3z" />
					</SvgIcon>{" "}
					<Type component="span">Download Raw Results</Type>
				</Button>
				<Button onClick={handleReanalysis}>Reanalyze</Button>
			</Box>
		</>
	);
}

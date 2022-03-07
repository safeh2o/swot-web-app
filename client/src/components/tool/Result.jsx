// Frontend Imports
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Tooltip,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import { pushView } from "../../reducers/view";

import { IconQuestionMark, IconDownload, IconLow, IconCheck } from "../icons";

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
			backgroundColor: "#3f4549",
			borderRadius: "2px",
			color: "#fcfcfc",
			width: "100%",
			py: 1,
			px: 2,
			mb: 3,
			hover: {
				backgroundColor: "#3f4549",
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
				backgroundColor: "#3f4549",
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
								<IconQuestionMark />
							</Tooltip>
						</Type>
					</Box>
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
								<IconQuestionMark />
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
							{dataset.nSamples < 100 ? (
								<IconLow className="sup" />
							) : (
								<IconCheck className="sup" />
							)}
						</Type>
						<Type variant="inputLabel">
							Number of Data Samples Sent for Analysis
							<Tooltip
								title="This is total number of the data records found for that date range."
								arrow
								placement="top"
							>
								<IconQuestionMark />
							</Tooltip>
						</Type>
					</Box>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">4:35 hrs</Type>
						<Type variant="inputLabel">
							Average storage time in dataset
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
								<IconQuestionMark />
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
								<IconQuestionMark />
							</Tooltip>
						</Type>
					</Box>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">? %</Type>
						<Type variant="inputLabel">
							Predicted household water safety at this storage
							time
							<Tooltip
								title="Predicted HH safety rate when the FRC target
									is implemented"
								arrow
								placement="top"
							>
								<IconQuestionMark />
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
					<IconDownload />{" "}
					<Type component="span">Download Raw Results</Type>
				</Button>
				<Button onClick={handleReanalysis}>Reanalyze</Button>
			</Box>
		</>
	);
}

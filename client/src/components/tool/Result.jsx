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
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
	addError,
	addNotice,
	notificationsSelectors,
	setLoading,
} from "../../reducers/notifications";
import { replaceCrumb } from "../../reducers/view";
import { Result as css } from "../../styles/styles";
import { IconCheck, IconDownload, IconLow, IconQuestionMark } from "../icons";
import NotFound from "../NotFound";

export default function Result() {
	const { datasetId } = useParams();
	const defaultDataset = {
		nSamples: 0,
		validSamples: 0,
		dateCreated: "--/--/--",
		startDate: "--/--/--",
		endDate: "--/--/--",
		frcTarget: 0,
		maxDuration: 0,
		tsFrc: 0,
		hhSafety: 0,
		eo: { reco: { real: 0, imag: 0 } },
		ann: { average_time: 3600 },
		safety_range: [0, 1],
		safe_percent: 99.99,
	};
	const [dataset, setDataset] = useState();
	const [locationData, setLocationData] = useState({
		fieldsiteName: "",
		areaName: "",
		countryName: "",
	});
	const dispatch = useDispatch();
	const isLoading = useSelector(notificationsSelectors.loading);

	const handleReanalysis = () => {
		dispatch(setLoading(true));
		fetch(`/api/results/analyze-single?datasetId=${datasetId}`)
			.then((res) => res.text())
			.then((data) => dispatch(addNotice(data)))
			.catch((err) => dispatch(addError(err)))
			.finally(() => {
				dispatch(setLoading(false));
			});
	};

	useEffect(() => {
		dispatch(setLoading(true));
		axios
			.get(`/api/datasets/${datasetId}`)
			.then(({ data }) => {
				setDataset(data.dataset);
				setLocationData(data.locationData);
				const { countryName, areaName, fieldsiteName } =
					data.locationData;
				const searchParams = new URLSearchParams();
				searchParams.append("country", countryName);
				const countryParams = searchParams.toString();
				searchParams.append("area", areaName);
				const areaParams = searchParams.toString();
				searchParams.append("fieldsite", fieldsiteName);
				const fieldsiteParams = searchParams.toString();
				dispatch(
					replaceCrumb([
						{
							path: `/results#${countryParams}`,
							title: countryName,
						},
						{ path: `/results#${areaParams}`, title: areaName },
						{
							path: `/results#${fieldsiteParams}`,
							title: fieldsiteName,
						},
						{
							path: "#",
							title: parseDate(data.dataset?.dateCreated),
						},
					])
				);
			})
			.catch(() => {
				setDataset();
			})
			.finally(() => {
				dispatch(setLoading(false));
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

	const formattedHoursFromSeconds = (seconds) => {
		if (!seconds) {
			return "?";
		}
		const hours = ~~(seconds / 3600);
		const minutes = ~~((seconds % 3600) / 60);
		return `${hours}:${minutes}`;
	};

	const reco =
		(dataset || defaultDataset).eo?.reco?.real?.toFixed(2) ||
		(dataset || defaultDataset).eo?.reco?.toFixed(2) ||
		0;

	const storageTimeInHours = formattedHoursFromSeconds(
		(dataset || defaultDataset).ann?.["average_time"]
	);

	const getPredictedWaterSafetyRange = () => {
		const safetyRange = (dataset || defaultDataset)["safety_range"];
		if (!safetyRange) {
			return "?";
		}

		const [lo, hi] = safetyRange.map((n) => n?.toFixed(0));
		return `${lo}% - ${hi}%`;
	};

	const parseDate = (date) => date?.slice(0, 10) || String.fromCharCode(8734);

	// Custom Elements
	const Type = Typography; // extends Typography Component

	return !dataset && !isLoading ? (
		<NotFound />
	) : (
		<>
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
							{parseDate((dataset || defaultDataset).dateCreated)}
						</Type>
						<Type variant="inputLabel">Date of Analysis</Type>
					</Box>

					<Divider sx={{ ...css.stat.divider }} />

					<Box sx={{ ...css.stat }}>
						<Box sx={{ ...css.stat.range }}>
							<Type variant="inputValue">
								{parseDate(
									(dataset || defaultDataset).startDate
								)}{" "}
							</Type>
							<Type
								component="span"
								sx={{ ...css.stat.range.seperator }}
							>
								to
							</Type>
							<Type variant="inputValue">
								{parseDate((dataset || defaultDataset).endDate)}
							</Type>
						</Box>
						<Type variant="inputLabel">
							Date Range of Analysis Requested
						</Type>
					</Box>

					<Divider sx={{ ...css.stat.divider }} />

					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{(dataset || defaultDataset).maxDuration} hrs
						</Type>
						<Type variant="inputLabel">
							Length of storage time to analyse for
						</Type>
					</Box>

					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{parseDecayScenario(
								(dataset || defaultDataset).confidenceLevel
							)}
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
								{parseDate(
									(dataset || defaultDataset).firstSample
								)}
							</Type>
							<Type
								component="span"
								sx={{ ...css.stat.range.seperator }}
							>
								to
							</Type>
							<Type variant="inputValue">
								{parseDate(
									(dataset || defaultDataset).lastSample
								)}
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
								<span>
									<IconQuestionMark />
								</span>
							</Tooltip>
						</Type>
					</Box>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{(dataset || defaultDataset)[
								"safe_percent"
							]?.toFixed(0) || "?"}
							%
						</Type>
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
								<span>
									<IconQuestionMark />
								</span>
							</Tooltip>
						</Type>
					</Box>
					<Divider sx={{ ...css.stat.divider }} />
					<Box
						sx={{ ...css.stat }}
						className={
							(dataset || defaultDataset).nSamples < 100
								? "low"
								: "pass"
						}
					>
						<Type variant="inputValue">
							{(dataset || defaultDataset).nSamples}
							{/* if total samples are less than 100 */}
							{(dataset || defaultDataset).nSamples < 100 ? (
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
								<span>
									<IconQuestionMark />
								</span>
							</Tooltip>
						</Type>
					</Box>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{storageTimeInHours} hrs
						</Type>
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
						<Type variant="inputValue">{reco} mg/l</Type>
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
								<span>
									<IconQuestionMark />
								</span>
							</Tooltip>
						</Type>
					</Box>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{(dataset || defaultDataset).maxDuration} hrs
						</Type>
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
								<span>
									<IconQuestionMark />
								</span>
							</Tooltip>
						</Type>
					</Box>
					<Box sx={{ ...css.stat }}>
						<Type variant="inputValue">
							{getPredictedWaterSafetyRange()}
						</Type>
						<Type variant="inputLabel">
							Predicted household water safety at this storage
							time
							<Tooltip
								title="Predicted HH safety rate when the FRC target
									is implemented"
								arrow
								placement="top"
							>
								<span>
									<IconQuestionMark />
								</span>
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

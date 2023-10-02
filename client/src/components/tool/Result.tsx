import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";

import useLocationSuffix from "../../hooks/useLocationSuffix";
import {
	notificationsSelectors,
	setLoading,
} from "../../reducers/notifications";
import { replaceCrumb } from "../../reducers/view";
import { Result as css } from "../../styles/styles";
import { ConfidenceLevelType } from "../../types";
import NotFound from "../NotFound";
import TargetsFigure from "../figures/TargetsFigure";
import { IconCheck, IconLow, IconQuestionMark } from "../icons";
import DecayFigure from "../figures/DecayFigure";

export default function Result() {
	const locationSuffix = useLocationSuffix();

	const navigate = useNavigate();
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
		eo: { reco: 0 },
		ann: { average_time: 3600 },
		safety_range: [0, 1],
		safe_percent: 99.99,
		confidenceLevel: "optimumDecay" as ConfidenceLevelType,
		firstSample: "--/--/--",
		lastSample: "--/--/--",
	};
	const [dataset, setDataset] = useState<typeof defaultDataset>();
	const [targetFigureJson, setTargetFigureJson] = useState<
		Array<any> | undefined
	>(undefined);
	const [decayFigureJson, setDecayFigureJson] = useState<
		Array<any> | undefined
	>(undefined);
	const [locationData, setLocationData] = useState({
		fieldsiteName: "",
		areaName: "",
		countryName: "",
	});
	const dispatch = useDispatch();
	const isLoading = useSelector(notificationsSelectors.loading);

	function dateStringToUTC(date: string | undefined) {
		if (!date) {
			return null;
		}
		const localDate = new Date(date);
		return new Date(
			localDate.getUTCFullYear(),
			localDate.getUTCMonth(),
			localDate.getUTCDate()
		);
	}

	const handleReanalysis = () => {
		navigate(`/analyze#${locationSuffix}`, {
			state: {
				duration: dataset?.maxDuration,
				confidence: dataset?.confidenceLevel,
				startDate: dateStringToUTC(dataset?.startDate),
				endDate: dateStringToUTC(dataset?.endDate),
			},
		});
	};

	useEffect(() => {
		dispatch(setLoading(true));
		axios
			.get(`/api/datasets/${datasetId}`)
			.then(({ data }) => {
				setDataset(data.dataset);
				setLocationData(data.locationData);
				setTargetFigureJson(data.targetFigureJson);
				setDecayFigureJson(data.decayFigureJson);
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
				setDataset(undefined);
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}, [datasetId, dispatch]);

	const parseDecayScenario = (scenarioKey: ConfidenceLevelType) => {
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

	const formattedHoursFromSeconds = (seconds: number) => {
		if (!seconds) {
			return "?";
		}
		const hours = ~~(seconds / 3600);
		const minutes = (~~((seconds % 3600) / 60)).toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	const recoValue = (dataset || defaultDataset).eo?.reco ?? 0;
	const reco = recoValue.toFixed(1);

	const recoInRange = recoValue >= 0.2 && recoValue <= 2;

	const frcRecommendation = recoInRange ? `${reco} mg/l` : "Out of range";

	const storageTimeInHours = formattedHoursFromSeconds(
		(dataset || defaultDataset).ann?.["average_time"]
	);

	const safetyRange = (dataset || defaultDataset)["safety_range"];
	const getPredictedWaterSafetyRange = () => {
		if (!safetyRange || !recoInRange) {
			return "N/A";
		}

		const [lo, hi] = safetyRange.map((n) => n?.toFixed(0));
		return `${lo}% - ${hi}%`;
	};

	const parseDate = (date: string) =>
		date?.slice(0, 10) || String.fromCharCode(8734);

	return !dataset && !isLoading ? (
		<NotFound />
	) : (
		<>
			<section>
				<div className="section-wrap">
					<Box className="app-card">
						<Box component={"h2"}>Analysis Location</Box>
						<Divider sx={{ my: 1 }} />
						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{locationData.countryName}
							</Typography>
							<Typography variant="inputLabel">
								Country
							</Typography>
						</Box>

						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{locationData.areaName}
							</Typography>
							<Typography variant="inputLabel">Area</Typography>
						</Box>

						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{locationData.fieldsiteName}
							</Typography>
							<Typography variant="inputLabel">
								Fieldsite
							</Typography>
						</Box>
					</Box>
					<Box id="result-analysis-requested" className="app-card">
						<Box component={"h2"}>Analysis Requested</Box>
						<Divider sx={{ my: 1 }} />
						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{parseDate(
									(dataset || defaultDataset).dateCreated
								)}
							</Typography>
							<Typography variant="inputLabel">
								Date of analysis
							</Typography>
						</Box>

						<Divider sx={{ ...css.stat.divider }} />

						<Box sx={{ ...css.stat }}>
							<Box sx={{ ...css.stat.range }}>
								<Typography variant="inputValue">
									{parseDate(
										(dataset || defaultDataset).startDate
									)}{" "}
								</Typography>
								<Typography
									component="span"
									sx={{ ...css.stat.range.seperator }}
								>
									to
								</Typography>
								<Typography variant="inputValue">
									{parseDate(
										(dataset || defaultDataset).endDate
									)}
								</Typography>
							</Box>
							<Typography variant="inputLabel">
								Date Range of Analysis Requested
							</Typography>
						</Box>

						<Divider sx={{ ...css.stat.divider }} />

						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{(dataset || defaultDataset).maxDuration} hrs
							</Typography>
							<Typography variant="inputLabel">
								Length of storage time to analyse for
							</Typography>
						</Box>

						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{parseDecayScenario(
									(dataset || defaultDataset).confidenceLevel
								)}
							</Typography>
							<Typography variant="inputLabel">
								Decay scenario
							</Typography>
						</Box>
					</Box>
					{/* <Divider sx={{ ...css.hr }} /> */}
					<Box id="result-dataset-summary" className="app-card">
						<Box component={"h2"}>Dataset Summary</Box>
						<Divider sx={{ my: 1 }} />
						<Box sx={{ ...css.stat }}>
							<Box sx={{ ...css.stat.range }}>
								<Typography variant="inputValue">
									{parseDate(
										(dataset || defaultDataset).firstSample
									)}
								</Typography>
								<Typography
									component="span"
									sx={{ ...css.stat.range.seperator }}
								>
									to
								</Typography>
								<Typography variant="inputValue">
									{parseDate(
										(dataset || defaultDataset).lastSample
									)}
								</Typography>
							</Box>
							<Typography variant="inputLabel">
								Date Range Analyzed{" "}
								<Tooltip
									title={
										<>
											Date of the oldest and most recent
											samples sent for analysis. This
											range may be shorter than the
											specified date range as any invalid
											rows are removed before being sent
											for analysis.
											<hr />
											<a
												href="/contact"
												className="btn compact"
											>
												learn more
											</a>
										</>
									}
									arrow
									placement="top"
									leaveDelay={500}
									enterDelay={300}
									leaveTouchDelay={500}
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Typography>
						</Box>
						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{(dataset || defaultDataset)[
									"safe_percent"
								]?.toFixed(0) || "?"}
								%
							</Typography>
							<Typography variant="inputLabel">
								Current household water safety
								<Tooltip
									title={
										<>
											Percentage of household samples in
											the analyzed dataset with a
											protective free chlorine residual
											(0.2 mg/L)
											<hr />
											<a
												href="/contact"
												className="btn compact"
											>
												learn more
											</a>
										</>
									}
									arrow
									placement="top"
									leaveDelay={500}
									enterDelay={300}
									leaveTouchDelay={500}
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Typography>
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
							<Typography variant="inputValue">
								{(dataset || defaultDataset).nSamples}
								{/* check sample range */}
								{(dataset || defaultDataset).nSamples < 100 && (
									<IconLow className="icon-sup icon-low" />
								)}
								{(dataset || defaultDataset).nSamples >=
									100 && (
									<IconCheck className="icon-sup icon-pass" />
								)}
							</Typography>

							<Typography variant="inputLabel">
								Number of Data Samples Sent for Analysis
								<Tooltip
									title={
										<>
											Total number of valid paired samples
											found in the date range. If this
											number is not what you expected, you
											should check your dataset for errors
											<hr />
											<a
												href="/contact"
												className="btn compact"
											>
												learn more
											</a>
										</>
									}
									arrow
									placement="top"
									leaveDelay={500}
									enterDelay={300}
									leaveTouchDelay={500}
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Typography>
						</Box>
						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{storageTimeInHours} hrs
							</Typography>
							<Typography variant="inputLabel">
								Average storage time in dataset
								<Tooltip
									title={
										<>
											Mean elapsed time between each
											tapstand and household sample in the
											analyzed dataset.
											<hr />
											<a
												href="/contact"
												className="btn compact"
											>
												learn more
											</a>
										</>
									}
									arrow
									placement="top"
									leaveDelay={500}
									enterDelay={300}
									leaveTouchDelay={500}
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Typography>
						</Box>
					</Box>
					<Box id="result-frc-target" className="app-card">
						<Box component={"h2"}>SWOT FRC Target</Box>
						<Divider sx={{ my: 1 }} />
						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{frcRecommendation}
							</Typography>
							<Typography variant="inputLabel">
								SWOT FRC Target Recommendation
								<Tooltip
									title={
										<>
											Aim for at least this FRC
											concentration at the tapstand
											<hr />
											<a
												href="/contact"
												className="btn compact"
											>
												learn more
											</a>
										</>
									}
									arrow
									placement="top"
									leaveDelay={500}
									enterDelay={300}
									leaveTouchDelay={500}
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Typography>
						</Box>
						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{(dataset || defaultDataset).maxDuration} hrs
							</Typography>
							<Typography variant="inputLabel">
								Duration of protection
								<Tooltip
									title={
										<>
											The predicted amount of time that
											water will remain protected after
											collection, if the FRC target
											recommendation is achieved. For a
											different storage time, re-run the
											analysis.
											<hr />
											<a
												href="/contact"
												className="btn compact"
											>
												learn more
											</a>
										</>
									}
									arrow
									placement="top"
									leaveDelay={500}
									enterDelay={300}
									leaveTouchDelay={500}
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Typography>
						</Box>
						<Box sx={{ ...css.stat }}>
							<Typography variant="inputValue">
								{getPredictedWaterSafetyRange()}
							</Typography>
							<Typography variant="inputLabel">
								Predicted household water safety at this storage
								time
								<Tooltip
									title={
										<>
											The predicted percentage of
											households that would have a
											protective free chlorine residual at
											the given storage time if the FRC
											target recommendation is achieved.
											<hr />
											<a
												href="/contact"
												className="btn compact"
											>
												learn more
											</a>
										</>
									}
									arrow
									placement="top"
									leaveDelay={500}
									enterDelay={300}
									leaveTouchDelay={500}
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Typography>
						</Box>
					</Box>
					<Box className="app-card">
						<Box component={"h2"}>FRC Target Over Time</Box>
						<Divider sx={{ my: 1 }} />
						{targetFigureJson && (
							<TargetsFigure chartData={targetFigureJson} />
						)}
					</Box>
					<Box className="app-card">
						<Box component={"h2"}>FRC Decay Over Time</Box>
						<Divider sx={{ my: 1 }} />
						{decayFigureJson && (
							<DecayFigure chartData={decayFigureJson} />
						)}
					</Box>
					<Divider sx={{ ...css.hr }} />
					<Box className="app-card">
						<Box className="form-submit">
							<Button
								id="btnSubmit"
								className="btn"
								href={`/api/results/download?datasetId=${datasetId}`}
								disableRipple={true}
							>
								<Box component="span">Download Raw Results</Box>
							</Button>
							<button onClick={handleReanalysis}>
								Reanalyze
							</button>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

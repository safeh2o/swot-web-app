import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	addError,
	addNotice,
	notificationsSelectors,
	setLoading,
} from "../../reducers/notifications";
import { replaceCrumb } from "../../reducers/view";
import { Result as css } from "../../styles/styles";
import { IconCheck, IconLow, IconQuestionMark } from "../icons";
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
	const [targetImgUrl, setTargetImgUrl] = useState("");
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
				setTargetImgUrl(data.targetImgUrl);
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
	}, [datasetId, dispatch]);

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
		const minutes = (~~((seconds % 3600) / 60)).toString().padStart(2, 0);
		return `${hours}:${minutes}`;
	};

	const reco =
		(dataset || defaultDataset).eo?.reco?.real?.toFixed(1) ||
		(dataset || defaultDataset).eo?.reco?.toFixed(1) ||
		0;

	const recoInRange = reco >= 0.2 && reco <= 2;

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

	const parseDate = (date) => date?.slice(0, 10) || String.fromCharCode(8734);

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
								Date of Analysis
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
								Modelling confidence level
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
									<IconLow className="sup" />
								)}
								{(dataset || defaultDataset).nSamples >=
									100 && <IconCheck className="sup" />}
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
					<Box id="result-frc-target" className="app-card">
						<Box component={"h2"}>FRC Target Over Time</Box>
						<Divider sx={{ my: 1 }} />
						<Box component={"figure"}>
							<img
								src={
									targetImgUrl ||
									"https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
								}
								alt="graph of frg target over time"
							/>
						</Box>
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

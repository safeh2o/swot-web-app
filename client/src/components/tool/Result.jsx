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
		const minutes = (~~((seconds % 3600) / 60)).toString().padStart(2, 0);
		return `${hours}:${minutes}`;
	};

	const reco =
		(dataset || defaultDataset).eo?.reco?.real?.toFixed(1) ||
		(dataset || defaultDataset).eo?.reco?.toFixed(1) ||
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
			<section>
				<div className="section-wrap">
					<Box className="app-card">
						<Box component={"h2"}>Analysis Location</Box>
						<Divider sx={{ my: 1 }} />
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
					</Box>
					<Box id="result-analysis-requested" className="app-card">
						<Box component={"h2"}>Analysis Requested</Box>
						<Divider sx={{ my: 1 }} />
						<Box sx={{ ...css.stat }}>
							<Type variant="inputValue">
								{parseDate(
									(dataset || defaultDataset).dateCreated
								)}
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
									{parseDate(
										(dataset || defaultDataset).endDate
									)}
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
					</Box>
					<Divider sx={{ ...css.hr }} />
					<Box id="result-dataset-summary" className="app-card">
						<Box component={"h2"}>Dataset Summary</Box>
						<Divider sx={{ my: 1 }} />
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
									leaveDelay="350"
									leaveTouchDelay="750"
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
									leaveDelay="350"
									leaveTouchDelay="750"
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
							{(dataset || defaultDataset).nSamples < 0 && (
								<Type variant="inputValue">
									{(dataset || defaultDataset).nSamples}
									{/* check sample range */}
									{(dataset || defaultDataset).nSamples <
										100 && <IconLow className="sup" />}
									{(dataset || defaultDataset).nSamples <
										100 && <IconCheck className="sup" />}
								</Type>
							)}
							<Type variant="inputLabel">
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
									leaveDelay="350"
									leaveTouchDelay="750"
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
									leaveDelay="350"
									leaveTouchDelay="750"
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Type>
						</Box>
					</Box>
					<Box id="result-frc-target" className="app-card">
						<Box component={"h2"}>SWOT FRC Target</Box>
						<Divider sx={{ my: 1 }} />
						<Box sx={{ ...css.stat }}>
							<Type variant="inputValue">{reco} mg/l</Type>
							<Type variant="inputLabel">
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
									leaveDelay="350"
									leaveTouchDelay="750"
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
											Duration of protection associated
											with the FRC target above. For a
											longer or shorter storage time, a
											new analysis should be run.
										</>
									}
									arrow
									placement="top"
									leaveDelay="350"
									leaveTouchDelay="750"
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
									leaveDelay="350"
									leaveTouchDelay="750"
								>
									<span>
										<IconQuestionMark />
									</span>
								</Tooltip>
							</Type>
						</Box>
					</Box>
					<Box id="result-frc-target" className="app-card">
						<Box component={"h2"}>FRC Target Over Time</Box>
						<Divider sx={{ my: 1 }} />
						<Box component={"figure"}>
							<img src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" />
							<Box component={"figurecaption"}>
								Figure Caption
							</Box>
						</Box>
					</Box>
					<Divider sx={{ ...css.hr }} />
					<Box className="app-card">
						<Box className="form-submit">
							<Button
								id="btnSubmit"
								className="btn"
								href={`/api/results/download?datasetId=${datasetId}`}
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

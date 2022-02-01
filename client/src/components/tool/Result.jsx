import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GuideLine from "../elements/GuideLine";
import useBlob from "../../hooks/useBlob";
import { useDispatch, useSelector } from "react-redux";
import { settingsSelectors } from "../../reducers/settings";
import { pushView } from "../../reducers/view";
import { addError, addNotice, setLoading } from "../../reducers/notifications";

// START Frontend Imports
import { Card } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
// END Frontend Imports

export default function Result(props) {
	const { AZURE_STORAGE_ACCOUNT } = useSelector(settingsSelectors.settings);
	const { datasetId } = useParams();
	const defaultDataset = {
		nSamples: 0,
		validSamples: 0,
		dateCreated: "N/A",
		startDate: "N/A",
		endDate: "N/A",
		frcTarget: 0,
		maxDuration: 0,
		tsFrc: 0,
		hhSafety: 0,
		eo: { reco: 0 },
	};
	const [dataset, setDataset] = useState(defaultDataset);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: datasetId, path: `/results/${datasetId}` }));
	}, []);

	// const blobs = useBlob(
	// 	{
	// 		annHtml: { path: `${datasetId}/${datasetId}.html` },
	// 		frcImg: { path: `${datasetId}/${datasetId}-frc.jpg` },
	// 		annResults: { path: `${datasetId}/${datasetId}.csv` },
	// 		annChart: { path: `${datasetId}/${datasetId}.png` },
	// 		eoBackcheck: {
	// 			path: `${datasetId}/${datasetId}_Backcheck.png`,
	// 		},
	// 		eoContour: {
	// 			path: `${datasetId}/${datasetId}_Contour.png`,
	// 		},
	// 		eoHistogram: {
	// 			path: `${datasetId}/${datasetId}_Histogram.png`,
	// 		},
	// 		eoResults: {
	// 			path: `${datasetId}/${datasetId}_Results.xlsx`,
	// 		},
	// 		eoRuleset: {
	// 			path: `${datasetId}/${datasetId}_Ruleset.csv`,
	// 		},
	// 		eoSkippedRows: {
	// 			path: `${datasetId}/${datasetId}_SkippedRows.csv`,
	// 		},
	// 	},
	// 	datasetId
	// );

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
		fetch(`/api/datasets/${datasetId}`)
			.then((res) => res.json())
			.then((json) => {
				setDataset(json.dataset[0]);
			})
			.catch(() => {
				setDataset(defaultDataset);
			});
	}, [datasetId]);

	return (
		<>
			{/* <div>
				<h1>Results:</h1>
				{blobs.frcImg && AZURE_STORAGE_ACCOUNT && (
					<img
						src={`https://${AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/results/${blobs.frcImg.path}${blobs.frcImg.sasToken}`}
					/>
				)}
			</div> */}
			<div>
				{/* <h4>Coming soon...</h4> */}
				<Link
					component="button"
					startIcon={<ArrowBackRoundedIcon />}
					href={`/results`}
					size="large"
					sx={{ p: 2 }}
				>
					Back to All Results
				</Link>

				{/* Location */}
				<Card id="result-location">
					<CardHeader
						avatar={<LocationOnRoundedIcon />}
						title="Location"
					/>
					<Divider />
					<CardContent>
						<Grid>
							<Grid item xs={6} md={3}>
								<Paper>
									<Typography variant="h4" component="div">
										Nigeria
									</Typography>
									<Typography variant="span">
										Response
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={6} md={3}>
								<Paper>
									<Typography variant="h4" component="div">
										Maiduguri
									</Typography>
									<Typography variant="span">Area</Typography>
								</Paper>
							</Grid>
							<Grid item xs={12} md={3}>
								<Paper>
									<Typography variant="h4" component="div">
										NE Maiduguri A1
									</Typography>
									<Typography variant="span">Site</Typography>
								</Paper>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Analysis Requested */}
				<Card id="result-analysis-requested">
					<CardHeader title="Analysis Requested" />
					<Divider />
					<CardContent>
						<Grid>
							<Grid item xs={5}>
								<Paper>
									<Typography variant="h4" component="div">
										{dataset?.dateCreated?.substr(0, 10)}
									</Typography>
									<Typography variant="span">
										Date of Analysis
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={7}>
								<Paper>
									<Typography variant="h4" component="div">
										{dataset?.startDate?.substr(0, 10) ||
											String.fromCharCode(8734)}{" "}
										to {dataset?.endDate?.substr(0, 10)}
									</Typography>
									<Typography variant="span">
										Date Range
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={5}>
								<Paper>
									<Typography variant="h4" component="div">
										9 hrs
									</Typography>
									<Typography variant="span">
										Length of storage time to analyse for
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={7}>
								<Paper>
									<Typography variant="h4" component="div">
										Maximum Decay Scenario
									</Typography>
									<Typography variant="span">
										Modelling confidence level
									</Typography>
								</Paper>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Dataset Summary */}
				<Card id="result-dataset-summary">
					<CardHeader title="Dataset Summary" />
					<Divider />
					<CardContent>
						<Grid>
							<Grid item xs={12}>
								<Paper>
									<Typography variant="h4" component="div">
										12/12/20 &rsaquo; 27/02/21
									</Typography>
									<Typography variant="span">
										SWOT FRC Target Recommendation
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<GuideLine>
									Date of the earliest sample found, to the
									date of the latest sample found, in the
									dataset that is actually sent for analysis.
								</GuideLine>
							</Grid>
							<Grid item xs={6}>
								<Grid item xs={12}>
									<Paper>
										<Typography
											variant="h4"
											component="div"
										>
											{dataset.nSamples}
										</Typography>
										<Typography variant="span">
											Number of Data Samples Sent for
											Analysis
										</Typography>
									</Paper>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid item xs={12}>
									<Paper>
										<Typography
											variant="h4"
											component="div"
										>
											{dataset.validSamples}
										</Typography>
										<Typography variant="span">
											Number of Valid Samples
										</Typography>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* SWOT FRC Target */}
				<Card id="result-frc-target">
					<CardHeader title="SWOT FRC Target" />
					<Divider />
					<CardContent>
						<Grid>
							<Grid item xs={6}>
								<Paper>
									<Typography variant="h4" component="div">
										{dataset?.eo?.reco?.toFixed(2)} mg/l
									</Typography>
									<Typography variant="span">
										SWOT FRC Target Recommendation
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={6}>
								<Paper>
									<Typography variant="h4" component="div">
										{dataset.maxDuration} hrs
									</Typography>
									<Typography variant="span">
										Duration of protection
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<GuideLine>
									You should aim for this FRC value at the
									tapstand in order to ensure water is safe to
									drink after storing in the home.{" - "}
									<a href="/contact">learn more</a>
								</GuideLine>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Household Water Safety Status */}
				<Card id="result-household-status">
					<CardHeader title="Household Water Safety Status" />
					<Divider />
					<CardContent>
						<Grid>
							<Grid item xs={12} md={6}>
								<Grid item xs={12}>
									<Paper>
										<Typography
											variant="h4"
											component="div"
										>
											{dataset.frcTarget} %
										</Typography>
										<Typography variant="span">
											Current household water safety
										</Typography>
									</Paper>
								</Grid>
								<Grid item xs={12}>
									<GuideLine>
										Count of HH samples &gt;= 0.2 mg/L using
										subset of samples in date range.
									</GuideLine>
								</Grid>
							</Grid>
							<Grid item xs={12} md={6}>
								<Grid item xs={12}>
									<Paper>
										<Typography
											variant="h4"
											component="div"
										>
											{dataset.hhSafety} %
										</Typography>
										<Typography variant="span">
											Predicted household water safety
										</Typography>
									</Paper>
								</Grid>
								<Grid item xs={12}>
									<GuideLine>
										Predicted HH safety rate when the FRC
										target is implemented{" "}
									</GuideLine>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Delivery Status */}
				<Card id="result-delivery-status"></Card>

				{/* Download Options */}
				<Card id="result-files">
					<Link
						component="button"
						href={`/api/results/download?datasetId=${datasetId}`}
					>
						Download Raw Results
					</Link>
					<Button onClick={handleReanalysis}>Reanalyze</Button>
				</Card>

				{/* Next Steps + Guidance */}
				{/* <Box sx={{ flexGrow: 1 }}>
					<Typography variant="h2" gutterBottom component="div">
						What's Next?
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Paper>
								<Typography
									variant="h2"
									gutterBottom
									component="div"
								>
									What's Next?
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={3}>
								<Typography
									variant="h3"
									gutterBottom
									component="div"
								>
									Continue Monitoring your FRC
								</Typography>
								<Typography variant="p">
									Once you have collected 100 more paired
									samples try running another analysis and
									compare the results.
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={3}>
								<Typography
									variant="h3"
									gutterBottom
									component="div"
								>
									Increase Chlorine Dosing
								</Typography>
								<Typography variant="p">
									To achieve 0.9mg/l across all tapstands.
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper elevation={3}>
								<Typography
									variant="h3"
									gutterBottom
									component="div"
								>
									Continue Monitoring your FRC
								</Typography>
								<Typography variant="p">
									Once you have collected 100 more paired
									samples try running another analysis and
									compare the results.
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				</Box> */}
			</div>
		</>
	);
}

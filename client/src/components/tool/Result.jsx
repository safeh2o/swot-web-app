import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import useBlob from "../../hooks/useBlob";
import { settingsSelectors } from "../../reducers/settings";
import { pushView } from "../../reducers/view";
import { addError, addNotice, setLoading } from "../../reducers/notifications";

import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import { Grid, Box, Paper } from "@mui/material";
import { Button, SvgIcon } from "@mui/material";
import { Typography } from "@mui/material";
import NotificationLine from "../elements/NotificationLine";

export default function Result(props) {
	const { AZURE_STORAGE_ACCOUNT } = useSelector(settingsSelectors.settings);
	const { datasetId } = useParams();
	const defaultDataset = {
		nSamples: 0,
		//
		dateCreated: "N/A",
		startDate: "N/A",
		endDate: "N/A",
		//
		frcTarget: 0,
		maxDuration: 0,
		tsFrc: 0,
		hhSafety: 0,
		//
		eo: {
			reco: 0,
		},
	};

	/*
	 * DUMMY DATASET. DELETE AND UNCOMMENT MOHAMED CODE
	 */
	// const [dataset, setDataset] = useState(defaultDataset);
	const dataset = {
		nSamples: 88,
		validSamples: 75,
		//
		dateCreated: "N/A",
		startDate: "N/A",
		endDate: "N/A",
		//
		frcTarget: 63,
		maxDuration: 3,
		tsFrc: 0,
		hhSafety: 33,
		//
		eo: {
			reco: 0.928374537,
		},
	};
	/*
	 * END DUMMY DATASET DATA
	 */

	// Custom Elements
	const Type = Typography; // extends Typography Component

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

	// Styles
	const css = {
		buttonBackToResults: {
			wrapper: {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				backgroundColor: "#161819",
				color: "#fcfcfc",
				p: 2,
				mb: 4,
				hover: {
					backgroundColor: "#161819",
				},
			},
			icon: {
				flex: "1 0 1.3em",
				maxWidth: "1.3em",
				maxHeight: "1.3em",
			},
			text: {
				fontSize: "1rem",
				lineHeight: 1,
				textTransform: "capitalize",
				paddingLeft: "10px",
			},
		},
		cardElement: {
			marginBottom: "30px",
			content: {
				p: 2,
				"&:last-child": {
					p: 2,
				},
			},
		},
		titleTypographyProps: {
			fontSize: "1rem",
			pt: "3px",
			pb: "3px",
		},
		stat: {
			wrapper: {
				borderLeft: "1.5px solid #dde6ed",
				padding: "0 20px 20px 10px",
				margin: 0,
			},
			value: {
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
				mb: 1,
			},
			label: {
				fontWeight: 500,
				paddingRight: "20px",
			},
			unit: {
				fontSize: "2rem",
				opacity: 0.8,
				marginLeft: "5px",
			},
			icon: {
				marginLeft: "5px",
				"& > svg": {
					width: ".75em",
					height: ".75em",
				},
			},
			wrong: {
				color: "#fc9170",
			},
			correct: {
				color: "#34d379",
			},
		},
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
			mb: 6,
			container: {
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "center",
			},
		},
		nextStep: {
			header: {
				fontSize: "2rem",
				fontWeight: "500",
				mt: 6,
				mb: 4,
			},
			stepTitle: {
				fontWeight: "500",
			},
			stepGrid: {},
			stepWrapper: {
				flex: 1,
				p: 2,
				// m: 2,
			},
			stepWrapperContact: {
				flex: 1,
				color: "#fff",
				backgroundColor: "#222",
				p: 2,
			},
			stepWrapperContactIcon: {
				display: "block",
				width: "80%",
				maxWidth: "100px",
				height: "auto",
				margin: "auto",
			},
		},
	};

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
			<Button
				href={`/results`}
				size="large"
				sx={{ ...css.buttonBackToResults.wrapper }}
			>
				<SvgIcon
					viewBox="0 0 32 32"
					sx={{ ...css.buttonBackToResults.icon }}
				>
					<path d="M29.4 17.5h-22l4.2 5.6-2.4 1.8L2.6 16l6.7-8.9 2.4 1.8-4.2 5.6h22v3z" />
				</SvgIcon>
				<Box sx={{ ...css.buttonBackToResults.text }}>
					Back to all Your Results
				</Box>
			</Button>

			{/* Location */}
			<Card
				id="result-location"
				elevation={1}
				sx={{ ...css.cardElement }}
			>
				<CardHeader
					avatar={
						<SvgIcon viewBox="0 0 32 32">
							<path d="M16.3 2c-3.9 0-7.1 3.2-7.1 7.1 0 4.8 3.9 6.4 5.9 6.9v13.9l2.6-2.9V16c2-.5 5.7-2.1 5.7-6.9 0-4-3.2-7.1-7.1-7.1zm1.2 5.4c-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6.8.1 1.5.8 1.5 1.6 0 .9-.7 1.6-1.5 1.6z" />
						</SvgIcon>
					}
					title="Location"
					titleTypographyProps={{ variant: "body1" }}
				/>

				<Divider />

				<CardContent sx={{ ...css.cardElement.content }}>
					<Grid container spacing={2}>
						<Grid item>
							<Box mx={{ ...css.stat.wrapper }}>
								<Type
									variant="h2"
									component="div"
									mx={{ ...css.stat.value }}
								>
									Nigeria
								</Type>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Response
								</Type>
							</Box>
						</Grid>
						<Grid item>
							<Box mx={{ ...css.stat.wrapper }}>
								<Type
									variant="h2"
									component="div"
									mx={{ ...css.stat.value }}
								>
									Maiduguri
								</Type>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Area
								</Type>
							</Box>
						</Grid>
						<Grid item>
							<Box mx={{ ...css.stat.wrapper }}>
								<Typography
									variant="h2"
									component="div"
									mx={{ ...css.stat.value }}
								>
									NE Maiduguri A1
								</Typography>
								<Typography
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Site
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* Analysis Requested */}
			<Card
				id="result-analysis-requested"
				elevation={1}
				sx={{ ...css.cardElement }}
			>
				<CardHeader
					title="Analysis Requested"
					titleTypographyProps={{ ...css.titleTypographyProps }}
				/>

				<Divider />

				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Box mx={{ ...css.stat.wrapper }}>
								<Type
									variant="h2"
									component="div"
									mx={{ ...css.stat.value }}
								>
									{dataset?.dateCreated?.substr(0, 10)}
								</Type>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Date of Analysis
								</Type>
							</Box>
						</Grid>
						<Grid item xs={12} md={8}>
							<Box mx={{ ...css.stat.wrapper }}>
								<Type
									variant="h2"
									component="div"
									mx={{ ...css.stat.value }}
								>
									{dataset?.startDate?.substr(0, 10) ||
										String.fromCharCode(8734)}
									&nbsp; &rarr; &nbsp;
									{dataset?.endDate?.substr(0, 10)}
								</Type>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Date Range
								</Type>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box mx={{ ...css.stat.wrapper }}>
								<Box>
									<Type
										variant="h2"
										component="span"
										mx={{ ...css.stat.value }}
									>
										9
									</Type>
									<Type
										component="span"
										mx={{ ...css.stat.unit }}
									>
										hrs
									</Type>
								</Box>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Length of storage time to Analyze for
								</Type>
							</Box>
						</Grid>
						<Grid item xs={12} md={8}>
							<Box mx={{ ...css.stat.wrapper }}>
								<Type
									variant="h2"
									component="div"
									mx={{ ...css.stat.value }}
								>
									Maximum Decay Scenario
								</Type>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Modelling Confidence Level
								</Type>
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* Dataset Summary */}
			<Card
				id="result-dataset-summary"
				elevation={1}
				sx={{ ...css.cardElement }}
			>
				<CardHeader
					title="Dataset Summary"
					titleTypographyProps={{ ...css.titleTypographyProps }}
				/>
				<Divider />
				<CardContent>
					<Grid container>
						<Grid item xs={12}>
							<Box mx={{ ...css.stat.wrapper }}>
								<Type
									variant="h2"
									component="div"
									mx={{ ...css.stat.value }}
								>
									06/01/21 &nbsp;&rarr;&nbsp; 15/02/21
								</Type>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Date Range Analyzed
								</Type>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<NotificationLine type="guide">
								Date of the earliest sample found, to the date
								of the latest sample found, in the dataset that
								is actually sent for analysis.
							</NotificationLine>
						</Grid>
						<Grid item xs={6}>
							<Grid item xs={12}>
								<Box mx={{ ...css.stat.wrapper }}>
									<Box>
										<Type
											variant="h2"
											component="span"
											mx={{ ...css.stat.value }}
										>
											{dataset.nSamples}
										</Type>
										{dataset.nSamples < 100 ? (
											<Box
												component="span"
												mx={{
													...css.stat.icon,
													...css.stat.wrong,
												}}
											>
												<SvgIcon viewBox="0 0 32 32">
													<path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M17.4,23h-2.8v-2.8h2.8V23z M17.4,17.4h-2.8V9h2.8V17.4z" />
												</SvgIcon>
											</Box>
										) : (
											<Box
												component="span"
												mx={{
													...css.stat.icon,
													...css.stat.correct,
												}}
											>
												<SvgIcon viewBox="0 0 32 32">
													<path d="M16 2.9C8.8 2.9 2.9 8.8 2.9 16S8.8 29.1 16 29.1 29.1 23.2 29.1 16 23.2 2.9 16 2.9zm-2.2 18.5-5.3-5.3L9.7 15l4.1 4 8.5-8.5 1.2 1.2-9.7 9.7z" />
												</SvgIcon>
											</Box>
										)}
									</Box>
									{/* if total samples are less than 100 */}
									<Type
										variant="caption"
										mx={{ ...css.stat.label }}
									>
										Number of Data Samples Sent for Analysis
									</Type>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<NotificationLine type="guide">
									This is total number of the data records
									found for that date range.
								</NotificationLine>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Grid item xs={12}>
								<Box mx={{ ...css.stat.wrapper }}>
									<Box>
										<Type
											variant="h2"
											component="span"
											mx={{ ...css.stat.value }}
										>
											{dataset.validSamples}
										</Type>
										{dataset.validSamples < 100 ? (
											<Box
												component="span"
												mx={{
													...css.stat.icon,
													...css.stat.wrong,
												}}
											>
												<SvgIcon viewBox="0 0 32 32">
													<path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M17.4,23h-2.8v-2.8h2.8V23z M17.4,17.4h-2.8V9h2.8V17.4z" />
												</SvgIcon>
											</Box>
										) : (
											<Box
												component="span"
												mx={{
													...css.stat.icon,
													...css.stat.correct,
												}}
											>
												<SvgIcon viewBox="0 0 32 32">
													<path d="M16 2.9C8.8 2.9 2.9 8.8 2.9 16S8.8 29.1 16 29.1 29.1 23.2 29.1 16 23.2 2.9 16 2.9zm-2.2 18.5-5.3-5.3L9.7 15l4.1 4 8.5-8.5 1.2 1.2-9.7 9.7z" />
												</SvgIcon>
											</Box>
										)}
									</Box>
									<Type
										variant="caption"
										mx={{ ...css.stat.label }}
									>
										Number of Valid Samples
									</Type>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<NotificationLine type="guide">
									The number of data records that passed
									cleaning/validation steps and ultimately
									went to analysis.
								</NotificationLine>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* SWOT FRC Target */}
			<Card
				id="result-frc-target"
				elevation={1}
				sx={{ ...css.cardElement }}
			>
				<CardHeader
					title="SWOT FRC Target"
					titleTypographyProps={{ ...css.titleTypographyProps }}
				/>

				<Divider />

				<CardContent>
					<Grid container>
						<Grid item xs={6}>
							<Box mx={{ ...css.stat.wrapper }}>
								<Box>
									<Type
										variant="h2"
										component="span"
										mx={{ ...css.stat.value }}
									>
										{dataset?.eo?.reco?.toFixed(2)}
									</Type>
									<Type
										component="span"
										mx={{ ...css.stat.unit }}
									>
										mg/l
									</Type>
								</Box>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									SWOT FRC Target Recommendation
								</Type>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box mx={{ ...css.stat.wrapper }}>
								<Box>
									<Type
										variant="h2"
										component="span"
										mx={{ ...css.stat.value }}
									>
										{dataset.maxDuration}
									</Type>
									<Type
										component="span"
										mx={{ ...css.stat.unit }}
									>
										hrs
									</Type>
								</Box>
								<Type
									variant="caption"
									mx={{ ...css.stat.label }}
								>
									Duration of protection
								</Type>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<NotificationLine type="guide">
								You should aim for this FRC value at the
								tapstand in order to ensure water is safe to
								drink after storing in the home.{" - "}
								<a href="/contact">learn more</a>
							</NotificationLine>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* Household Water Safety Status */}
			<Card
				id="result-household-status"
				elevation={1}
				sx={{ ...css.cardElement }}
			>
				<CardHeader
					title="Household Water Safety Status"
					titleTypographyProps={{ ...css.titleTypographyProps }}
				/>

				<Divider />

				<CardContent>
					<Grid container>
						<Grid item xs={12} md={6}>
							<Grid item xs={12}>
								<Box mx={{ ...css.stat.wrapper }}>
									<Box>
										<Type
											variant="h2"
											component="span"
											mx={{ ...css.stat.value }}
										>
											{dataset.frcTarget}
										</Type>
										<Type
											variant="span"
											mx={{ ...css.stat.unit }}
										>
											%
										</Type>
									</Box>
									<Type
										variant="caption"
										mx={{ ...css.stat.label }}
									>
										Current household water safety
									</Type>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<NotificationLine type="guide">
									Count of HH samples &gt;= 0.2 mg/L using
									subset of samples in date range.
								</NotificationLine>
							</Grid>
						</Grid>
						<Grid item xs={12} md={6}>
							<Grid item xs={12}>
								<Box mx={{ ...css.stat.wrapper }}>
									<Box>
										<Type
											variant="h2"
											component="span"
											mx={{ ...css.stat.value }}
										>
											{dataset.hhSafety}
										</Type>
										<Type
											variant="span"
											mx={{ ...css.stat.unit }}
										>
											%
										</Type>
									</Box>
									<Type
										variant="caption"
										mx={{ ...css.stat.label }}
									>
										Predicted household water safety
									</Type>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<NotificationLine type="guide">
									Predicted HH safety rate when the FRC target
									is implemented
								</NotificationLine>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			{/* Delivery Status */}
			<Card
				id="result-delivery-status"
				elevation={1}
				sx={{ ...css.cardElement }}
			></Card>

			{/* Download Options */}
			<Box id="result-files" sx={{ ...css.resultFiles }}>
				<Button
					href={`/api/results/download?datasetId=${datasetId}`}
					size="large"
					sx={{ ...css.buttonDownloadReport.wrapper }}
				>
					<SvgIcon
						viewBox="0 0 32 32"
						sx={{ ...css.buttonDownloadReport.icon }}
					>
						<path d="M9.8 14.7c-.4-.4-.5-1-.3-1.5s.7-.8 1.2-.8h3.9V5c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3v7.4h3.9c.5 0 1 .3 1.2.8.2.5.1 1.1-.3 1.5l-5.2 5.2c-.1.1-.3.2-.4.3-.2.1-.3.1-.5.1s-.4 0-.5-.1c-.1-.1-.3-.1-.4-.3l-5.2-5.2zm17.2 3c-.7 0-1.3.6-1.3 1.3v6.7H6.3V19c0-.7-.6-1.3-1.3-1.3s-1.3.6-1.3 1.3v7c0 1.3 1 2.3 2.3 2.3h20c1.3 0 2.3-1 2.3-2.3v-7c0-.7-.6-1.3-1.3-1.3z" />
					</SvgIcon>{" "}
					Download Raw Results{" "}
					<Box
						component="u"
						sx={{
							marginLeft: "15px",
							fontSize: "inherit!important",
						}}
					>
						.pdf
					</Box>
				</Button>

				<Box sx={{ ...css.resultFiles.container }}>
					<Type component="span">or, you can choose to</Type>
					<Button
						onClick={handleReanalysis}
						sx={{ ...css.buttonReanalyzeReport.wrapper }}
						startIcon={
							<SvgIcon
								viewBox="0 0 32 32"
								sx={{ ...css.buttonReanalyzeReport.icon }}
							>
								<path d="M24.5 16.6h-2c-.1 0-.3.1-.4.1-.1.1-.1.2-.1.4 0 1.8-.7 3.4-1.9 4.7-1.3 1.3-2.9 2-4.7 2-1.8 0-3.5-.7-4.7-2-1.3-1.3-1.9-2.9-1.9-4.7 0-3.3 2.4-6.1 5.6-6.6v3.9c0 .2.1.4.3.5.2.1.4 0 .5-.1l5.3-5.3c.1-.1.1-.2.1-.4s-.1-.3-.1-.4l-5.3-5.3c-.1-.1-.4-.2-.5-.1-.2.1-.3.3-.3.5v3.7c-4.8.5-8.5 4.6-8.6 9.6 0 2.6 1 5 2.8 6.8 1.8 1.8 4.2 2.8 6.8 2.8 2.6 0 5-1 6.8-2.8 1.8-1.8 2.8-4.2 2.8-6.8 0-.2-.2-.5-.5-.5z" />
							</SvgIcon>
						}
					>
						Reanalyze
					</Button>
					<Type component="span">this Report</Type>
				</Box>
			</Box>
		</>
	);
}

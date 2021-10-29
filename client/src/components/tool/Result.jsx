import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GuideLine from "../elements/GuideLine";
import useBlob from "../../hooks/useBlob";
import { useDispatch, useSelector } from "react-redux";
import { settingsSelectors } from "../../reducers/settings";
import { pushView } from "../../reducers/view";

export default function Result(props) {
	const { AZURE_STORAGE_ACCOUNT } = useSelector(settingsSelectors.settings);
	const { datasetId } = useParams();
	const defaultDataset = {
		nSamples: 0,
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
				<section className="content-window result-window-stats">
					<header>
						<div className="content-window-title">
							Data Submitted
						</div>
						<div className="section-options"></div>
					</header>
					<section>
						<div className="flex-group">
							<label className="space half-width">
								<div>
									<span className="value stat">
										{dataset.nSamples}
									</span>
									<i></i>
								</div>
								<span className="label">
									Paired Samples Submitted
								</span>
							</label>
							<label className="half-width">
								<div>
									<span className="value stat">
										{dataset.nSamples}
									</span>
									<i></i>
								</div>
								<span className="label">
									Valid Samples Analyzed
								</span>
							</label>
							<label className="space half-width">
								<div>
									<span className="value">
										{dataset.dateCreated.substr(0, 10)}
									</span>
								</div>
								<span className="label">Last Analyzed</span>
							</label>
							<label className="half-width">
								<div>
									<span className="value">
										{dataset?.startDate?.substr(0, 10) ||
											String.fromCharCode(8734)}{" "}
										to {dataset.endDate.substr(0, 10)}
									</span>
								</div>
								<span className="label">Date Range</span>
							</label>
						</div>
					</section>
					<footer>
						<a
							className="button green"
							href={`/api/results/download?datasetId=${datasetId}`}
						>
							<span>Download Raw Results</span>
						</a>
						<a
							className="button yellow"
							href={`/api/results/analyzedataset?datasetId=${datasetId}`}
							target="_blank"
						>
							<span>Reanalyze</span>
						</a>
					</footer>
				</section>

				<section className="content-window result-window-stats">
					<header>
						<div className="content-window-title">FRC Target</div>
						<div className="section-options"></div>
					</header>
					<section>
						<div className="flex-group">
							<label className="space half-width">
								<div>
									<span className="value stat">
										{dataset?.eo?.reco?.toFixed(2)}
									</span>
									<span className="value unit">mg/l</span>
								</div>
								<span className="label">
									FRC at the Tapstand
								</span>
								<hr />
								<GuideLine>
									You should aim for this FRC value at the
									tapstand in order to ensure water is safe to
									drink after storing in the home. -{" "}
									<a href="/contact">learn more</a>
								</GuideLine>
							</label>
							<label className="half-width">
								<div>
									<span className="value stat">
										{dataset.maxDuration}
									</span>
									<span className="value unit">Hours</span>
								</div>
								<span className="label">
									Duration of Household Storage
								</span>
								<hr />
								<GuideLine>
									This is the delay used to calculate the FRC
									target, it should reflect the typical
									maximum amount of time water is being stored
									for - <a href="/contact">learn more</a>
								</GuideLine>
							</label>
						</div>
					</section>
					<footer></footer>
				</section>

				<section className="content-window result-window-stats">
					<header>
						<div className="content-window-title">
							Current water safety status
						</div>
						<div className="section-options"></div>
					</header>
					<section>
						<div className="flex-group">
							<label className="space half-width">
								<div>
									<span className="value stat">
										{dataset.frcTarget}
									</span>
									<span className="value unit">%</span>
								</div>
								<span className="label">Tapstand FRC</span>
								<hr />
								<GuideLine>
									This is the percentage of tapstand FRC
									measurments that met the target
									recommendation -{" "}
									<a href="/contact">learn more</a>
								</GuideLine>
							</label>
							<label className="half-width">
								<div>
									<span className="value stat">
										{dataset.hhSafety}
									</span>
									<span className="value unit">%</span>
								</div>
								<span className="label">
									Household Water Safety
								</span>
								<hr />
								<GuideLine>
									This is the percentage of household FRC
									measurments that met the minimum FRC of
									0.2mg/l - <a href="/contact">learn more</a>
								</GuideLine>
							</label>
						</div>
					</section>
					<footer></footer>
				</section>

				<section className="content-window">
					<header>
						<div className="content-window-title">What's Next?</div>
						<div className="section-options"></div>
					</header>
					<section>
						<ul className="whats-next float txt-center inline">
							<li>
								<div>
									<div className="title txt-500">
										Increase chlorine dosing
									</div>
									<p className="txt-sm">
										To achieve 0.9mg/l across all tapstands.{" "}
										<a href="#">more info</a>
									</p>
								</div>
								<figure>
									<img src="/assets/pages/increase-chlorine-dosage.svg" />
								</figure>
							</li>
							<li>
								<div>
									<div className="title txt-500">
										Continue monitoring FRC
									</div>
									<p className="txt-sm">
										Once you have collected 100 more paired
										samples try running another analysis and
										compare the results.{" "}
										<a href="#">more info</a>
									</p>
								</div>
								<figure>
									<img src="/assets/pages/continue-monitoring-frc.svg" />
								</figure>
							</li>
							<li>
								<div>
									<div className="title txt-500">
										Review guidance
									</div>
									<p className="txt-sm">
										For information on improving safe water
										chain and addressing common problems.{" "}
										<a href="#">more info</a>
									</p>
								</div>
								<figure>
									<img src="/assets/pages/review-guidance.svg" />
								</figure>
							</li>
						</ul>
					</section>
				</section>
			</div>
		</>
	);
}

import React, { Component } from "react";

import NoteLine from "../elements/NoteLine";
import GuideLine from "../elements/GuideLine";

import { Helmet } from "react-helmet";

const object = {
	response: "NG", // ISO code of country
	area: "Area of country",
	fieldsite: "Fieldsite Name",
	"last-analyzed": "Last analysed dataset",
	"paired-samples-submitted": "Number of paired samples submitted",
	"valid-samples-submitted": "Number of valid samples",
	"total-samples-submitted": "Total number of submissions to this Fieldsite",
	"saftey-status-frc-tapstand": "",
	"saftey-status-frc-household": "",
	"frc-target-frc-tapstand": "",
	"saftey-improvements-predicted-improvement": "",
};

class Result extends Component {
	render() {
		return (
			<>
				<Helmet></Helmet>
				<section id="location" className="content-window">
					<header>
						<div className="content-window-title">Location</div>
						<div className="section-options"></div>
					</header>
					<section>
						<div className="flex-group">
							<label className="space">
								<input
									tabIndex="0"
									autoComplete="on"
									type="text"
									value="Maiduguri, Nigeria"
									readOnly
									disabled="disabled"
								/>
								<span className="label">Fieldsite</span>
							</label>
						</div>
					</section>
					<footer>
						<NoteLine
							text={[
								"Cant find your Area or Fieldsite? ... ",
								<a href="/contact">Contact Us</a>,
							]}
						/>
					</footer>
				</section>

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
									<span className="value stat">320</span>
									<i></i>
								</div>
								<span className="label">
									Paired Samples Submitted
								</span>
							</label>
							<label className="half-width">
								<div>
									<span className="value stat">180</span>
									<i></i>
								</div>
								<span className="label">
									Valid Samples Analyzed
								</span>
							</label>
							<label className="space half-width">
								<div>
									<span className="value">27 Feb 2021</span>
								</div>
								<span className="label">Last Analyzed</span>
							</label>
							<label className="half-width">
								<div>
									<span className="value">
										12 Dec 2020 - 27 Feb 2021
									</span>
								</div>
								<span className="label">Date Range</span>
							</label>
						</div>
					</section>
					<footer>
						<a className="button green" href="#">
							<span>Download Report</span>
						</a>
						<a className="button yellow" href="#">
							<span>Re-Analyze</span>
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
									<span className="value stat">0.9</span>
									<span className="value unit">mg/l</span>
								</div>
								<span className="label">
									FRC at the Tapstand
								</span>
								<hr />
								<GuideLine
									text={[
										"You should aim for this FRC value at the tapstand in order to ensure water is safe to drink after storing in the home.",
										" - ",
										<a href="/contact">learn more</a>,
									]}
								/>
							</label>
							<label className="half-width">
								<div>
									<span className="value stat">15</span>
									<span className="value unit">Hours</span>
								</div>
								<span className="label">
									Valid Samples Analysed
								</span>
								<hr />
								<GuideLine
									text={[
										"This is the delay used to calculate the FRC target, it should reflect the typical maximum amount of time water is being storde for",
										" - ",
										<a href="/contact">learn more</a>,
									]}
								/>
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
									<span className="value stat">26</span>
									<span className="value unit">%</span>
								</div>
								<span className="label">Tapstand FRC</span>
								<hr />
								<GuideLine
									text={[
										"This is the percentage of tapstand FRC measurments that met the target recommendation",
										" - ",
										<a href="/contact">learn more</a>,
									]}
								/>
							</label>
							<label className="half-width">
								<div>
									<span className="value stat">12</span>
									<span className="value unit">%</span>
								</div>
								<span className="label">
									Household Water Safety
								</span>
								<hr />
								<GuideLine
									text={[
										"This is the percentage of household FRC measurments that met the minimum FRC of 0.2mg/l",
										" - ",
										<a href="/contact">learn more</a>,
									]}
								/>
							</label>
						</div>
					</section>
					<footer></footer>
				</section>

				{/* <section className="content-window result-window-stats">
					<header>
						<div className="content-window-title">
							Water Safety Improvements
						</div>
						<div className="section-options"></div>
					</header>
					<section>
						<div className="stat float">
							<div>
								<div className="txt-apc">
									<span className="value">85</span>
									<span className="unit">%</span>
								</div>
								<label className="txt-sm">
									Predicted improvements
								</label>
							</div>
							<div></div>
							<div className="full">
								<span className="txt-icon help">
									<i>
										<img src="assets/icons/guide.svg" />
									</i>
									<span>
										If the target FRC level was achieved at
										all tapstands, the SWOT predicts that
										this percentage of household water
										samples would show at least 0.2mg/l FRC.
										- <a href="#">learn more</a>
									</span>
								</span>
							</div>
						</div>
					</section>
					<footer></footer>
				</section> */}

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
									<img src="assets/pages/review-guidance.svg" />
								</figure>
							</li>
						</ul>
					</section>
				</section>
			</>
		);
	}
}

export default Result;

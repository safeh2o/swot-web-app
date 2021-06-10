import React, { Component } from "react";

import Notice from "../elements/Notice";

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
								<span className="icon">
									<i>
										<img
											alt=""
											src="/assets/icons/flags/NG.svg"
											width="24"
											height="24"
										/>
									</i>
									<input
										tabIndex="0"
										autoComplete="on"
										type="text"
										value="Nigeria"
										readOnly
										disabled="disabled"
									/>
								</span>
								<span className="label">Country</span>
							</label>
							<label className="space">
								<input
									tabIndex="0"
									autoComplete="on"
									type="text"
									value="Maiduguri"
									readOnly
									disabled="disabled"
								/>
								<span className="label">Area</span>
							</label>
							<label className="space">
								<input
									tabIndex="0"
									autoComplete="on"
									type="text"
									value="Garmawa"
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
						</div>
					</section>
					<footer>
						<a class="button green" href="#">
							<span>Download Report</span>
						</a>
						<a class="button yellow" href="#">
							<span>Re-Analyze</span>
						</a>
					</footer>
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
									<span className="value">62</span>
									<span className="unit">%</span>
								</div>
								<span className="label">
									FRC at the Tapstand
								</span>
							</label>
							<div>
								<span className="txt-icon txt-sm help">
									<i>
										<img src="assets/icons/guide.svg" />
									</i>
									<span>
										The percentage of tapstand water samples
										with an FRC of at least 0.2mg/l -{" "}
										<a href="#">learn more</a>
									</span>
								</span>
							</div>
						</div>
						<div className="stat">
							<div>
								<div className="txt-apc">
									<span className="value">32</span>
									<span className="unit txt-lrg">%</span>
								</div>
								<label className="txt-sm">
									FRC at the Household
								</label>
							</div>
							<div></div>
							<div>
								<span className="txt-icon txt-sm help">
									<i>
										<img src="assets/icons/guide.svg" />
									</i>
									<span>
										The percentage of household water
										samples with an FRC of at least 0.2mg/l
										- <a href="#">learn more</a>
									</span>
								</span>
							</div>
						</div>
					</section>
					<footer></footer>
				</section>

				<section className="content-window result-window-stats">
					<header>
						<div className="content-window-title">FRC Target</div>
						<div className="section-options"></div>
					</header>
					<section>
						<div className="stat">
							<div>
								<div className="txt-apc">
									<span className="value">0.9</span>
									<span className="unit txt-lrg">mg/l</span>
								</div>
								<label className="txt-sm">
									FRC at the Tapstand
								</label>
							</div>
							<div></div>
							<div>
								<span className="txt-icon txt-sm help">
									<i>
										<img src="assets/icons/guide.svg" />
									</i>
									<span>
										You should aim for this FRC value at the
										tapstand in order to ensure water is
										safe to drink after storing in the home.
										- <a href="#">learn more</a>
									</span>
								</span>
							</div>
						</div>
					</section>
					<footer></footer>
				</section>

				<section className="content-window result-window-stats">
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
									<span className="unit txt-lrg">%</span>
								</div>
								<label className="txt-sm">
									Predicted improvements
								</label>
							</div>
							<div></div>
							<div className="full">
								<span className="txt-icon txt-sm help">
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
				</section>

				<section className="content-window">
					<header>
						<div className="content-window-title">What's Next?</div>
						<div className="section-options"></div>
					</header>
					<section>
						<ul className="whats-next float txt-center inline">
							<li>
								<figure>
									<img src="assets/icons/tap-stand.svg" />
								</figure>
								<div>
									<div className="title txt-500">
										Increase chlorine dosing
									</div>
									<p className="txt-sm">
										To achieve 0.9mg/l across all tapstands.{" "}
										<a href="#">more info</a>
									</p>
								</div>
							</li>
							<li>
								<figure>
									<img src="assets/icons/guide-monitor.svg" />
								</figure>
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
							</li>
							<li>
								<figure>
									<img src="assets/icons/guide-full.svg" />
								</figure>
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
							</li>
						</ul>
					</section>
					<footer></footer>
				</section>
			</>
		);
	}
}

export default Result;

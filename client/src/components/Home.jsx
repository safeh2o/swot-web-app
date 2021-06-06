import React from "react";

import { Link } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import Posts from "./Posts";

// function Dashboard(props) {
export default class Home extends React.Component {

	static contextType = AppContext;

	isUserLogin() {
		const { user } = this.context;
		if (!user) {
			return (
				<>
					<section id="tool-steps" className="content-window rich-text">
						<header>
							<div className="content-window-title txt-condensed">4 Simple Steps</div>
							<div className="section-window-title-description">
								<p>The SWOT provides an accessible platform to manage data and integrates advanced data analytics including machine learning to generate site-specific and evidence-based water treatment recommendations for field teams.</p>
							</div>
						</header>
						<section>
							<article>
								<div className="tool-steps">

									<div className="tool-step txt-icon">
										<i className="icon">1</i>
										<div className="text">
											<h2 className="txt-condensed">Download Template, Collect Data</h2>
											<p>Collect paired, time based water quality data from your field site &mdash; Data collection can be done using either a  digital platform *<a href="https://www.microsoft.com/en-ca/microsoft-365/free-office-online-for-the-web">Microsoft Excel</a>, <a href="https://www.google.com/sheets/">Google Sheets</a>, <a href="https://www.kobotoolbox.org/">KoboToolbox</a> or a paper-pen-to-spreadsheet approach.</p>
										</div>
									</div>

									<div className="tool-step txt-icon">
										<i className="icon">2</i>
										<div className="text">
											<h2 className="txt-condensed">Upload Collected Data</h2>
											<p>Files can be uploaded via the Upload page (.xls, .xlsx, .csv)</p>
										</div>
									</div>

									<div className="tool-step txt-icon">
										<i className="icon">3</i>
										<div className="text">
											<h2 className="txt-condensed">Request Analysis of Data</h2>
											<p>Machine learning and numerial modelling analytics process the data.</p>
										</div>
									</div>

									<div className="tool-step txt-icon">
										<i className="icon">4</i>
										<div className="text">
											<h2 className="txt-condensed">Get FRC recommendations</h2>
											<p>Your site-specific chlorination target will be available within minutes of a analysis request. A secure repository for historical data can also be used for reporting purposes.</p>
											<p>Guidance can be viewed online or sent by email.</p>
										</div>
									</div>

								</div>
							</article>
						</section>
						<footer>
							<div className="txt-icon button yellow">
								<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="none" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" d="M3.3 20.1h20M18.5 13.9l4.8 6.2-4.8 6.1" /><path fill="none" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" d="M12.5 11.6V6.9l19.4 1v25.2l-19.4-1v-4.5" /></svg></i>
								<span>Log In/Signup to Get Started</span>
							</div>
						</footer>
					</section>
				</>
			)
		} else {
			return (
				<>
					<Posts
						type={'news'}
						data={
							[
								{
									link: "",
									title: "Global WASH Cluster (GWC) Annual Meeting Satellite",
									date: "May 2, 2021",
									content: "Check out a recent presentation made during one of the events.",
								},
								{
									link: "https://www.theglobeandmail.com/canada/article-sanitation-specialist-develops-system-to-ensure-refugee-camps-anywhere/",
									title: "Stepping Up: Sanitation specialist develops system to ensure refugee camps anywhere can have healthy drinking water",
									date: "November 25, 2020",
									content: "This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership.",
								}
							]
						}
					/>
				</>
			)
		}
	}

	render() {
		return (
			<>
				<section className="content-window borderless">
					<h1 className="headline">
						Ensuring water safety by leveraging routine water quality data.
					</h1>
				</section>

				{this.isUserLogin()}

				<section id="organisations" className="content-window rich-text">
					<header>
						<div className="content-window-title txt-condensed">Information:</div>
						<div className="section-window-title-description">
						</div>
					</header>
					<section>
						<h2 className="txt-condensed">Project Leads</h2>
						<p>Open Sources of thie projects is developed by:</p>
						<div className="project-leads">
							<div className="org">
								<a target="_blank" href="http://dighr.yorku.ca/">
									<img
										src="assets/DIGHR-blue.png"
										width="150px"
										className="img-fluid"
										alt="support logo"
									/>
								</a>
							</div>
							<div className="org">
								<a target="_blank" href="https://www.doctorswithoutborders.ca/">
									<img
										src="assets/MSF-logo.jpg"
										className="img-fluid"
										alt="support logo"
									/>
								</a>
							</div>
						</div>
					</section>
					<section>
						<h2 className="txt-condensed">Project Funding</h2>
						<p>We thank our sponsors for all their support</p>
						<div className="project-funding">
							<div className="org">
								<a target="_blank" href="https://www.achmea.nl/en/foundation">
									<img src="assets/AchmeaFoundation.png" className="img-fluid" alt="support logo" />
								</a>
							</div>
							<div className="org">
								<a target="_blank" href="https://www.grandchallenges.ca/programs/creating-hope-conflict/">
									<img src="assets/GCC-logo.png" className="img-fluid" alt="support logo" />
								</a>
							</div>
						</div>
					</section>
				</section>

				<section id="about" className="content-window borderless">
					<Link to="/about" className="txt-icon button yellow more-info rtl">
						<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="none" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" d="M32 20H7M26 12l6 8-6 8" /></svg></i>
						<span>
							<span className="value">About the Project</span><br />
							How, Why, and the People behind the Safe Water Optimization Tool.
						</span>
					</Link>
				</section>
			</>
		);
	}
}
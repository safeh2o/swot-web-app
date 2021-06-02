import React from "react";

import { Link } from "react-router-dom";
import AppContext from "../contexts/AppContext";

// function Dashboard(props) {
export default class Home extends React.Component {

	static contextType = AppContext;

	isUserLogin() {
		const { user } = this.context;
		if (!user) {
			return (
				<div className="txt-icon button blue">
					<i>
						<img
							src="assets/icons/header-nav-profile.svg"
							alt="Manage your Profile" />
					</i>
					<span>Log In/Signup to Get Started</span>
				</div>
			)
		}
	}

	render() {
		return (
			<>
				<div className="container">
					<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
						<h1 className="display-4">
							Ensuring water safety by leveraging routine water
							quality data.
						</h1>
					</div>
				</div>

				<section id="" className="content-window dashboard">
					<header>
						<div className="content-window-title">Simple Steps</div>
						<div className="section-options"></div>
					</header>
					<section>
						<article>
							<p>The SWOT provides an accessible platform to manage data and integrates advanced data anlytics including machine learning to generate site-specific and evidence-based water treatment recommendations for field teams.</p>
							<div>
								<ol>
									<li>
										<strong className="">Download template</strong>
										<p>Paired and time-stamped water quality monitoring data collected at distribution points and at household level.</p>
										<p>Data collection can be done using either a digital platform or a paper-pen-to-spreadsheet approach.</p>
									</li>
									<li>
										<strong className="">Add field data</strong>
										<p>Provides a secure repository for historical data which can be used for reporting purposes.</p>
									</li>
									<li>
										<strong className="">Upload data template</strong>
										<p>Web-based analysus of water quality data using a sophisticated machine learning approach.</p>
										<p>Various water quality parameters can be included for analysis.</p>
									</li>
									<li>
										<strong className="">Get FRC recommendation</strong>
										<p>Site-specific guidance for residual chlorine level required at disctirbutuon points to ensure safe water supply up toth te moment of consumption in the household.</p>
										<p>Guidance can be viewed online or sent by email.</p>
									</li>
								</ol>
								{this.isUserLogin()}
							</div>
						</article>
					</section>
					<footer></footer>
				</section>

				<section id="news" className="content-window dashboard">
					<header>
						<div className="content-window-title">Latest News</div>
						<div className="section-options"></div>
					</header>
					<section>
						<article className="block">
							<figure>
								<img src="#" alt="" />
							</figure>
							<div>
								<time dateTime="Fri, 30 Apr 2021 20:34:29 +0000" className="txt-sm">2 days ago</time>
								<h2><a href="#">Global WASH Cluster (GWC) Annual Meeting Satellite</a></h2>
								<div><p>Check out a recent presentation made during one of the events.</p></div>
							</div>
						</article>
						<article className="block">
							<figure>
								<img src="https://www.theglobeandmail.com/resizer/7GtDjOvVq7XmAxufC7TZpAqjssw=/620x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/tgam/3Y4SNA4XKRGBNCXRG2MGV43YCM.JPG" alt="" />
							</figure>
							<div>
								<time dateTime="Fri, 30 Apr 2021 20:34:29 +0000" className="txt-sm">November 25, 2020</time>
								<h2><a href="#">Stepping Up: Sanitation specialist develops system to ensure refugee camps anywhere can have healthy drinking water</a></h2>
								<div><p>This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership. - <a href="https://www.theglobeandmail.com/canada/article-sanitation-specialist-develops-system-to-ensure-refugee-camps-anywhere/">Read More</a></p></div>
							</div>
						</article>
					</section>
					<footer>
						<div className="button blue">
							<span>More News</span>
						</div>
					</footer>
				</section>

				<section id="acknowledgements" className="content-window">
					<header>
						<div className="content-window-title">Acknowledgements</div>
						<div className="section-options"></div>
					</header>
					<section>
						<h3>Open Source development led by</h3>
						<div>
							<div>
								<a target="_blank" href="http://dighr.yorku.ca/">
									<img
										src="assets/DIGHR-blue.png"
										width="150px"
										className="img-fluid"
										alt="support logo"
									/>
								</a>
							</div>
							<div>
								<a target="_blank" href="https://www.doctorswithoutborders.ca/">
									<img
										src="assets/MSF-logo.jpg"
										className="img-fluid"
										alt="support logo"
									/>
								</a>
							</div>
						</div>
						<h3>With funding support from</h3>
						<div>
							<div>
								<a target="_blank" href="https://www.achmea.nl/en/foundation">
									<img src="assets/AchmeaFoundation.png" className="img-fluid" alt="support logo" />
								</a>
							</div>
							<div>
								<a target="_blank" href="https://www.grandchallenges.ca/programs/creating-hope-conflict/">
									<img src="assets/GCC-logo.png" className="img-fluid" alt="support logo" />
								</a>
							</div>
						</div>
					</section>
					<footer></footer>
				</section>
			</>
		);
	}
}
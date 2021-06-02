import React from "react";

import { Link } from "react-router-dom";

function Dashboard(props) {
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
								</li>
								<li>
									<strong className="">Add field data</strong>
								</li>
								<li>
									<strong className="">Upload data template</strong>
								</li>
								<li>
									<strong className="">Get FRC recommendation</strong>
								</li>
							</ol>
							<div className="txt-icon button blue">
								<i>
									<img 
										src="assets/icons/header-nav-profile.svg" 
										alt="Manage your Profile" />
								</i>
								<span>Log In/Signup to Get Started</span>
							</div>
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
					<article>
						<figure></figure>
						<time dateTime="Fri, 30 Apr 2021 20:34:29 +0000" className="txt-sm">2 days ago</time>
						<h2><a href="#">Global WASH Cluster (GWC) Annual Meeting Satellite</a></h2>
						<div><p>Check out a recent presentation made during one of the events.</p></div>
					</article>
				</section>
				<footer></footer>
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
								<img src="assets/GCC-logo.png" className="img-fluid" alt="support logo"/>
							</a>
						</div>
					</div>
				</section>
				<footer></footer>
			</section>
		</>
	);
}

export default Dashboard;

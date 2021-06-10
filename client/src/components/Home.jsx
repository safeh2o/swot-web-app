import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import Posts from "./Posts";
import { getUser, userSelectors as userSelectors } from "../reducers/user";

import { IconTrash, IconAdd } from "./icons";

// function Dashboard(props) {
export default function Home(props) {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const userName = useSelector((state) => state.user.firstname);
	// const isLoggedIn = useSelector(userSelectors.isLoggedIn);

	const isUserLogin = () => {
		if (!isLoggedIn) {
			return (
				<>
					<section className="content-window borderless">
						<h1 className="headline">
							Ensuring water safety by leveraging routine water
							quality data.
						</h1>
					</section>

					<section
						id="tool-steps"
						className="content-window rich-text bleed-edges"
					>
						<header>
							<div className="content-window-title txt-condensed">
								4 Simple Steps
							</div>
							<div className="content-window-title-description">
								<p>
									The SWOT provides an accessible platform to
									manage data and integrates advanced data
									analytics including machine learning to
									generate site-specific and evidence-based
									water treatment recommendations for field
									teams.
								</p>
							</div>
						</header>

						<section className="tool-step txt-icon">
							<i className="icon">1</i>
							<div className="text">
								<h2 className="txt-condensed">
									Download Template, Collect Data
								</h2>
								<p>
									Collect paired, time based water quality
									data from your field site &mdash; Data
									collection can be done using either a
									digital platform *
									<a href="https://www.microsoft.com/en-ca/microsoft-365/free-office-online-for-the-web">
										Microsoft Excel
									</a>
									,{" "}
									<a href="https://www.google.com/sheets/">
										Google Sheets
									</a>
									,{" "}
									<a href="https://www.kobotoolbox.org/">
										KoboToolbox
									</a>{" "}
									or a paper-pen-to-spreadsheet approach.
								</p>
							</div>
						</section>

						<section className="tool-step txt-icon">
							<i className="icon">2</i>
							<div className="text">
								<h2 className="txt-condensed">
									Upload Collected Data
								</h2>
								<p>
									Files can be uploaded via the Upload page
									(.xls, .xlsx, .csv)
								</p>
							</div>
						</section>

						<section className="tool-step txt-icon">
							<i className="icon">3</i>
							<div className="text">
								<h2 className="txt-condensed">
									Request Analysis of Data
								</h2>
								<p>
									Machine learning and numerial modelling
									analytics process the data.
								</p>
							</div>
						</section>

						<section className="tool-step txt-icon">
							<i className="icon">4</i>
							<div className="text">
								<h2 className="txt-condensed">
									Get FRC recommendations
								</h2>
								<p>
									Your site-specific chlorination target will
									be available within minutes of a analysis
									request. A secure repository for historical
									data can also be used for reporting
									purposes.
								</p>
								<p>
									Guidance can be viewed online or sent by
									email.
								</p>
							</div>
						</section>

						<footer className="more">
							<Link to="/signin">
								<span>Login/Signup to Get Started</span>
							</Link>
						</footer>
					</section>
				</>
			);
		} else {
			return (
				<>
					<h2 className="content-title">Welcome Back, Chiedza</h2>
					<section
						id="collect-data"
						className="content-window bleed-edges"
					>
						<header>
							<div className="content-window-title">
								Active Fieldsites
							</div>
						</header>
						<section className="table results">
							<section className="table-header">
								<div className="table-col">
									<span className="txt-icon">Fieldsite</span>
								</div>
								<div className="table-col">Response | Area</div>
								<div className="table-col">Samples</div>
								<div className="table-col">Latest Analysis</div>
								<div className="table-col">Safety Level</div>
								<div className="table-col"></div>
							</section>
							<section className="table-body">
								<div className="table-row">
									<div className="table-col">
										<Link to="result/garwama">Camp 07</Link>
									</div>
									<div className="table-col">
										Iraq | Mamrashan
									</div>
									<div className="table-col">305</div>
									<div className="table-col">Feb 27 2021</div>
									<div className="table-col">
										<span className="safe-level safe"></span>
									</div>
									<div className="table-col">
										<IconTrash />
									</div>
								</div>
								<div className="table-row">
									<div className="table-col">
										<Link to="result/garwama">
											Camp DVP
										</Link>
									</div>
									<div className="table-col">
										Iraq | Arbat IDP
									</div>
									<div className="table-col">15</div>
									<div className="table-col">Jan 11 2021</div>
									<div className="table-col">
										<span className="safe-level check"></span>
									</div>
									<div className="table-col">
										<IconTrash />
									</div>
								</div>
								<div className="table-row">
									<div className="table-col">
										<Link to="result/garwama">
											Camp Varungu
										</Link>
									</div>
									<div className="table-col">
										Nigeria | Essian
									</div>
									<div className="table-col">105</div>
									<div className="table-col">Nov 21 2020</div>
									<div className="table-col">
										<span className="safe-level none"></span>
									</div>
									<div className="table-col">
										<IconTrash />
									</div>
								</div>
								<div className="table-row">
									<div className="table-col">
										<Link to="result/garwama">
											Arbat IDP
										</Link>
									</div>
									<div className="table-col">
										Iraq | Garmawa
									</div>
									<div className="table-col">0</div>
									<div className="table-col">- - -</div>
									<div className="table-col">
										<span className="safe-level none"></span>
									</div>
									<div className="table-col">
										<IconTrash />
									</div>
								</div>
								<div className="table-row">
									<div className="table-col">
										<Link to="result/garwama">Camp 03</Link>
									</div>
									<div className="table-col">
										Iraq | Mamrashan
									</div>
									<div className="table-col">305</div>
									<div className="table-col">Aug 17 2020</div>
									<div className="table-col">
										<span className="safe-level not-safe"></span>
									</div>
									<div className="table-col">
										<IconTrash />
									</div>
								</div>
								<div className="table-row">
									<div className="table-col">
										<Link to="result/garwama">
											Bardarash
										</Link>
									</div>
									<div className="table-col">
										Nigeria | Essian
									</div>
									<div className="table-col">234</div>
									<div className="table-col">Aug 8 2021</div>
									<div className="table-col">
										<span className="safe-level safe"></span>
									</div>
									<div className="table-col">
										<IconTrash />
									</div>
								</div>
							</section>
							<section className="table-footer"></section>
						</section>
					</section>
				</>
			);
		}
	};

	return (
		<>
			{isUserLogin()}

			<Posts
				type={"news"}
				data={[
					{
						link: "",
						title: "Global WASH Cluster (GWC) Annual Meeting Satellite",
						date: "May 2, 2021",
						content:
							"Check out a recent presentation made during one of the events.",
					},
					{
						link: "https://www.theglobeandmail.com/canada/article-sanitation-specialist-develops-system-to-ensure-refugee-camps-anywhere/",
						title: "Stepping Up: Sanitation specialist develops system to ensure refugee camps anywhere can have healthy drinking water",
						date: "November 25, 2020",
						content:
							"This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership.",
					},
				]}
			/>

			<section
				id="organisations"
				className="content-window rich-text bleed-edges"
			>
				<header>
					<div className="content-window-title txt-condensed">
						Organisations
					</div>
				</header>
				<section>
					<h2 className="txt-condensed">Leads</h2>
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
							<a
								target="_blank"
								href="https://www.doctorswithoutborders.ca/"
							>
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
					<h2 className="txt-condensed">Funding</h2>
					<p>We thank our sponsors for all their support</p>
					<div className="project-funding">
						<div className="org">
							<a
								target="_blank"
								href="https://www.achmea.nl/en/foundation"
							>
								<img
									src="assets/AchmeaFoundation.png"
									className="img-fluid"
									alt="support logo"
								/>
							</a>
						</div>
						<div className="org">
							<a
								target="_blank"
								href="https://www.grandchallenges.ca/programs/creating-hope-conflict/"
							>
								<img
									src="assets/GCC-logo.png"
									className="img-fluid"
									alt="support logo"
								/>
							</a>
						</div>
					</div>
				</section>
			</section>

			{/*
				<section id="about-preview" className="content-window borderless">
					<Link to="/about" className="txt-icon button yellow more-info rtl">
						<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="none" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" d="M32 20H7M26 12l6 8-6 8" /></svg></i>
						<span>
							<span className="value">About the Project</span><br />
							How, Why, and the People behind the Safe Water Optimization Tool.
						</span>
					</Link>
				</section>
			*/}
		</>
	);
}

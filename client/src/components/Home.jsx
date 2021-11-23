import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Posts from "./Posts";
import { userSelectors as userSelectors } from "../reducers/user";

import { IconTrash } from "./icons";
import { clearViewStack } from "../reducers/view";
import { blogSelectors, getPosts } from "../reducers/posts";

export default function Home(props) {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);
	const posts = useSelector(blogSelectors.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearViewStack());
		dispatch(getPosts());
	}, []);

	const privilegedContent = () => {
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
					<h2 className="content-title">
						Welcome Back, {user.name.first}
					</h2>
				</>
			);
		}
	};

	return (
		<>
			{privilegedContent()}

			<section id="news" className="content-window rich-text">
				<header>
					<div className="content-window-title txt-condensed">
						Latest News
					</div>
				</header>
				<Posts type={"news"} data={posts.slice(0, 2)} />

				<footer className="more">
					<Link to="/blog">
						<span>More News</span>
					</Link>
				</footer>
			</section>

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
					<p>This project is implemented by:</p>
					<div className="project-leads">
						<div className="org">
							<a
								target="_blank"
								href="http://dighr.yorku.ca/"
								rel="noreferrer"
							>
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
								rel="noreferrer"
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
								rel="noreferrer"
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
								rel="noreferrer"
							>
								<img
									src="assets/HGC-Logo-clear.png"
									className="img-fluid"
									alt="support logo"
								/>
							</a>
						</div>
					</div>
				</section>
			</section>
		</>
	);
}

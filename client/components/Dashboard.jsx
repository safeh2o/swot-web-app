import React from "react";

import { Link } from "react-router-dom";

function Dashboard(props) {
	return (
		<>
			<main role="main" className="flex-shrink-0">
				<div className="container">
					<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
						<h1 className="display-4">
							Ensuring water safety by leveraging routine water
							quality data.
						</h1>
					</div>
				</div>

				<div className="container">
					<div className="card-deck mb-3 text-center">
						<div className="card mb-4 shadow-sm">
							<div className="card-header">
								<h4 className="my-0 font-weight-normal">
									ANNOUNCEMENTS
								</h4>
							</div>
							<div className="card-body">
								<p className=" mt-3 mb-4 lead">
									Click below to read the latest from the
									SWOT.
								</p>
							</div>
							<div className="card-footer">
								<button
									type="button"
									onClick={() => {
										location.href = "/blog";
									}}
									className="btn btn-lg btn-block btn-primary"
								>
									Read More
								</button>
							</div>
						</div>
						<div className="card mb-4 shadow-sm">
							<div className="card-header">
								<h4 className="my-0 font-weight-normal">
									4 SIMPLE STEPS
								</h4>
							</div>
							<div className="card-body">
								<ul className="mt-3 text-left lead">
									<li>
										<span className="font-weight-bold">
											1){" "}
										</span>
										Download template.
									</li>
									<li>
										<span className="font-weight-bold">
											2){" "}
										</span>
										Add field data.
									</li>
									<li>
										<span className="font-weight-bold">
											3){" "}
										</span>
										Upload data template.
									</li>
									<li>
										<span className="font-weight-bold">
											4){" "}
										</span>
										Get FRC recommendation.
									</li>
								</ul>
							</div>
							<div className="card-footer">
								<Link
									type="button"
									to="/pages/instructions"
									className="btn btn-lg btn-block btn-primary"
								>
									Read Instructions
								</Link>
							</div>
						</div>
						<div className="card mb-4 shadow-sm">
							<div className="card-header">
								<h4 className="my-0 font-weight-normal ">
									DOWNLOAD
								</h4>
							</div>
							<div className="card-body">
								<img
									className="excel_logo mt-3"
									src="assets/excel_logo.svg"
									alt="excel icon"
								/>
							</div>
							<div className="card-footer">
								<Link
									type="button"
									to="/download"
									className="btn btn-lg btn-block btn-primary"
								>
									Download Template
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="jumbotron shadow-sm">
						<div className="row">
							<div className="col-sm-12 col-md-12 align-middle">
								<h3 className="display-6">
									OPEN SOURCE DEVELOPMENT LED BY
								</h3>
								<br />
								<div className="row justify-content-md-center">
									<div className="col-sm-12 col-md-2">
										<a
											target="_blank"
											href="http://dighr.yorku.ca/"
										>
											<img
												src="assets/DIGHR-blue.png"
												width="150px"
												className="img-fluid"
												alt="support logo"
											/>
										</a>
									</div>
									<div className="col-sm-12 col-md-4">
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
								<br />
								<h3 className="display-6">
									WITH FUNDING SUPPORT FROM
								</h3>
								<br />
								<div className="row justify-content-md-center">
									<div className="col-sm-12 col-md-4">
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
									<div className="col-sm-12 col-md-4">
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
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default Dashboard;

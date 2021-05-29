import React from "react";

export default function DownloadPage(props) {
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
									HOW TO USE THE DATA INPUT TEMPLATE
								</h4>
							</div>
							<div className="card-body">
								<p className=" mt-3 mb-4 lead">
									Collect field data following the{" "}
									<a
										href="https://gitcdn.link/repo/dighr/swot-web-assets/master/SWOT_Field_Data_Protocol_Sep2020.pdf"
										rel="noopener noreferrer"
										target="_blank"
									>
										Field Data Collection Protocol
									</a>
									.
								</p>
								<p className=" mt-3 mb-4 lead">
									Download the{" "}
									<a
										href="https://github.com/dighr/swot-web-assets/blob/master/DataInputTemplate_ver2.0.xlsx?raw=true"
										rel="noopener noreferrer"
										target="_blank"
									>
										Data Input Template
									</a>
									.
								</p>
								<p className=" mt-3 mb-4 lead">
									Enter your field data under the correct
									headings following the instructions on the
									form and here, paying attention to the units
									and format of the data.
								</p>
								<p className=" mt-3 mb-4 lead">
									Please do not remove any columns or rows.
								</p>
								<p className=" mt-3 mb-4 lead">
									You need Microsoft Office 2007 or a
									compatible Office suite to view the Excel
									template.
								</p>
							</div>
							<div className="card-footer">
								<a
									href="https://github.com/dighr/swot-web-assets/blob/master/DataInputTemplate_ver2.0.xlsx?raw=true"
									className="btn btn-lg btn-block btn-primary"
								>
									Download Data Input Template
								</a>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

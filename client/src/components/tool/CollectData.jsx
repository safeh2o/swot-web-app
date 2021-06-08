import React from "react";
import Popover from '@material-ui/core/Popover';

export default function CollectData(props) {

	const urlFieldGuide = '#';
	const urlDataInputTemplate = '#';

	return (
		<>
			<Popover
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'left',
				}}
			>
				The content of the Popover.
			</Popover>
			<section id="collect-data" className="content-window bleed-edges rich-text">
				<header>
					<div className="content-window-title txt-condensed">Step 1. Field Guide &amp; Data Input</div>
					<div className="section-window-title-description">
						<p>We have provided a handy field guide to help set up a good data collection process at your campsite, and already got a data input template file available for download too.</p>
					</div>
				</header>
				<section>

					<div className="step-1 field-guide">

						<div className="text">

							<a
								className="txt-icon button yellow"
								href={urlFieldGuide}>
								<i>
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
										<polyline fill="none" stroke="#161819" strokeWidth="3" strokeMiterlimit="10" points="30,16.5 20.4,24.4 11,16.5" />
										<line fill="none" stroke="#161819" strokeWidth="3" strokeMiterlimit="10" x1="20.4" y1="24.4" x2="20.4" y2="3.7" />
										<line fill="none" stroke="#161819" strokeWidth="3" strokeMiterlimit="10" x1="4.4" y1="31" x2="36.4" y2="31" />
									</svg>
								</i>
								<span>Field Data Collection Protocol</span>
							</a>
							<div className="label">.xls 623kb  (Last Updated: Sep 22 2020)</div>
							<div className="rte">
								<p>Collect field data following our guide to help you and your team to set up a Data Colletion process</p>
							</div>

						</div>

						<figure className="image">

							<img src="#" alt="" />

						</figure>

					</div>

					<div className="step-2 data-input-template">

						<div className="text">

							<a
								className="txt-icon button yellow"
								href={urlDataInputTemplate}>
								<i>
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
										<polyline fill="none" stroke="#161819" strokeWidth="3" strokeMiterlimit="10" points="30,16.5 20.4,24.4 11,16.5" />
										<line fill="none" stroke="#161819" strokeWidth="3" strokeMiterlimit="10" x1="20.4" y1="24.4" x2="20.4" y2="3.7" />
										<line fill="none" stroke="#161819" strokeWidth="3" strokeMiterlimit="10" x1="4.4" y1="31" x2="36.4" y2="31" />
									</svg>
								</i>
								<span>Data Input Template</span>
							</a>
							<div className="label">.pdf 123kb  (Last Updated: May 11 2020)</div>
							<div className="rte">
								<span className="txt-icon notice">
									<i>
										<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
											<circle fill="#929EAC" cx="20" cy="20" r="20" />
											<line fill="none" stroke="#FCFCFC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" x1="20" y1="10" x2="20" y2="21.1" />
											<circle fill="#F6F7F7" cx="20" cy="29.2" r="2.5" />
										</svg>
									</i>
									<span>Please do not remove any columns or rows.</span>
								</span>
								<span className="txt-icon notice">
									<i>
										<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
											<circle fill="#929EAC" cx="20" cy="20" r="20" />
											<line fill="none" stroke="#FCFCFC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" x1="20" y1="10" x2="20" y2="21.1" />
											<circle fill="#F6F7F7" cx="20" cy="29.2" r="2.5" />
										</svg>
									</i>
									<span>Enter your field data under the correct headings following the instructions on the form and here, paying attention to the units and format of the data.</span>
								</span>
								<span className="txt-icon notice">
									<i>
										<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
											<circle fill="#929EAC" cx="20" cy="20" r="20" />
											<line fill="none" stroke="#FCFCFC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" x1="20" y1="10" x2="20" y2="21.1" />
											<circle fill="#F6F7F7" cx="20" cy="29.2" r="2.5" />
										</svg>
									</i>
									<span>You need Microsoft Office 2007 or a compatible Office suite to view the Excel template.</span>
								</span>
							</div>

						</div>

						<figure className="image show-medium-up">

							<img src="/assets/tool/collect-data-data-input-template.png" alt="" />

						</figure>

						<figure className="image show-medium-down">

							<img src="#" alt="" />

						</figure>

					</div>

				</section>
				<footer>

				</footer>
			</section>
		</>
	);
}

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
					<div className="content-window-title-description">
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
							<div className="label txt-icon rtl">
								<i>
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
										<path id="XMLID_19_" fill="#E9E9E0" d="M25.8,1.8H7c-0.5,0-0.9,0.4-0.9,1.2v24.1h27.9V10.3c0-0.5-0.1-0.6-0.2-0.7L26.2,2
											C26.1,1.9,26,1.8,25.8,1.8z"/>
										<polygon id="XMLID_18_" fill="#D9D7CA" points="26.2,1.9 26.2,9.6 33.9,9.6 " />
										<path id="XMLID_12_" fill="#CC4B4C" d="M14.5,23.5L14.5,23.5c-0.2,0-0.4-0.1-0.6-0.2c-0.7-0.5-0.8-1.1-0.7-1.5
											c0.1-1.1,1.4-2.2,3.9-3.3c1-2.1,1.9-4.8,2.5-7c-0.6-1.4-1.3-3.2-0.8-4.3c0.2-0.4,0.4-0.7,0.7-0.8c0.1,0,0.5-0.1,0.7-0.1
											c0.3,0,0.6,0.4,0.8,0.7c0.2,0.2,0.6,0.8-0.2,4.4c0.9,1.8,2.1,3.6,3.3,4.9c0.9-0.2,1.6-0.2,2.2-0.2c1,0,1.6,0.2,1.9,0.7
											c0.2,0.4,0.1,0.9-0.3,1.4c-0.4,0.5-0.9,0.8-1.4,0.8c-0.8,0-1.7-0.5-2.7-1.5c-1.8,0.4-4,1.1-5.7,1.8c-0.5,1.2-1.1,2.1-1.5,2.8
											C15.6,23,15.1,23.5,14.5,23.5z M16.2,20.1c-1.4,0.8-2,1.4-2,1.8c0,0.1,0,0.2,0.3,0.4C14.6,22.3,15.2,22.1,16.2,20.1z M25.1,17.2
											c0.5,0.4,0.7,0.6,1,0.6c0.2,0,0.6,0,0.8-0.3c0.1-0.1,0.1-0.2,0.1-0.3c-0.1,0-0.2-0.1-0.8-0.1C25.9,17.2,25.5,17.2,25.1,17.2z
											M20.2,13c-0.5,1.6-1.1,3.3-1.7,4.9c1.4-0.5,2.8-1,4.2-1.3C21.8,15.6,21,14.3,20.2,13z M19.8,7.5c-0.1,0-0.9,1.1,0.1,2.1
											C20.5,8.2,19.9,7.5,19.8,7.5z"/>
										<g id="XMLID_1_">
											<path id="XMLID_2_" fill="#CC4B4C" d="M15,30.9c-0.1-0.1-0.2-0.2-0.4-0.3c-0.2-0.1-0.4-0.1-0.7-0.1h-0.8v2.6h1c0.1,0,0.3,0,0.4-0.1
												c0.1,0,0.2-0.1,0.4-0.2c0.1-0.1,0.2-0.2,0.3-0.4c0.1-0.2,0.1-0.4,0.1-0.7c0-0.1,0-0.2,0-0.4C15.1,31.2,15,31.1,15,30.9z"/>
											<path id="XMLID_11_" fill="#CC4B4C" d="M21.1,31.2c-0.2-0.2-0.4-0.4-0.8-0.5s-0.7-0.2-1.2-0.2h-0.6v4.9h1.1c0.7,0,1.2-0.2,1.6-0.7
												s0.5-1.1,0.5-2c0-0.3,0-0.5-0.1-0.8C21.5,31.7,21.3,31.4,21.1,31.2z"/>
											<path id="XMLID_22_" fill="#CC4B4C" d="M6.1,27.1v10.1c0,0.5,0.4,0.9,0.9,0.9h26c0.5,0,0.9-0.4,0.9-0.9V27.1H6.1z M16,32.6
												c-0.1,0.3-0.3,0.5-0.5,0.7s-0.4,0.3-0.7,0.4c-0.3,0.1-0.6,0.2-0.9,0.2h-0.8v2.4H12v-6.5h1.9c0.3,0,0.6,0,0.8,0.1
												c0.3,0.1,0.5,0.2,0.7,0.4s0.4,0.4,0.5,0.6c0.1,0.3,0.2,0.5,0.2,0.8C16.2,32,16.2,32.3,16,32.6z M22.6,34.1c-0.1,0.4-0.3,0.7-0.4,1
												c-0.2,0.3-0.4,0.5-0.6,0.6S21.1,36,20.9,36c-0.2,0.1-0.4,0.1-0.6,0.1c-0.2,0-0.3,0-0.4,0h-2.5v-6.5h2c0.6,0,1,0.1,1.5,0.3
												c0.4,0.2,0.8,0.4,1,0.7s0.5,0.6,0.6,1c0.1,0.4,0.2,0.8,0.2,1.1C22.7,33.3,22.7,33.8,22.6,34.1z M28.4,30.5h-3v2.1h2.7v0.7h-2.7v2.9
												h-1.1v-6.5h4.1V30.5z"/>
										</g>
									</svg>
								</i>
								<span>.pdf 623kb  (Last Updated: Sep 22 2020)</span>
							</div>
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
							<div className="label txt-icon rtl">
								<i>
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
										<path fill="#207245" d="M36,8.5H22.4v4.2h3.1c0.6,0,1,0.5,1,1c0,0.6-0.5,1-1,1h-3.1v2.1h3.1c0.6,0,1,0.5,1,1
											c0,0.6-0.5,1-1,1h-3.1V21h3.1c0.6,0,1,0.5,1,1c0,0.6-0.5,1-1,1h-3.1v2.1h3.1c0.6,0,1,0.5,1,1c0,0.6-0.5,1-1,1h-3.1v4.2H36
											c0.6,0,1-0.5,1-1V9.6C37,9,36.5,8.5,36,8.5z M31.8,27.3h-2.1c-0.6,0-1-0.5-1-1c0-0.6,0.5-1,1-1h2.1c0.6,0,1,0.5,1,1
											C32.8,26.8,32.4,27.3,31.8,27.3z M31.8,23.1h-2.1c-0.6,0-1-0.5-1-1c0-0.6,0.5-1,1-1h2.1c0.6,0,1,0.5,1,1
											C32.8,22.7,32.4,23.1,31.8,23.1z M31.8,19h-2.1c-0.6,0-1-0.5-1-1c0-0.6,0.5-1,1-1h2.1c0.6,0,1,0.5,1,1C32.8,18.5,32.4,19,31.8,19
											z M31.8,14.8h-2.1c-0.6,0-1-0.5-1-1c0-0.6,0.5-1,1-1h2.1c0.6,0,1,0.5,1,1C32.8,14.3,32.4,14.8,31.8,14.8z"/>
										<path fill="#207245" d="M21.3,4.6c-0.2-0.2-0.6-0.3-0.9-0.2L3.8,7.5C3.4,7.6,3,8,3,8.5v22.9
											c0,0.5,0.4,0.9,0.8,1l16.6,3.1c0.1,0,0.1,0,0.2,0c0.2,0,0.5-0.1,0.7-0.2c0.2-0.2,0.4-0.5,0.4-0.8v-3.1v-4.2v-2.1v-2.1V21V19v-2.1
											v-2.1v-2.1V8.5V5.4C21.7,5.1,21.6,4.8,21.3,4.6z M17.2,25c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.6-0.1-0.8-0.4l-3-3.5l-2.7,3.4
											c-0.2,0.3-0.5,0.4-0.8,0.4c-0.2,0-0.4-0.1-0.6-0.2c-0.5-0.4-0.5-1-0.2-1.5l2.9-3.7l-2.9-3.3c-0.4-0.4-0.3-1.1,0.1-1.5
											c0.4-0.4,1.1-0.3,1.5,0.1l2.6,3l3.1-4c0.4-0.5,1-0.5,1.5-0.2c0.5,0.4,0.5,1,0.2,1.5L14,19.7l3.3,3.8C17.7,23.9,17.6,24.6,17.2,25
											z"/>
									</svg>
								</i>
								<span>.xls 123kb  (Last Updated: May 11 2020)</span>
							</div>
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

					</div>

				</section>
				<footer>

				</footer>
			</section>
		</>
	);
}

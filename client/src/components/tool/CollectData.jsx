import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pushView } from "../../reducers/view";

// icons
import DownloadIcon from "../icons/Download";
import PdfIcon from "../icons/Pdf";
import XlsIcon from "../icons/Xls";

export default function CollectData(props) {
	const urlFieldGuide = "#";
	const urlDataInputTemplate = "#";
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "Collect", path: "/collect" }));
	}, []);

	return (
		<>
			<section
				id="collect-data"
				className="content-window bleed-edges rich-text"
			>
				<header>
					<div className="content-window-title txt-condensed">
						Step 1. Field Guide &amp; Data Input
					</div>
					<div className="content-window-title-description">
						<p>
							We have provided a handy field guide to help set up
							a good data collection process at your campsite, and
							already got a data input template file available for
							download too.
						</p>
					</div>
				</header>
				<section>
					<div className="step-1 field-guide">
						<div className="text">
							<a
								className="txt-icon button yellow"
								href={urlFieldGuide}
							>
								<i>
									<DownloadIcon />
								</i>
								<span>Field Data Collection Protocol</span>
							</a>
							<div className="label txt-icon rtl">
								<i>
									<PdfIcon />
								</i>
								<span>
									.pdf 623kb (Last Updated: Sep 22 2020)
								</span>
							</div>
							<div className="rte">
								<p>
									Collect field data following our guide to
									help you and your team to set up a Data
									Colletion process
								</p>
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
								href={urlDataInputTemplate}
							>
								<i>
									<DownloadIcon />
								</i>
								<span>Data Input Template</span>
							</a>
							<div className="label txt-icon rtl">
								<i>
									<XlsIcon />
								</i>
								<span>
									.xls 123kb (Last Updated: May 11 2020)
								</span>
							</div>
							<div className="rte">
								<span className="txt-icon notice">
									<i>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											xmlnsXlink="http://www.w3.org/1999/xlink"
											viewBox="0 0 40 40"
										>
											<circle
												fill="#929EAC"
												cx="20"
												cy="20"
												r="20"
											/>
											<line
												fill="none"
												stroke="#FCFCFC"
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
												x1="20"
												y1="10"
												x2="20"
												y2="21.1"
											/>
											<circle
												fill="#F6F7F7"
												cx="20"
												cy="29.2"
												r="2.5"
											/>
										</svg>
									</i>
									<span>
										Please do not remove any columns or
										rows.
									</span>
								</span>
								<span className="txt-icon notice">
									<i>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											xmlnsXlink="http://www.w3.org/1999/xlink"
											viewBox="0 0 40 40"
										>
											<circle
												fill="#929EAC"
												cx="20"
												cy="20"
												r="20"
											/>
											<line
												fill="none"
												stroke="#FCFCFC"
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
												x1="20"
												y1="10"
												x2="20"
												y2="21.1"
											/>
											<circle
												fill="#F6F7F7"
												cx="20"
												cy="29.2"
												r="2.5"
											/>
										</svg>
									</i>
									<span>
										Enter your field data under the correct
										headings following the instructions on
										the form and here, paying attention to
										the units and format of the data.
									</span>
								</span>
								<span className="txt-icon notice">
									<i>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											xmlnsXlink="http://www.w3.org/1999/xlink"
											viewBox="0 0 40 40"
										>
											<circle
												fill="#929EAC"
												cx="20"
												cy="20"
												r="20"
											/>
											<line
												fill="none"
												stroke="#FCFCFC"
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
												x1="20"
												y1="10"
												x2="20"
												y2="21.1"
											/>
											<circle
												fill="#F6F7F7"
												cx="20"
												cy="29.2"
												r="2.5"
											/>
										</svg>
									</i>
									<span>
										You need Microsoft Office 2007 or a
										compatible Office suite to view the
										Excel template.
									</span>
								</span>
							</div>
						</div>

						<figure className="image show-medium-up">
							<img
								src="/assets/tool/collect-data-data-input-template.png"
								alt=""
							/>
						</figure>
					</div>
				</section>
				<footer></footer>
			</section>
		</>
	);
}

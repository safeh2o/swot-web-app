import { Divider } from "@mui/material";
import LinkCard from "../LinkCard";

export default function CollectData() {
	const urlFieldGuide =
		"https://gitcdn.link/cdn/safeh2o/swot-web-assets/master/SWOT_Field_Data_Protocol_Sep2020.pdf";
	const urlDataInputTemplate =
		"https://github.com/safeh2o/swot-web-assets/blob/master/DataInputTemplate_ver2.0.xlsx?raw=true";

	return (
		<>
			<section>
				<div className="section-wrap">
					<div className="app-card">
						<h1 className="section-subtitle">Collecting Data</h1>

						<Divider sx={{ my: 1 }} />

						<div className="rte">
							<div className="tool-guides">
								<h2>a. Guides</h2>
								<ul className="flat">
									<li>
										<a
											href={urlFieldGuide}
											target="_blank"
											rel="noreferrer"
										>
											<figure className="image">
												<img
													src={
														"/assets/tool/collect/thumb-protocol.png"
													}
													alt="field protocol thumbnail"
												/>
											</figure>
										</a>
										<div className="content">
											<h3>Field Protocol</h3>
											<p>
												Overview of your teams equipment
												needs, and data collection
												procedures
											</p>
											<a
												href={urlFieldGuide}
												target="_blank"
												rel="noreferrer"
											>
												Download .pdf
											</a>
										</div>
									</li>
									<li>
										<a
											href="https://youtu.be/gCLWzPoBqCk"
											target="_blank"
											rel="noreferrer"
										>
											<figure className="image">
												<img
													src={
														"/assets/tool/collect/thumb-how-to-video.png"
													}
													alt="data collection thumbnail"
												/>
											</figure>
										</a>
										<div className="content">
											<h3>How to Collect Data</h3>
											<p>
												This video gives an overview of
												how to use the SWOT, from
												planning and data collection, to
												uploading data and running your
												first analysis.
											</p>
											<h4>
												<strong>Video Chapters</strong>
											</h4>
											<ol>
												<li>
													<a
														href={
															"https://youtu.be/gCLWzPoBqCk?t=126"
														}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														Equipment
													</a>
												</li>

												<li>
													<a
														href={
															"https://youtu.be/gCLWzPoBqCk?t=165"
														}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														Staff &amp;
														Communications
													</a>
												</li>
												<li>
													<a
														href={
															"https://youtu.be/gCLWzPoBqCk?t=226"
														}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														Collection Methods
													</a>
												</li>
											</ol>
										</div>
									</li>
								</ul>
								<article>
									<figure className="image"></figure>
									<div className="content"></div>
								</article>
							</div>
							<Divider sx={{ my: 1 }} />
							<div className="tool-forms">
								<h2>b. Forms</h2>
								<ul className="flat">
									<li>
										<a
											href={urlFieldGuide}
											target="_blank"
											rel="noreferrer"
										>
											<figure className="image">
												<img
													src={
														"/assets/tool/collect/thumb-manual-monitoring-forms.png"
													}
													alt="pen and paper forms thumbnail"
												/>
											</figure>
										</a>
										<div className="content">
											<h3>
												<strong>Pen and Paper</strong>
											</h3>
											{/* <p></p> */}
											<a
												href={urlFieldGuide}
												target="_blank"
												rel="noreferrer"
											>
												Download .pdf
											</a>
										</div>
									</li>
									<li>
										<a
											href={urlFieldGuide}
											target="_blank"
											rel="noreferrer"
										>
											<figure className="image">
												<img
													src={
														"/assets/tool/collect/thumb-kobo-monitoring-forms.png"
													}
													alt="kobo monitoring forms thumbnail"
												/>
											</figure>
										</a>
										<div className="content">
											<h3>KOBO Monitoring</h3>
											{/* <p></p> */}
											<a
												href={urlFieldGuide}
												target="_blank"
												rel="noreferrer"
											>
												Download .pdf
											</a>
										</div>
									</li>
								</ul>
							</div>
						</div>

						<Divider sx={{ my: 1 }} />

						<div className="rte">
							<div className="tool-datasets">
								<h2>c. Demo Datasets</h2>

								<ul>
									<li>
										<figure className="image"></figure>
										<div className="content">
											<a href={urlDataInputTemplate}>
												Microsoft XLS
											</a>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/*  */}
					<div className="tool-footer">
						<LinkCard title="Technical Blogs" href="/blog">
							In-depth information on reading your collection
							data, as you continue to monitor your fieldsite(s)
						</LinkCard>
						<LinkCard title="FAQ's" href="/faq">
							Frequently asked questions
						</LinkCard>
					</div>
				</div>
			</section>
		</>
	);
}

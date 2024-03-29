import { Divider } from "@mui/material";
import LinkCard from "../LinkCard";

export default function CollectData() {
	const urlFieldGuide = "/assets/tool/SWOT_Field_Data_Protocol_Sep2020.pdf";

	return (
		<>
			<section>
				<div className="section-wrap">
					<div className="app-card">
						<h1 className="section-subtitle">Collecting Field Data</h1>

						<Divider sx={{ my: 1 }} />

						<div className="rte">
							<div className="tool-guides">
								<ul className="flat">
									<li>
										<a href={urlFieldGuide} target="_blank" rel="noreferrer">
											<figure className="image">
												<img
													src={"/assets/tool/collect/thumb-protocol.png"}
													alt="field protocol thumbnail"
												/>
											</figure>
										</a>
										<div className="content">
											<h2>Protocol for Field Data Collection</h2>
											<p>
												Step-by-step instructions on planning data
												collection and FRC monitoring procedures.
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
											<h2>Overview Video</h2>
											<p>
												Introduction to the SWOT and everything you need to
												get started, including info on:
											</p>
											<ol>
												<li>
													<a
														href={"https://youtu.be/gCLWzPoBqCk?t=165"}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														Staff
													</a>
												</li>
												<li>
													<a
														href={"https://youtu.be/gCLWzPoBqCk?t=126"}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														Equipment
													</a>
												</li>
												<li>
													<a
														href={"https://youtu.be/gCLWzPoBqCk?t=226"}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														FRC paired sampling procedure
													</a>
												</li>
											</ol>
										</div>
									</li>
									<li>
										<figure className="image">
											<img
												src={
													"/assets/tool/collect/thumb-kobo-monitoring-forms.png"
												}
												alt="monitoring forms thumbnail"
											/>
										</figure>
										<div className="content">
											<h2>
												<strong>Monitoring Forms</strong>
											</h2>
											<p>Example forms for recording FRC samples:</p>
											<ol>
												<li>
													<a
														href={"/data/forms/Pen_Paper_Forms.pdf"}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														Pen &amp; paper forms (.pdf)
													</a>
												</li>
												<li>
													<a
														href={"/data/forms/Kobo_ODK_Forms.xlsx"}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														Kobo / ODK forms (.xls)
													</a>
												</li>
												<li>
													<a
														href={
															"/data/forms/Guidance_Digital_Data_Collection.pdf"
														}
														target="_blank"
														rel="noreferrer"
														className="chapter-link"
													>
														Guidance for digital data collection (.pdf)
													</a>
												</li>
											</ol>
										</div>
									</li>
									<li>
										<figure className="image">
											<img
												src={
													"/assets/tool/collect/thumb-example-dataset.png"
												}
												alt="Example datasets thumbnail"
											/>
										</figure>
										<div className="content">
											<h2>Example Datasets</h2>
											<p>
												Just wanting to test the tool? Download these
												datasets from our research and try to upload to
												generate an FRC target:
											</p>
											<ul>
												{/* <li>
													<a href="/data/template/demo_bangladesh.csv">
														Bangladesh
													</a>
												</li> */}
												<li>
													<a href="/data/template/demo_Tanzania.csv">
														Tanzania
													</a>
												</li>
												<li>
													<a href="/data/template/demo_nigeria.csv">
														Nigeria
													</a>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/*  */}
					<div className="tool-footer">
						<LinkCard
							title="Technical Resources"
							href="/blog?page=1&category=Support+%26+Guides"
						>
							In-depth information on reading your collection data, as you continue to
							monitor your fieldsite(s)
						</LinkCard>
						<LinkCard title="FAQs" href="/faq">
							Frequently asked questions
						</LinkCard>
					</div>
				</div>
			</section>
		</>
	);
}

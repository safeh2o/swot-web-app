import { Divider, SvgIcon } from "@mui/material";

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
										<figure className="image">
											<a
												href={urlFieldGuide}
												target="_blank"
												rel="noreferrer"
											></a>
											<img
												src={
													"assets/tool/collect/thumb-protocol.png"
												}
											/>
										</figure>
										<div className="content">
											<h3>Field Protocol</h3>
											<p>
												Overview of team equipments
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
										<figure className="image">
											<a
												href="https://youtu.be/gCLWzPoBqCk"
												target="_blank"
												rel="noreferrer"
											></a>
											<img
												src={
													"assets/tool/collect/thumb-how-to-video.png"
												}
											/>
										</figure>
										<div className="content">
											<h3>How to Collect Data (Video)</h3>
											<p>
												This video gives an overview of
												how to use the SWOT, from
												planning and data collection, to
												uploading data and running your
												first analysis.
											</p>

											<a
												href={
													"https://youtu.be/gCLWzPoBqCk"
												}
												target="_blank"
												rel="noreferrer"
											>
												Watch (Youtube)
											</a>
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
										<figure className="image">
											<a
												href={urlFieldGuide}
												target="_blank"
												rel="noreferrer"
											></a>
											<img
												src={
													"assets/tool/collect/thumb-manual-monitoring-forms.png"
												}
											/>
										</figure>
										<div className="content">
											<h3>
												<storng>Pen and Paper</storng>
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
										<figure className="image">
											<a
												href={urlFieldGuide}
												target="_blank"
												rel="noreferrer"
											></a>
											<img
												src={
													"assets/tool/collect/thumb-kobo-monitoring-forms.png"
												}
											/>
										</figure>
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
						<div className="card rte">
							<h2 className="title">Technical Blogs</h2>
							<div className="text">
								In-depth information on reading your collection
								data, as you continue to monitor your
								fieldsite(s)
							</div>
							<i>
								<SvgIcon
									xmlns="http://www.w3.org/2000/svg"
									width="40px"
									height="40px"
									fill="#000000"
									viewBox="0 0 256 256"
								>
									<path d="M221.7,133.7l-72,72A8.3,8.3,0,0,1,144,208a8.5,8.5,0,0,1-3.1-.6A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,4.9-7.4,8.4,8.4,0,0,1,8.8,1.7l72,72A8.1,8.1,0,0,1,221.7,133.7Z"></path>
								</SvgIcon>
							</i>
						</div>
						<div className="card rte">
							<h2 className="title">FAQ&lsquo;s</h2>
							<div className="text">
								Frequently asked questions
							</div>
							<i>
								<SvgIcon
									xmlns="http://www.w3.org/2000/svg"
									width="40px"
									height="40px"
									fill="#000000"
									viewBox="0 0 256 256"
								>
									<path d="M221.7,133.7l-72,72A8.3,8.3,0,0,1,144,208a8.5,8.5,0,0,1-3.1-.6A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,4.9-7.4,8.4,8.4,0,0,1,8.8,1.7l72,72A8.1,8.1,0,0,1,221.7,133.7Z"></path>
								</SvgIcon>
							</i>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

import { Link as MUILink } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<>
			<section id="notfound">
				<div className="section-wrap">
					<h1 className="section-subtitle">Page Not Found</h1>
					<div>
						{/* <p>The requested link could not load:</p> */}
						<ul className="notfound-links flat">
							<li className="notfound-links-header">
								<MUILink
									href="#"
									className="btn btn-previous-page"
									onClick={() => {
										navigate(-1);
									}}
								>
									← Go Back
								</MUILink>
							</li>
							<li className="notfound-links-col">
								<h3>Tool</h3>
								<ul className="notfound-links flat">
									<li>
										<NavLink
											className={"notfound-link"}
											to={"/"}
											key={"home"}
											title={"home"}
											end
										>
											Dashboard
										</NavLink>
									</li>
									<li>
										<NavLink
											className={"notfound-link"}
											to={"/upload"}
											key={"upload"}
											title={"upload"}
											end
										>
											Upload Data
										</NavLink>
									</li>
									<li>
										<NavLink
											className={"notfound-link"}
											to={"/analyze"}
											key={"analyze"}
											title={"analyze"}
											end
										>
											New Analysis
										</NavLink>
									</li>
									<li>
										<NavLink
											className={"notfound-link"}
											to={"/contact"}
											key={"contact"}
											title={"contact"}
											end
										>
											Contact Us
										</NavLink>
									</li>
								</ul>
							</li>
							<li className="notfound-links-col">
								<h3>About</h3>
								<ul className="notfound-links flat">
									<li>
										<MUILink
											href="https://safeh2o.app/how-it-works.html"
											className="notfound-link"
										>
											How it works
										</MUILink>
									</li>
									<li>
										<MUILink
											href="https://safeh2o.app/research.html"
											className="notfound-link"
										>
											Research
										</MUILink>
									</li>
									<li>
										<NavLink
											className={"notfound-link"}
											to={"/faq"}
											key={"faq"}
											title={"faq"}
											end
										>
											Frequently Asked Questions
										</NavLink>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}

import { Link as MUILink, SvgIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
										<MUILink href="#" className="notfound-link">
											Dashboard
										</MUILink>
									</li>
									<li>
										<MUILink href="#" className="notfound-link">
											Upload Data
										</MUILink>
									</li>
									<li>
										<MUILink href="#" className="notfound-link">
											New Analysis
										</MUILink>
									</li>
									<li>
										<MUILink href="#" className="notfound-link contact">
											Contact Us
										</MUILink>
									</li>
								</ul>
							</li>
							<li className="notfound-links-col">
								<h3>About</h3>
								<ul className="notfound-links flat">
									<li>
										<MUILink href="#" className="notfound-link">
											How it works
										</MUILink>
									</li>
									<li>
										<MUILink href="#" className="notfound-link">
											Research
										</MUILink>
									</li>
									<li>
										<MUILink href="#" className="notfound-link">
											Frequently Asked Questions
										</MUILink>
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

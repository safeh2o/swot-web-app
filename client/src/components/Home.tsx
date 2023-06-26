import { SvgIcon, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userSelectors } from "../reducers/user";
import { IconEnvelope, IconProfile, IconSignIn } from "./icons";
import LinkCard from "./LinkCard";

export default function Home() {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);

	return (
		<>
			<section id="home-profile">
				<div className="section-wrap compact">
					<h1 className="section-subtitle home">
						{(isLoggedIn &&
							"Welcome Back, " +
								(user.name.first ? user.name.first : "User")) ||
							"Welcome Visitor,"}
					</h1>
					{isLoggedIn && (
						<>
							<div className="cards">
								<div className="card rte tool">
									<h2 className="title">
										Start using the SWOT
									</h2>
									<div className="text">
										<p>
											Start at step 1 or pick up where you
											left off
										</p>
										<ol className="tool-menu-mobile con">
											<li>
												<NavLink to={"/collect"}>
													Planning &amp; Data
													Collection
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
												</NavLink>
											</li>
											<li>
												<NavLink to={"/upload"}>
													Uploading Data
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
												</NavLink>
											</li>
											<li>
												<NavLink to={"/analyze"}>
													Running Your Analysis
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
												</NavLink>
											</li>
											<li>
												<NavLink to={"/results"}>
													Obtain Results
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
												</NavLink>
											</li>
										</ol>
									</div>
								</div>
								<LinkCard
									title="Quickstart Guide"
									href="/assets/tool/SWOT_Quickstart.pdf"
									target="_blank"
									csr={false}
								>
									Quick PDF guide on how to get started using
									the tool.
								</LinkCard>
								<LinkCard
									title="Technical Resources"
									href="/blog?page=1&category=Support+%26+Guides"
								>
									Detailed guidance on how to use the
									SWOT—from field data collection to
									interpretation of results.
								</LinkCard>
								<LinkCard title="FAQs" href="/faq">
									Frequently asked questions
								</LinkCard>
							</div>
						</>
					)}
					<div className="options">
						{(!isLoggedIn && (
							<>
								<div className="option request">
									<Link to="/contact" className="i">
										<IconProfile />
									</Link>
									<Typography component={"p"}>
										<Link to="/contact">Request</Link> an
										account.
									</Typography>
								</div>
								<div className="option">
									<Link to="/signin" className="i">
										<IconSignIn />
									</Link>
									<p>
										<Link to="/signin">Sign in</Link> to
										your account.
									</p>
								</div>
							</>
						)) || (
							<>
								<div className="option contact">
									<Link to="/contact" className="i">
										<IconEnvelope />
									</Link>
									<p>
										Need help?{" "}
										<Link to="/contact">Contact Us</Link>
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			</section>
		</>
	);
}

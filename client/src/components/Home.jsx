import { Box, SvgIcon, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelectors } from "../reducers/user";
import { IconArrowHome, IconEnvelope, IconSignIn, IconProfile } from "./icons";

export default function Home() {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);

	return (
		<>
			<section id="home-profile">
				<div
					className={
						(!isLoggedIn && "section-wrap compact") ||
						"section-wrap"
					}
				>
					<h1 className="section-subtitle">
						{(isLoggedIn &&
							"Welcome Back, " +
								(user.name.first ? user.name.first : "User")) ||
							"Welcome Visitor,"}
					</h1>
					{isLoggedIn && (
						<>
							<Box className="cards">
								<Box className="card rte tool">
									<h2 className="title">Tool</h2>
									<div className="text">
										Use the Tool to begin or continue your
										SWOT Process
									</div>
									<i>
										<SvgIcon
											xmlns="http://www.w3.org/2000/svg"
											width="40px"
											height="40px"
											fill="#000000"
											viewBox="0 0 256 256"
										>
											<path d="M224,128a8,8,0,0,1-8,8H120v64a8,8,0,0,1-4.9,7.4,8.5,8.5,0,0,1-3.1.6,8.3,8.3,0,0,1-5.7-2.3l-72-72a8.1,8.1,0,0,1,0-11.4l72-72a8.4,8.4,0,0,1,8.8-1.7A8,8,0,0,1,120,56v64h96A8,8,0,0,1,224,128Z"></path>
										</SvgIcon>
									</i>
								</Box>
								<Box className="card rte">
									<h2 className="title">Quickstart Guide</h2>
									<div className="text">
										Download our guide for a quick overview
										of the app and how to ...
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
								</Box>
								<Box className="card rte">
									<h2 className="title">Technical Blogs</h2>
									<div className="text">
										In-depth information about your
										collection data as you continue to
										monitor your fieldsite(s)
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
								</Box>
								<Box className="card rte">
									<h2 className="title">FAQ&lsquo;s</h2>
									<div className="text">
										Go over out Frequently asked questions
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
								</Box>
							</Box>
						</>
					)}
					<Box className="options">
						{(!isLoggedIn && (
							<>
								<Box className="option request">
									<i>
										<IconProfile />
									</i>
									<Typography component={"p"}>
										<Link to="/contact">Request</Link> an
										account.
									</Typography>
								</Box>
								<Box className="option">
									<i>
										<IconSignIn />
									</i>
									<Typography component={"p"}>
										<Link to="/signin">Sign in</Link> to
										your account.
									</Typography>
								</Box>
							</>
						)) || (
							<>
								<Box className="option">
									<i>
										<IconEnvelope />
									</i>
									<Typography component={"p"}>
										Need help?{" "}
										<Link to="/contact">Contact Us</Link>
									</Typography>
								</Box>
							</>
						)}
					</Box>
				</div>
			</section>
		</>
	);
}

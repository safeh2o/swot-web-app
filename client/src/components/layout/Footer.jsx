import { Box, Button, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Footer() {
	return (
		<>
			<Box component={"footer"} className="site-footer">
				<Box component={"section"} id="organisations">
					<Box className="wrap">
						<Typography component={"h2"} className="section-title">
							The SWOT is a free and open-source tool brought to
							you by:
						</Typography>
						<Box className="project-leads">
							<a
								target="_blank"
								href="https://www.yorku.ca/dighr/"
								rel="noreferrer"
								className={"organisation"}
							>
								<img
									src="/assets/organisations/dighr.svg"
									alt=" logo"
									width="200"
									height="200"
								/>
							</a>
							<a
								target="_blank"
								href="https://humanitariangrandchallenge.org/"
								rel="noreferrer"
								className={"organisation"}
							>
								<img
									src="/assets/organisations/hgc.svg"
									alt=" logo"
									width="540"
									height="540"
								/>
							</a>
							<a
								target="_blank"
								href="https://www.doctorswithoutborders.ca/"
								rel="noreferrer"
								className={"organisation wide"}
							>
								<img
									src="/assets/organisations/dwb.svg"
									alt=" logo"
									width="1599.6"
									height="465.8"
								/>
							</a>
						</Box>
						{/* <Typography component={"h2"} className="section-title">
							With support from:
						</Typography>
						<Box className="project-funding">
							<div>
								<a
									className="wide"
									target="_blank"
									href="https://www.achmea.nl/en/foundation"
									rel="noreferrer"
								>
									<img
										src="./public/assets/organisations/achmea.svg"
										alt=" logo"
										width="560"
										height="106"
									/>
								</a>
								<a
									className="wide"
									target="_blank"
									href="https://www.grandchallenges.ca/programs/creating-hope-conflict/"
									rel="noreferrer"
								>
									<img
										src="./public/assets/organisations/grandchallenges.svg"
										alt=" logo"
										width="321.7"
										height="97.5"
									/>
								</a>
							</div>
						</Box> */}
					</Box>
				</Box>
				<Box component={"section"} id="connect">
					<Typography component={"h2"} className="section-title">
						Follow Us
					</Typography>
					<Grid
						spacing={3}
						container
						justifyContent={"center"}
						alignItems="center"
					>
						<Grid item>
							<a
								href="https://www.linkedin.com/company/dighr/"
								target="_blank"
								rel="noreferrer"
							>
								<span>LinkedIn</span>
							</a>
						</Grid>
						<Grid item>
							<a
								href="https://twitter.com/safeh2oapp"
								target="_blank"
								rel="noreferrer"
							>
								<span>Twitter</span>
							</a>
						</Grid>
						<Grid item>
							<a
								href="https://www.youtube.com/channel/UCAoYWw3iKSpFZspbMGhMq7g"
								target="_blank"
								rel="noreferrer"
							>
								<span>YouTube</span>
							</a>
						</Grid>
					</Grid>
				</Box>
				<Box component={"section"} id="colophon">
					<Box component="span">
						&copy; {new Date().getFullYear()} Safe Water
						Optimization Tool{" "}
					</Box>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<NavLink to="/pages/terms-of-use">
						<span>Terms of Use</span>
					</NavLink>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<NavLink to="/pages/privacy-policy">
						<span>Privacy Policy</span>
					</NavLink>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<NavLink to="/pages/cookie-policy">
						<span>Cookie Policy</span>
					</NavLink>
				</Box>
			</Box>
			<Box className="site-cookies">
				<Box className="wrap">
					<Typography component={"p"}>
						This website uses cookies. To learn more, visit our{" "}
						<NavLink
							className="sticky-cookies-popup-policies"
							to="/pages/cookie-policy"
						>
							{" "}
							Cookie Policy
						</NavLink>
						.
					</Typography>
					<Button>Accept</Button>
				</Box>
			</Box>
		</>
	);
}

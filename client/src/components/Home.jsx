import { Box, Typography } from "@mui/material";
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
					<Box className="options">
						{(!isLoggedIn && (
							<>
								<Typography component={"h1"} variant="body1">
									{isLoggedIn &&
										"Welcome Back, " +
											(user.name.first
												? user.name.first
												: "User")}
								</Typography>
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
										<IconArrowHome />
									</i>
									<Typography variant="p">
										Use the Tool menu to begin or continue
										your SWOT Process
									</Typography>
								</Box>
								<Box className="option">
									<i>
										<IconEnvelope />
									</i>
									<Typography component={"p"}>
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

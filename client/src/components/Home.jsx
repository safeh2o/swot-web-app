import {
	Box,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blogSelectors, getPosts } from "../reducers/posts";
import { userSelectors } from "../reducers/user";
import { Home as css } from "../styles/styles";
import { IconArrowHome, IconProfile, IconSignIn } from "./icons"; // IconQuestionMark
import Posts from "./Posts";

export default function Home() {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);
	const posts = useSelector(blogSelectors.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	const privilegedContent = () => {
		return (
			<>
				<Box sx={{ ...css.userPanel }}>
					<Box sx={{ ...css.action, ...css.actionSwot }}>
						{(!isLoggedIn && (
							<>
								<Box>
									<IconProfile
										sx={{
											width: "2.5rem",
											height: "2.5rem",
										}}
									/>
									<Typography variant="h3" component={"p"}>
										<Link to="/contact">Request</Link> an
										account for you or your team members.
									</Typography>
								</Box>
								<Box>
									<IconSignIn
										sx={{
											width: "2.5rem",
											height: "2.5rem",
										}}
									/>
									<Typography variant="h3" component={"p"}>
										<Link to="/signin">Sign in</Link> to
										begin or continue your SWOT Process.
									</Typography>
								</Box>
							</>
						)) || (
							<>
								<IconArrowHome
									viewBox="0 0 256 256"
									sx={{
										width: "2.5rem",
										height: "2.5rem",
									}}
								/>
								<Typography variant="h3">
									Use the Tool menu to begin or continue your
									SWOT Process
								</Typography>
							</>
						)}
					</Box>
					<Box sx={{ ...css.actionGuide }}>
						<Typography component="p">
							For help, <Link to="/contact">Contact Us</Link>
						</Typography>
					</Box>
				</Box>
			</>
		);
	};

	return (
		<>
			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				{(!isLoggedIn && "Welcome, Guest") ||
					"Welcome Back, " +
						(user.name.first ? user.name.first : "User")}
			</Typography>

			{privilegedContent()}

			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				Latest News
			</Typography>

			<Posts type={"news"} data={posts.slice(0, 3)} />
			<Card sx={{ ...css.cardElement, ...css.news }}>
				<CardActions className="more" sx={{ p: 2 }}>
					<Divider sx={{ mb: 1 }} />
					<Link to="/blog">
						<Typography variant="body1">More News</Typography>
					</Link>
				</CardActions>
			</Card>
		</>
	);
}

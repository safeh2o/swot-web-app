import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
	Card,
	CardHeader,
	Divider,
	CardContent,
	CardActions,
	SvgIcon,
} from "@mui/material";
import { Typography, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { IconProfile, IconSignIn, IconQuestionMark } from "./icons";

import Posts from "./Posts";

import { clearViewStack } from "../reducers/view";

import { userSelectors } from "../reducers/user";
import { blogSelectors, getPosts } from "../reducers/posts";

export default function Home() {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);
	const posts = useSelector(blogSelectors.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearViewStack());
		dispatch(getPosts());
	}, []);

	// Styles
	const css = {
		action: {
			p: 3,
			mb: 4,
			borderRadius: "6px",
			"& a": {
				color: "inherit",
				fontWeight: "500",
			},
			"& .MuiTypography-root": {
				maxWidth: "33ch",
			},
		},
		actionSwot: {
			color: "#ffe5ed",
			backgroundColor: "#d05478",
		},
		actionGuide: {
			color: "#fff",
			backgroundColor: "#f4c639",
			"& .MuiTypography-root": {
				maxWidth: "100%",
			},
		},
		cardElement: {
			overflow: "visible",
			marginBottom: "30px",
			"& .MuiCardContent-root": {
				p: 2,
				"&:last-child": {
					p: 2,
				},
			},
		},
		news: {
			backgroundColor: "#fcfcfc",
			"& article": {
				maxWidth: "45ch",
				mb: 4,
			},
			"& .MuiCardActions-root": {
				"& a": {
					color: "inherit",
				},
			},
		},
		organisations: {
			"& a[href]": {
				display: "block",
				maxWidth: "125px",
				maxHeight: "125px",
				"& svg": {
					maxWidth: "125px",
					maxHeight: "125px",
				},
				"&.wide": {
					maxWidth: "200px",
					"& svg": {
						maxWidth: "200px",
					},
				},
			},
		},
	};

	const privilegedContent = () => {
		return (
			<Box>
				<Grid
					container
					alignItems={"center"}
					sx={{ ...css.action, ...css.actionSwot }}
				>
					{(!isLoggedIn && (
						<>
							<Grid item xs={"auto"} sx={{ marginRight: 3 }}>
								<IconProfile
									sx={{
										width: "2.5rem",
										height: "2.5rem",
										fill: "#d05478",
										backgroundColor: "currentColor",
										borderRadius: "2.5rem",
									}}
								/>
							</Grid>
							<Grid item xs={"auto"}>
								<Typography variant="h3">
									Visit our contact page to{" "}
									<Link to="/contact">Request</Link> an
									account for you or your team members.
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Divider sx={{ my: 2 }} />
							</Grid>
							<Grid item xs={"auto"} sx={{ marginRight: 3 }}>
								<IconSignIn
									sx={{
										width: "2.5rem",
										height: "2.5rem",
									}}
								/>
							</Grid>
							<Grid item xs={"auto"}>
								<Typography variant="h3">
									Or, <Link to="/signin">Sign in</Link> to
									your account to begin the SWOT Process.
								</Typography>
							</Grid>
						</>
					)) || (
						<>
							<Grid item xs={"auto"} sx={{ marginBottom: 2 }}>
								<SvgIcon
									viewBox="0 0 32 32"
									sx={{
										width: "2.5rem",
										height: "2.5rem",
									}}
								>
									<path d="M3.2,16.9L9.3,23c0.4,0.4,1.1,0.5,1.5,0.4c0.4-0.3,0.8-0.7,0.8-1.2v-4.5h16.2c0.9,0,1.6-0.7,1.6-1.6c0-0.9-0.7-1.6-1.6-1.6 H11.6V9.9c0-0.5-0.4-1.1-0.8-1.2c-0.3-0.1-0.4-0.1-0.5-0.1C9.9,8.6,9.6,8.9,9.3,9l-6.1,6.1c-0.4,0.3-0.4,0.5-0.4,0.9 C2.8,16.3,3.1,16.6,3.2,16.9z" />
								</SvgIcon>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h3">
									Begin the swot procedure at{" "}
									<Link to="/collect">Step #1</Link> to set up
									a data collection procedure for you or your
									team.
								</Typography>
							</Grid>
						</>
					)}
				</Grid>
			</Box>
		);
	};

	return (
		<>
			<Typography
				component={"h1"}
				variant="body1"
				sx={{
					mb: 2,
					fontSize: "1.75rem",
					fontWeight: "400",
					fontFamily: '"Roboto Condensed", sans-serif',
					lineHeight: "1.2",
					letterSpacing: "-0.02em",
					color: "#747e87",
					paddingBottom: "5px",
					margin: "8px 0 16px 8px",
				}}
			>
				{(!isLoggedIn && "Welcome, Guest") ||
					"Welcome Back, " +
						(user.name.first ? user.name.first : "User")}
			</Typography>

			{privilegedContent()}

			<Box>
				<Grid
					container
					alignItems={"center"}
					sx={{ ...css.action, ...css.actionGuide }}
				>
					<Grid item xs={12} sx={{ marginBottom: 2 }}>
						<IconQuestionMark
							sx={{
								width: "2.5rem",
								height: "auto",
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h2" gutterBottom>
							Getting Started:
						</Typography>
						<Typography variant="h3" component="p" gutterBottom>
							<Link
								to="https://www.safeh2o.app/public/SWOT_Quickstart.pdf"
								target={"_blank"}
							>
								Download
							</Link>{" "}
							this quick start guide for an overview of the SWOT
							process, from planning considerations to monitoring,
							uploading data and running your first analysis.
						</Typography>
						<Typography variant="h3" component="p">
							Fore more information contact the SWOT team at{" "}
							<Link to="mailto:hello@safeh2o.app">
								hello@safeh2o.app
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Box>

			<Card sx={{ ...css.cardElement, ...css.news }}>
				<CardHeader
					title={"Latest News"}
					titleTypographyProps={{
						variant: "subtitle1",
						fontWeight: "400",
					}}
				/>

				<Divider />

				<CardContent>
					<Posts type={"news"} data={posts.slice(0, 2)} />
				</CardContent>

				<CardActions className="more" sx={{ p: 2 }}>
					<Divider sx={{ mb: 1 }} />
					<Link to="/blog">
						<Typography variant="body1">More News</Typography>
					</Link>
				</CardActions>
			</Card>

			<Card sx={{ ...css.cardElement, ...css.organisations }}>
				<CardHeader
					title={"Organisations"}
					titleTypographyProps={{
						variant: "subtitle1",
						fontWeight: "400",
					}}
				/>

				<Divider />

				<CardContent>
					<Grid
						container
						spacing={2}
						className="project-leads"
						sx={{ mb: 4 }}
					>
						<Grid item>
							<Typography
								variant="h2"
								gutterBottom
								sx={{ fontWeight: "500" }}
							>
								Leads
							</Typography>
							<Typography variant="p">
								This project is implemented by:
							</Typography>
						</Grid>
						<Grid container item spacing={6} alignItems="center">
							<Grid item xs={"auto"}>
								<Link
									target="_blank"
									to="http://dighr.yorku.ca/"
									rel="noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 200 200"
										preserveAspectRatio="minXminY slice"
									>
										<path
											fill="#004B8D"
											d="M0 0h200v200H0z"
										></path>
										<path
											fill="none"
											d="M0 0h200v200H0z"
										></path>
										<path
											fill="#FFF"
											d="M32.1 35.9c0 4.7-3 6.7-6.5 6.7h-3.7V29.1h3.7c3.5 0 6.5 2 6.5 6.8m-2.1 0c0-2.8-1.3-4.8-4.5-4.8h-1.7v9.5h1.7c3.2 0 4.5-1.9 4.5-4.7m19.2 6.7H47l-1.1-3.2h-5.4l-1.1 3.2h-2.1l4.8-13.4h2.1l5 13.4zm-3.9-5l-1.1-3.1c-.3-1-.9-2.5-1-3.1-.2.6-.6 2.1-1 3.1l-1.1 3.1h4.2zm20.6-8.5h-2v5.4h-6.2v-5.4h-2v13.4h2v-6h6.2v6h2V29.1zm17.5 6.8c0 4.7-3 6.7-6.5 6.7h-3.7V29.1h3.7c3.6 0 6.5 2 6.5 6.8m-2 0c0-2.8-1.3-4.8-4.5-4.8h-1.7v9.5h1.7c3.1 0 4.5-1.9 4.5-4.7m19.1 6.7h-2.2l-1.1-3.2h-5.4l-1.1 3.2h-2.1l4.8-13.4h2.1l5 13.4zm-3.9-5l-1.1-3.1c-.3-1-.9-2.5-1-3.1-.2.6-.6 2.1-1 3.1l-1.1 3.1h4.2zm19.1 3H109V29.1h-2v13.4h8.7v-1.9zm15.5 0h-6.9v-4.2h3.9v-2h-3.9v-3.3h6.6v-2h-8.7v13.4h8.9v-1.9zm16.9-11.5h-2v5.4h-6.2v-5.4h-2v13.4h2v-6h6.2v6h2V29.1zM22 65.6h2V52.2h-2v13.4zm19.8-13.4h-2v10.1c-.2-.3-.8-1.3-1.1-1.9l-5.1-8.2h-2.1v13.4h2V55.5c.2.3.7 1.2 1 1.7l5.4 8.4h1.9V52.2zm16.6 9.6c0-2.4-1.7-3.2-4.3-4.1-2.3-.7-2.9-1.2-2.9-2.1 0-.9.7-1.7 2.2-1.7 1.3 0 2.3.4 3.1 1.3l1.4-1.4c-1.2-1.2-2.6-1.8-4.4-1.8-2.5 0-4.4 1.4-4.4 3.7 0 2.4 1.4 3.1 4.2 4 2.2.7 3 1.2 3 2.2 0 1.3-.9 2-2.8 2-1.3 0-2.6-.6-3.5-1.6l-1.4 1.4c1.1 1.3 2.8 2.2 4.8 2.2 3.5-.1 5-1.7 5-4.1M74 52.2h-9.9v2H68v11.5h2V54.2h4v-2zm6.8 13.4h2V52.2h-2v13.4zm18.6-13.4h-9.9v2h3.9v11.5h2V54.2h3.9v-2zm16.9 0h-2V60c0 2.5-1 3.8-3.1 3.8-2 0-3.1-1.4-3.1-3.9v-7.7h-2V60c0 3.7 1.7 5.9 5 5.9s5.2-2.1 5.2-5.8v-7.9zm16.4 0h-9.9v2h3.9v11.5h2V54.2h3.9v-2zm15.7 11.5h-6.9v-4.2h3.9v-2h-3.9v-3.3h6.6v-2h-8.7v13.4h8.9v-1.9zm12.4-7.5h-6.1v9.4h1.4v-4.2h2.7V60h-2.7v-2.5h4.7v-1.3zm8.2 4.7c0 2.9-1.6 4.9-4 4.9s-4-1.9-4-4.8 1.6-4.9 4-4.9 4 1.9 4 4.8m-1.4 0c0-2.1-1.1-3.5-2.6-3.5s-2.5 1.3-2.5 3.4c0 2.1 1.1 3.5 2.6 3.5 1.4.1 2.5-1.2 2.5-3.4m9.9-1.9c0 1.5-.8 2.4-2.1 2.8l1.9 3.8h-1.6l-1.9-3.7h-2.1v3.7h-1.4v-9.4h4.1c1.7 0 3.1.9 3.1 2.8m-1.4.1c0-1-.6-1.5-1.6-1.5h-2.7v3h2.7c.9 0 1.6-.5 1.6-1.5M38.6 89.7h-7.2v3.8h3.2c-.2 1.8-1.2 3.1-3.9 3.1-3 0-4.8-2.7-4.8-6.5 0-3.7 1.7-6.4 4.8-6.4 2.2 0 3.1 1.1 3.9 2.6l3.8-1.6c-1.3-3.1-3.5-5-7.6-5-5.3 0-9 4.3-9 10.4 0 6.4 3.5 10.4 8.8 10.4 4.7 0 8.1-2.9 8.1-8.1v-2.7zm20.7 6.5H49.2V80h-4v20.2h14.1v-4zm45-2.5c0 4.2-2.9 6.5-7.2 6.5H88V80h9.2c3.9 0 6.4 1.9 6.4 5.3 0 1.7-.8 3.1-2.1 3.9 1.6.8 2.8 2.3 2.8 4.5m-4.7-8c0-1.3-.7-1.9-2.5-1.9H92v3.8h5.3c1.7 0 2.3-.8 2.3-1.9m.6 8c0-1.7-.9-2.6-2.9-2.6H92v5.2h5.4c1.9 0 2.8-1 2.8-2.6m27.8 6.5h-4.4l-1.6-4.5h-7.4l-1.6 4.5h-4.3l7.7-20.2h3.9l7.7 20.2zm-7.4-8.3l-1.3-3.7c-.4-1.2-.8-2.4-1-3.1-.2.7-.6 2-1 3.1l-1.3 3.7h4.6zm27.6 4.3h-10.1V80h-4v20.2h14.1v-4zM39 114.6h-4v7.7h-8.3v-7.7h-4v20.2h4v-8.5H35v8.5h4v-20.2zm22.7 16.2H51.3v-4.9H57V122h-5.8v-3.5h10v-3.9h-14v20.2h14.4v-4zm25.1 3.9h-4.4l-1.6-4.5h-7.4l-1.6 4.5h-4.3l7.7-20.2h3.9l7.7 20.2zm-7.4-8.3l-1.3-3.7c-.4-1.2-.8-2.4-1-3.1-.2.7-.6 2-1 3.1l-1.3 3.7h4.6zm28.3 4.4H97.6v-16.2h-4v20.2h14.1v-4zm17.2-16.2h-15.6v4h5.8v16.2h4v-16.2h5.8v-4zm23.2 0h-4v7.7h-8.3v-7.7h-4v20.2h4v-8.5h8.3v8.5h4v-20.2zM39 169.3h-4.6l-3.6-7.3h-4.1v7.3h-4v-20.2h9.4c3.8 0 6.9 2.1 6.9 6.4 0 3-1.3 4.9-3.9 5.9l3.9 7.9zm-4.1-13.7c0-1.8-1.1-2.6-2.9-2.6h-5.3v5.2H32c1.9 0 2.9-.8 2.9-2.6m22.8 9.8H47.3v-4.9h5.8v-3.9h-5.8v-3.5h10v-3.9h-14v20.2h14.4v-4zm18.6-2.2c0-4.4-3.5-5.5-6.7-6.2-3.2-.7-4.1-1.2-4.1-2.4 0-.9.7-1.8 2.9-1.8 1.8 0 3.3.7 4.6 2.1l2.9-2.8c-1.9-2-4.2-3.2-7.3-3.2-4 0-7.2 2.2-7.2 5.9 0 4 2.6 5.2 6.3 6 3.8.9 4.5 1.4 4.5 2.7 0 1.5-1.1 2.2-3.5 2.2-1.9 0-3.7-.7-5.2-2.3l-2.9 2.6c1.5 2.2 4.5 3.7 7.8 3.7 5.5-.1 7.9-2.7 7.9-6.5m18.7 2.2H84.6v-4.9h5.8v-3.9h-5.8v-3.5h10v-3.9h-14v20.2H95v-4zm22.2 3.9h-4.4l-1.6-4.5h-7.4l-1.6 4.5h-4.3l7.7-20.2h3.9l7.7 20.2zm-7.4-8.3l-1.3-3.7c-.4-1.2-.8-2.4-1-3.1-.2.7-.6 2-1 3.1l-1.3 3.7h4.6zm27.5 8.3h-4.6L129 162h-4v7.3h-4v-20.2h9.4c3.8 0 6.9 2.1 6.9 6.4 0 3-1.3 4.9-3.9 5.9l3.9 7.9zm-4.2-13.7c0-1.8-1.1-2.6-2.9-2.6H125v5.2h5.3c1.8 0 2.8-.8 2.8-2.6m23.7-2.3c-1.3-2.6-3.6-4.5-7.4-4.5-5.3 0-9 4.3-9 10.4 0 6.4 3.5 10.4 8.8 10.4 3.7 0 6.1-1.7 7.5-4.6l-3.4-2c-1.1 1.8-2.1 2.6-3.9 2.6-3 0-4.8-2.8-4.8-6.4 0-3.7 1.7-6.4 4.8-6.4 1.8 0 3 .8 3.7 2.2l3.7-1.7m20.3-4.2h-4v7.7h-8.3v-7.7h-4v20.2h4v-8.5h8.3v8.5h4v-20.2zM85.9 87.6c0-.5-.1-1-.1-1.5-.3-3-1.6-5.8-3.8-7.9-2.5-2.5-5.9-3.9-9.5-3.9-7.4 0-13.4 6-13.4 13.4s6 13.4 13.4 13.4c6.8 0 12.4-5.1 13.2-11.7.1-.6.2-1.2.2-1.8zM72.5 99.8c-6.7 0-12.2-5.5-12.2-12.2 0-6.7 5.5-12.2 12.2-12.2 3.3 0 6.3 1.3 8.6 3.6.6.6 1.1 1.3 1.6 2-1.5-1.2-3.4-2-5.5-2-.4 0-.8.1-1.2.1-4.2.6-7.5 4.2-7.5 8.6 0 4.8 3.9 8.7 8.7 8.7 2.1 0 4-.8 5.5-2-2.2 3.2-6 5.4-10.2 5.4zm12-10.7c-.7 3.4-3.7 6-7.3 6-4.1 0-7.5-3.4-7.5-7.5 0-2.1.9-4 2.3-5.4-.4.7-.6 1.6-.6 2.4 0 3.2 2.6 5.8 5.8 5.8s5.8-2.6 5.8-5.8c0-.9-.2-1.7-.6-2.4 1.4 1.4 2.3 3.3 2.3 5.4 0 .5-.1 1-.2 1.5zm-2.7-4.4c0 2.5-2 4.6-4.6 4.6-.9 0-1.7-.3-2.5-.7.2 0 .4.1.7.1 2.2 0 4-1.8 4-4s-1.8-4-4-4c-.2 0-.4.1-.7.1.5-.3 1-.5 1.5-.6.3 0 .6-.1.9-.1.3 0 .6.1.9.1 2.2.4 3.8 2.3 3.8 4.5zm-9.2 0c0-1.5 1.2-2.8 2.8-2.8 1.5 0 2.8 1.2 2.8 2.8 0 1.5-1.2 2.8-2.8 2.8-1.5-.1-2.8-1.3-2.8-2.8z"
										></path>
									</svg>
								</Link>
							</Grid>
							<Grid item xs={"auto"}>
								<Link
									className="wide"
									target="_blank"
									to="https://www.doctorswithoutborders.ca/"
									rel="noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 1599.6 465.8"
										preserveAspectRatio="minXminY slice"
									>
										<path
											fill="#ed1c24"
											d="M384 255.5c-2-2 .5-2 2.5-3 8-3 55.7-18.1 97.3-29.1s101.3-23.6 110.4-25.1c3.5-1 5 0 7 3 2 3.5 7 15.6 8.5 25.1 2 12 0 24.6-1 27.6-1 2.5-4.5 2.5-12.5 5-5 1.5-25.6 6.5-34.1 9-9.5 3-35.6 10.5-45.2 13.5l-27.1 9-82.3 1.5s-1-5.5-2-6c-.5-.5-2-3-2.5-4-.5-.5-1.5-3.5-1.5-3.5s-.5-3-1-3.5-2.5-4.5-3-5-2.5-2.5-3-3.5-1-2-2.5-3c-1-1-2.5-3-3.5-3.5-1.5-1-2.5-2.5-4.5-4.5M167.8 403l16.1-9c2-1 3-1 3-.5 0 2.5 0 7 3 8 1 .5 3-1 3.5 0 1 1.5 1 1.5 1.5 2s2 0 2 .5c1 .5 0 1.5.5 2 1 1 2-.5 3-.5 1.5.5 1.5 1.5 1.5 2.5-.5 1.5.5 3 3 .5 1.5-1 1.5-.5 2.5-1 .5-.5 2-.5 2.5 0s1.5 1.5 2 1.5c1 .5 2 0 3 .5s1 2 2 2 1.5-1.5 2.5-1c1.5 1.5-1.5 4 .5 4.5 1 .5 1.5-.5 2.5-.5s1.5-1 2-1 1.5 1 2 .5c1-.5 1.5-.5 2-1 1-.5 2-.5 2.5-1s0-2 2.5-2c2 .5-.5 2.5.5 3 .5.5 2.5 0 3 0 1-.5 2.5-2 2.5-3 .5-1 2.5-5 3-6.5.5-1 2.5-5.5 3.5-7s5-7.5 5-8.5c.5-1 2-2.5 2-3 .5-.5 1-3 2-5s3.5-6 4-6.5c0-.5 2.5-5.5 3-7s3.5-5 4-6.5 2.5-5 2.5-5l2-3s.5-1.5 1.5-3c1-2 3.5-5.5 4-7s3-4 3-4l1.5-3.5 1-2.5s1-3 1.5-4 2-3 2.5-4 2-6 2.5-7.5 4.5-8 4.5-9l4.5-9c.5-1.5.5-3 1-4s2-3 2-3.5 2.5-6.5 3-7.5.5-2.5 1.5-2.5 1.5 1 2.5 2c.5 1 2 1 3 1.5 1 1 3.5 4 4 4.5 0 .5 1.5.5 2 1s.5 1.5 1 2c.5 0 3 2 3.5 2.5s1 2 1.5 2.5 3.5 2 4 3c.5.5 4.5 5.5 5 6.5s1 2.5 1 3c.5.5 2 1.5 2 2s0 3 .5 3.5 2 1.5 2.5 2c0 .5 1 3 1.5 3.5l1.5 1.5c.5.5.5 3 1 3.5s1.5 2.5 2 3.5 1.5 2.5 2 3c0 .5.5 3 .5 4 .5 1 1.5 2.5 1.5 3s.5 2 .5 2l1 2.5s1 2.5 1 3c0 1 0 2 .5 2.5 0 .5 1 2 1 2.5s1.5 3.5 1.5 3.5-.5 2.5 0 3c0 .5 1.5 2.5 1.5 3s-.5 2-.5 2l.5 1s-.5 1.5 0 2v2c.5.5 1.5 3 1.5 3-.5 1-51.7 24.6-73.3 34.6-31.6 14.6-96.8 47.7-103.9 51.7-7 4-11.5 6.5-13 5.5-4-2-10-7.5-14.6-19.6-3.5-10-3.5-18.6-3.5-22.6 0-3 0-5.5 5-8.5 2.1-1 11.2-6.1 15.7-9.1M77.5 222.9c0 .5 1.5.5 2 .5s1 1 1.5 1h1.5c1 .5.5 1.5 1 2s.5 2 1.5 2 1.5 0 2 1c0 .5-.5 2 0 3 1.5 2.5 0 9 1.5 9.5 1 .5 5-.5 6-2 1.5-1 3-3 4-3.5 2-1 5.5-3 7.5-3 2-.5 2.5-3 4.5-3.5 1.5 0 1-1.5 2.5-2 1-.5 3.5-1.5 4-1s1 1.5 2 1.5c1.5.5 3 0 3 1.5.5 2 3.5 0 3.5 0l5.5-3.5c1.5-.5 6-3 6-3s3.5-2 5-2.5c55.2-26.6 98.3-41.1 138-56.2 63.2-24.1 170.6-51.7 191.2-56.7 2-.5 7-1.5 7.5-1.5.5-.5 1.5-.5 2-2.5s-1-4.5-1-5.5 2-5 2.5-6.5c0-1.5-1.5-2-1.5-2v-3.5c-.5-1.5-3-3-3.5-4s0-5-.5-6-2-2-2-2 .5-.5 0-1.5-1.5-1-1.5-1 .5-2.5 0-3c0-1-1.5-1.5-1.5-1.5s-1.5-1-1.5-2 0-1.5-1-2c-.5-.5-3-.5-3.5-.5s-2.5-.5-3.5-.5-1.5 1-5 2c-3.5.5-5 0-6.5 0s-3 1-5 1.5c-16.6 4.5-92.8 26.6-149 47.7-52.2 18.6-114.4 47.2-152.5 66.7C115.6 195.5 100 204 94 208c-3.5 2-7 4.5-7.5 5.5-1 1.5-2 3.5-3.5 4-2.5.5-2 1.5-2.5 2-1 0-2 1-2.5 2-1-.1-1 .9-.5 1.4m236.8-34.1c-2.5-1.5-1.5-3 1.5-4 18.1-7.5 64.2-24.1 90.3-32.6L508 120.1c4-1 6-1 7.5 1 4.5 5 9 11.5 13.5 20.1 4 7.5 7.5 18.6 8.5 25.6 1 5-1.5 6-4 7l-86.3 38.6-66.2 32.1c-5 2.5-4 3.5-7.5-.5-1-1-2.5-4-3-4.5s-7-6.5-8-7.5c-.5-.5-4.5-5-5.5-6-1-.5-4-5-5-5.5s-2.5-1.5-3.5-2c-.5-.5-2-2.5-2.5-2.5-.5-.5-2.5-2-2.5-2l-2.5-2.5-2-2s-1.5-2-3-2.5c-1-.5-3-2.5-3.5-3s-4.5-5.5-6.5-7c-2-1-6.5-4.5-7.5-5-.7-1.2-2.2-2.2-4.2-3.2M284.7 97c-2.5 0-4.5 0-5-.5s0-1-.5-1.5-1.5-.5-2 0-.5.5-1 .5c-1 .5-4-1-5-.5s-3.5.5-4 0c-1-.5-1-2.5-2.5-3-.5-.5-3-1.5-3.5-3s-2.5-3-3-4-1-2.5-1.5-3-1-2.5-1.5-3l-1.5-1.5c-.5-.5-1-2.5-1.5-3 0-.5-1-1-1-1.5-.5-.5-.5-1-.5-2-.5-.5-1-1.5-1.5-2.5 0-.5-.5-5-.5-8 0-3.5 0-6 .5-7.5s1-2.5 1.5-4 2-6 2.5-8 1.5-6 2-7.5 2-5 2.5-6 3.5-5.5 4.5-6.5c1-1.5 6-6.5 7.5-7.5 1-1 4-3 5-3.5.5-.5 4-3 5-3.5s2-.5 2-.5l1-1s.5-.5 1.5-1c.5-.5 2-.5 2-.5s2-1.5 3.5-1c1 0 1.5-1.5 2-1.5 1-1 4-1 4-1 .5.5 1 1 2.5 1 1.5.5 2.5 0 3.5 0s1.5 1 2 1.5c.5 0 7 6.5 8 8 .5.5.5 1.5.5 2 .5.5 1.5 1 2 3 0 1 1.5 1.5 1.5 3.5 0 1 2 2 3 4.5 0 .5.5 3 .5 3 0 .5.5.5 1 1.5s.5 2 .5 3 1.5 4.5 1.5 7-.5 4.5-1 6.5c-.5 1.5 0 5-.5 6.5s-1.5 4.5-1.5 5.5-3 8-3.5 8.5-2 4-3 5c-.5 1-6.5 8.5-7.5 10-1 1-3.5 3-4 3.5-.5 1-1 2-2 3.5-1 2-2.5.5-3.5 1.5-1 1.5-3 2-3.5 3-.5 1.5-2 3-2.5 3.5-.5 1-3.5 2-5 2M120.1 338.3l-33.6 11.5c-9 3-19.1 6.5-25.6 9.5-8 3.5-22.6 9-26.1 10.5-5.5 2-7.5 1-9-2.5-1.5-3-5-10-7-17.6-2-8-2.5-14-2.5-16.6s2-6.5 5-8.5c3-1.5 10-6 15.6-9 10.5-6 47.7-26.1 69.7-37.1 23.1-12 60.2-30.1 79.8-39.6l56.2-27.1c4-1.5 8-3.5 10-3.5s1 1 1 1.5-.5 1-1 2.5c0 1.5 0 3-.5 4.5s-2 3-2 4-.5 4.5-1.5 5.5-4.5 8-5 11-2.5 8.5-3 9.5l-3.5 7c0 1.5-2 5-2.5 6.5s-3.5 7-4 8-2.5 7.5-3 8.5-2.5 4-2.5 4l-1 4s-2.5 4-2.5 4.5-2 7.5-3 9-5.5 12-6.5 15.6c-1 3.5-2.5 9-3 10s-3 5.5-3.5 7-2.5 9-3.5 10c-.5 1.5-2.5 5.5-2.5 7s-1.5 4.5-2.5 7.5c-1 2.5-2.5 7.5-3.5 9-.5 1.5-1.5 3-2 4 0 1-.5 3.5-.5 4.5 0 .5-.5 2-.5 2-1 .5-66.7 28.6-76.3 33.1L34 446.1c-4 2-9.5 6-13.5 3.5-5.5-3.5-10.5-11-14-18.1-3-5.5-6-15.1-6.5-21.6-.5-8.5 3-10 15.1-17.1 6-3.5 54.2-28.6 69.2-36.6 4.7-1.3 35.8-17.9 35.8-17.9"
										></path>
										<path d="M1008.2 306.2l-10 40.6h-.5l-9.5-40.6h-19.6L953 368.9h14l10.5-40.1 10 40.1h19.1l16.1-62.7m-102.3 31.6l11-18.1 1 18.1h-12zm4.5-31.6l-41.1 62.2h18.1l11-17.6H932l1 18.1h17.6l-6-62.2H925l-.1-.5zm118.4 17.1c1-3.5 5.5-4.5 8-4.5 5 0 7.5 1 11 3l3-13c-5-3-10.5-3.5-15.1-3.5-14.5 0-22.1 8.5-23.6 16.1-3 14.5 14.5 22.6 12.5 29.1-1.5 5-6 5-9 5-4.5 0-9-1.5-13-3.5l-3.5 14.6c4.5 1.5 11.5 3 16.6 3 17.1 0 22.6-7.5 24.1-16.1 4-14.2-13-22.2-11-30.2m-166.6 0c1-3.5 5.5-4.5 8-4.5 5 0 7.5 1 11 3l4-12.5c-5.5-3.5-11.5-4-15.6-4-14.5 0-22.1 8.5-23.6 16.1-3 14.5 14.5 22.6 12.5 29.1-1.5 5-6 5-9 5-4.5 0-9-1.5-13-3.5l-3.5 14.6c4.5 1.5 11.5 3 16.6 3 17.1 0 22.6-7.5 24.1-16.1 3.6-14.2-14-22.2-11.5-30.2m425 23.5l-9.5-40.6h-19.6l-16.1 62.2h14.5l10-39.6h.5l10 39.6h19.1l16.1-62.2h-14.6m-193.6 13.5h24.1l3-13.5h-40.1l-15.6 62.2h16.1l6.5-24.6h20.1l3-13H1116m262.9-24.6h-46.7l-3.5 13.5h15.1l-12.5 48.7h16.6l12.5-48.7h15.1m9-13.5l-16.1 62.2h16.6l16.1-62.2m37 37.6l3.5-13H1421l2.5-11h26.1l3.5-13.5h-42.6l-15.6 62.2h42.1l3.5-13h-26.1l3-11.5m126.1-.2l3-13h-21.1l3-11h26.1l3.5-13.5h-42.6l-16.1 62.2h42.6l3.5-13h-26.1l3-11.5m-280.3-6.7c-2.5 10-10 18.6-19.6 18.6-10 0-12.5-9-10-18.6s9.5-18.6 19.6-18.6c9.5 0 12.5 8.6 10 18.6m-6.6-32.1c-18.6 0-34.1 11.5-39.6 32.1s4.5 32.1 23.1 32.1c17.6 0 33.1-10 39.1-30.6 6-21.6-4-33.6-22.6-33.6m342.2 18.1c1-3 5.5-4.5 8-4.5 5 0 7.5 1 11 3l3-13c-5-3-10.5-3.5-15.1-3.5-14.5 0-22.1 8.5-23.6 16.1-2.5 14.5 14.6 22.6 12.5 29.1-1.5 5-6 5-9 5-4.5 0-9-1.5-13-3.5l-3.5 14.6c4.5 1.5 11.5 3 16.6 3 17.1 0 22.6-7.5 24.1-16.1 4.1-14.7-13.5-22.7-11-30.2m-399.3 18c8.5-1.5 14.5-9 16.6-16.1 3-12.5-.5-19.1-14-19.1h-28.2l-16.1 62.2h15.6l12.5-49.2h8c2.5 0 7.5 0 5.5 6.5-1 5-5 8-12 8h-6l5.5 34.6h17.6c1 .2-4.5-25.9-5-26.9m308.5 0c8.5-1.5 14.5-9 16.6-16.1 3-12.5-.5-19.1-14-19.1h-28.1l-16.1 62.2h15.6l12.5-49.2h8c2.5 0 7.5 0 5.5 6.5-1.5 5-5 8-12 8h-5.5l5.5 34.6h17.6c.4.2-5.1-25.9-5.6-26.9m-861.4 27.1l3-13h-25.6l2.5-11.5h21.6l3-13h-21.1l3-11h26.1l3-13.5h-42.1l-16.1 62m-67.2 0l3-13h-25.6l2.5-11.5h21.1l3.5-13h-21.1l3-11h25.6l3.5-13.5h-42.1l-16.1 62.2m187.7.8c3 0 11-1 16.1-2l4-14.5c-5 1.5-10 2.5-16.6 2.5-10 0-12.5-9-10-18.6 2-8.5 9.5-18.6 22.6-18.6 4 0 8 1 12 2.5l3.5-14c-4-1.5-10-2-14.5-2-18.6 0-34.6 11.5-39.6 32.1-5.6 21.1 3.9 32.6 22.5 32.6m40.6-1l16.1-62.2h-16.6l-16.1 62.2m-259.8-44.1h.5l-1 44.2h14l22.1-44.7-11 44.7h13.5l16.1-62.2h-22.1l-19.1 39 1-39.1h-23.1l-16.1 62.2h14m311.7 0l10.5-39.6 10 39.6h19.1l16.1-62.2h-14.5l-10 40.6h-.5l-9.5-40.6h-19.7l-15.6 62.2m-142.9-31.1c-2.5 9-9 18.1-18.1 18.1h-7l9-35.6h8c9.1-.1 11.1 6 8.1 17.5m16.5 0c6.5-26.1-7.5-31.1-15.1-31.1H540l-16.1 62.2H550c18.2 0 29.7-13 34.7-31.1m216.8-14c1-3.5 5.5-4.5 8-4.5 5 0 7.5 1 11 3l3-13c-5-3-10.5-3.5-14.5-3.5-14.5 0-22.1 8.5-23.6 16.1-2.5 14.5 14.5 22.6 12.5 29.1-1.5 5-6 5-9 5-4.5 0-9-1.5-13-3.5l-3.5 14.6c4.5 1.5 11.5 3 16.6 3 17.1 0 22.6-7.5 24.1-16.1 3.4-14.2-14.2-22.2-11.6-30.2m-52.7 95.8c1-3.5 5.5-4.5 8-4.5 5 0 7.5 1 11 3l3-13c-5-3-10.5-3.5-14.5-3.5-14.5 0-22.1 8.5-23.6 16.1-3 14.5 14.5 22.6 12.5 29.1-1.5 5-6 5-9 5-4.5 0-9-1.5-13-3.5l-3.5 14.6c4.5 1.5 11.5 3 16.6 3 17.1 0 22.6-7.5 24.1-16.1 3.4-14.2-13.6-22.2-11.6-30.2m-137-16.6h-46.2l-3.5 13h15.1l-12.5 49.2h16.6l12.5-49.2h15.1m98.2 21.7c8.5-1.5 14.5-9 16.6-16.1 3-12.5-.5-19.1-14-19.1h-27.6L666 464.2h15.6l12.5-49.2h8c2.5 0 7.5 0 5.5 6.5-1.5 5-5 8-12 8h-6l5.5 34.6h17.6c0 .6-5.6-25.4-5.6-26.9m-178.6 28.6c3 0 11-.5 15.6-1.5l4-14.6c-5 1.5-9.5 2-16.1 2-10 0-12.5-9-10-18.6 2-8.5 9.5-18.6 22.6-18.6 4 0 8 1 12 2.5l3.5-14c-4-1.5-10-2-14.5-2-18.6 0-34.6 11.5-39.6 32.1-6.1 21.1 4 32.7 22.5 32.7m-110.4-32.2c-2.5 9-9 18.1-18.1 18.1h-6l9-35.6h7c9.1-.5 11.1 6 8.1 17.5m16.1 0c6.5-26.1-7.5-31.1-15.1-31.1H391l-16.1 62.2h24.6c18.1 0 30.2-13 34.7-31.1m43.6-32.6c-18.1 0-33.6 11.5-38.6 32.1s4.5 32.1 22.6 32.1c17.1 0 32.6-10 38.1-30.6 6-21-4-33.6-22.1-33.6zm7.1 33.1c-3 10-11 18.1-20.6 17.6-10-.5-12-9.5-9-19.1s10.5-18.1 20.6-17.6c9.5.6 12 9.1 9 19.1zm160-33.1c-18.1 0-33.6 11.5-38.6 32.1s4.5 32.1 22.6 32.1c17.1 0 32.6-10 38.1-30.6 6-21-4-33.6-22.1-33.6zm7.5 33.1c-3 10-11 18.1-20.6 17.6-10-.5-12-9.5-9-19.1 3-9.5 10.5-18.1 20.6-17.6 9 .6 11.6 9.1 9 19.1zm232.8-31.6l-16.1 62.2h16.6l15.6-62.2m288 0h-46.2l-3.5 13h15.1l-12.5 49.2h16.6l12-49.2h15.1m-232.4-13h-46.2l-3.5 13h15.1l-12.5 49.2H923l12.5-49.2H950m151-13l-9 35.6c-2.5 9-1.5 14.6 6 14.6s11-5.5 13.5-14.6l9-35.6h17.1l-11 42.1c-4 15.1-16.6 21.1-32.1 21.1s-25.1-6-21.1-21.1l11-42.1h16.6zm-221.8 0l-27.1 62.2H834l3-38.6h-.5L822 464.7h-17.1l1.5-62.2h14l-2 43.7 16.1-43.7h16.1l-3.5 43.7h.5l18.1-43.7m93.8 0h15.6l-6 23.1h20.1l6-23.1h15.6l-16.1 62.2h-15.6l6.5-26.1h-20.1l-6.5 26.1h-15.6m103.9-63.7c-18.1 0-33.6 11.5-38.6 32.1s4.5 32.1 22.6 32.1c17.1 0 32.6-10 38.1-30.6 6-21-4-33.6-22.1-33.6zm7 33.1c-3 10-11 18.1-20.6 17.6-10-.5-12-9.5-9-19.1 3-9.5 10.5-18.1 20.6-17.6 9.5.6 12 9.1 9 19.1zm370.8-.5c-2.5 9-9 18.1-18.1 18.1h-6l9-35.6h7c9.1-.5 11.1 6 8.1 17.5m16.6 0c6.5-26.1-7.5-31.1-15.1-31.1h-28.1l-16.1 62.2h24.6c18.1 0 29.6-13 34.7-31.1m126.9-14.5c1-3.5 5.5-4.5 8-4.5 5 0 7.5 1 11 3l3-13c-5-3-10.5-3.5-14.5-3.5-14.6 0-22.1 8.5-23.6 16.1-3 14.5 14.5 22.6 12.5 29.1-1.5 5-6 5-9 5-4.5 0-9-1.5-13-3.5l-3.5 14.6c4.5 1.5 11.5 3 16.6 3 17.1 0 22.6-7.5 24.1-16.1 3.9-14.2-13.6-22.2-11.6-30.2m-37.6 18.1c8.5-1.5 14.5-9 16.6-16.1 3-12.5-.5-19.1-14-19.1H1506l-16.1 62.2h15.6L1518 415h8c2.5 0 7.5 0 5.5 6.5-1.5 5-5 8-12 8h-6l5.5 34.6h17.6c.4.6-5.6-25.4-5.6-26.9m-161.6 0c8.5-1.5 14.5-9 16.6-16.1 3-12.5-.5-19.1-14-19.1h-27.6l-16.1 62.2h15.6l12.5-49.2h8c2.5 0 7.5 0 5.5 6.5-1.5 5-5 8-12 8h-6l5.5 34.6h17.6c.4.6-5.1-25.4-5.6-26.9m111.9 27.5l3-13.5h-25.6l2.5-11h21.6l3-13.5h-21.1l3-11h26.1l3-13h-42.1l-16.1 62.2M1237 427.1h3c4.5 0 10 .5 12-7.5 1.5-5-3.5-5-7.5-5h-4.5l-3 12.5zm-6.6 25.1h5.5c5 0 9.5 0 11-7 1.5-6.5-3-6.5-7-6.5h-6l-3.5 13.5zm-2.5-49.7h31.6c4.5 0 11 4 8 15.1-2 7.5-6 13-13.5 15.1 6.5 1 9.5 6.5 7.5 15.1-3.5 13.5-12 16.6-23.6 16.6h-26.1l16.1-61.9zm79.3-1.5c-18.1 0-33.6 11.5-38.6 32.1s4.5 32.1 22.6 32.1c17.1 0 32.6-10 38.1-30.6 6-21-3.5-33.6-22.1-33.6zm7.5 33.1c-3 10-11 18.1-20.6 17.6-10-.5-12-9.5-9-19.1s10.5-18.1 20.6-17.6c9.5.6 11.5 9.1 9 19.1z"></path>
									</svg>
								</Link>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						className="project-leads"
						sx={{ mb: 2 }}
					>
						<Grid item>
							<Typography
								variant="h2"
								gutterBottom
								sx={{ fontWeight: "500" }}
							>
								Funding
							</Typography>
							<Typography variant="p">
								We thank our sponsors for all their support
							</Typography>
						</Grid>
						<Grid container item spacing={6} alignItems="center">
							<Grid item xs={"auto"}>
								<Link
									className="wide"
									target="_blank"
									to="https://www.achmea.nl/en/foundation"
									rel="noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 126 24"
										preserveAspectRatio="minXminY slice"
									>
										<path
											fill="#c00"
											d="M39.7 10.5v7.1h-3.9v-5.5c0-2.2-.8-2.8-1.8-2.8-1.6 0-2.4 1.1-2.4 3.5v4.8h-3.9V1.4h3.1c.5 0 .8.2.8.8v5.7h.1c.8-1.2 2.1-1.9 3.8-1.9 3 0 4.2 2.2 4.2 4.5h0zM19 12c0-1.9 1.3-3.1 3.1-3.1.6 0 1.2.1 1.7.3.2.1.2.1.3.1h.1c.2 0 .4-.1.4-.4V6.5c-.8-.4-1.8-.6-2.9-.6-3.8 0-6.6 2.2-6.6 5.9s2.8 5.9 6.6 5.9c1 0 2.2-.1 3.1-.5v-2.9c-.7.3-1.5.6-2.4.6-1.8.1-3.4-1.1-3.4-2.9h0zm39.3-6c-1.6 0-3.1.6-4 2.2-.6-1.5-1.9-2.2-3.5-2.2-1.7 0-2.9.6-4.2 1.9 0 0-.3.3-.5.3-.1 0-.3-.1-.4-.1l-1.5-1.6c-.1-.1-.2-.2-.4-.2a.65.65 0 0 0-.6.6v10.7H47v-4.8c0-2.4.8-3.5 2.2-3.5 1.1 0 1.5 1 1.5 2.2v6.1h3.9v-4.8c0-2.4.8-3.5 2.2-3.5 1.1 0 1.5 1 1.5 2.2v6.1h3.9v-6.7c.1-3-.6-4.9-3.9-4.9zm-46.6.3c-.2 0-.3.1-.4.2l-.6.6c-.1.1-.2.2-.4.2-.1 0-.3 0-.4-.1-1-.8-2-1.3-3.5-1.3C3.1 5.9.5 8.5.5 11.8s2.6 5.9 5.9 5.9c1.5 0 2.5-.4 3.5-1.3.1 0 .3-.1.4-.1.2 0 .3.1.4.2l.6.6c.1.1.2.2.4.2a.65.65 0 0 0 .6-.6V7.2c0-.3-.3-.6-.6-.9h0zm-5.1 8.3c-1.4 0-2.5-1.2-2.5-2.6s1.1-2.6 2.5-2.6 2.5 1.1 2.5 2.6c0 1.4-1.1 2.6-2.5 2.6zm83.8-8.1c-.2 0-.3.1-.4.2l-.5.4c-.1.1-.2.2-.4.2-.1 0-.3 0-.4-.1-1-.8-2.1-1.3-3.5-1.3-3.3 0-5.9 2.6-5.9 5.9s2.6 5.9 5.9 5.9c1.5 0 2.5-.4 3.5-1.3.1 0 .3-.1.4-.1.2 0 .3.1.4.2l.6.6c.1.1.2.2.4.2a.65.65 0 0 0 .6-.6V7.2c0-.3-.3-.6-.7-.7h0zm-5 8.1c-1.4 0-2.5-1.2-2.5-2.6s1.1-2.6 2.5-2.6 2.5 1.1 2.5 2.6c0 1.4-1.1 2.6-2.5 2.6zm-8.6-2.2c0-3.3-1.4-6.3-5.7-6.2-3.5 0-6 2.2-6 5.9s2.8 5.9 6.5 5.9c1.4 0 2.9-.2 4.1-.7v-2.8c-1.1.5-2.2.8-3.4.8-1.9 0-3.1-.7-3.3-2.2h7.8v-.7h0zm-4-1.5h-3.4c-.3 0-.5-.2-.4-.5.2-1.1.8-1.9 2.1-1.9 1.4 0 2.1.9 2.2 1.9 0 .4-.2.5-.5.5h0zm43.8 1.1c0 1.7-1.3 3.1-2.9 3.1s-2.9-1.4-2.9-3.1 1.3-3.1 2.9-3.1 2.9 1.4 2.9 3.1zM113.9.4c-2.8 0-5.5.9-7.4 2.6-.2.2-.5.3-.8.3s-.6-.1-.8-.3l-1.3-1.3c-.1-.1-.3-.2-.6-.2-.4 0-.8.3-.8.8v19.4c0 .4.3.8.8.8.2 0 .4-.1.6-.2l1.3-1.3c.2-.2.5-.3.8-.3s.6.1.8.3c1.9 1.7 4.6 2.6 7.4 2.6A11.61 11.61 0 0 0 125.5 12 11.61 11.61 0 0 0 113.9.4h0zm6.9 17.7c0 .3-.2.5-.4.5h-.1c-.1 0-.3-.1-.3-.1l-.8-.8c-.1-.1-.3-.2-.5-.2s-.3.1-.5.2c-1.2 1.1-2.8 1.7-4.6 1.7-4 0-7.2-3.2-7.2-7.1v-.1c-.1-4.2 3.2-7.4 7.2-7.4 1.7 0 3.4.6 4.6 1.7.1.1.3.2.5.2s.4-.1.5-.2l.8-.8c.1-.1.2-.1.3-.1.3 0 .5.2.5.4v.1 12h0z"
										/>
									</svg>
								</Link>
							</Grid>
							<Grid item xs={"auto"}>
								<Link
									className="wide"
									target="_blank"
									to="https://www.grandchallenges.ca/programs/creating-hope-conflict/"
									rel="noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 321.7 97.5"
										preserveAspectRatio="minXminY slice"
									>
										<path
											fill="#d52b1e"
											d="M59.9 14.6L42.4.1c-.4-.3-.9-.1-1.1.6l-1.5 4c-.6 1.5-1.9 1.8-2.4 1.8s-10.1.7-10.1.7c-.5 0-.8.3-.8.8v.2l2.1 9.4c0 .2.1.4.1.6 0 1-.5 1.4-.9 1.7-.8.7-4.2 3-4.2 3-.3.2-.5.5-.5.8 0 .2.1.3.3.5l9.7 5.4c.5.3.7.7.7 1.2 0 .9-.9 1.9-2.1 2.1-1.7.2-21.2 1.7-21.2 1.7-.4 0-.7.3-.6.5 0 .1 0 .2.1.4 0 0 2.3 3.3 3.2 4.4a1.58 1.58 0 01.5 1.2c0 .6-.4 1.2-.9 1.6C12.1 43.2.2 53.5.2 53.5c-.3.2-.4.6 1.1 0 1.4-.6 13-6 23.1-8.6 8.8-2.3 21.9-2.7 31.7-7.3S68.6 27.7 70 23.7c1.3-4.4-.2-11.7 1-14.5 1.1-2.6 1.9-3.2 1.8-3.3s-.2-.1-.6.2c-.6.5-1.7.6-3.2.9-2 .3-3.8 1.2-5.1 2.8-1.5 1.8-2.4 4.3-2.9 4.8-.4.3-.9.2-1.1 0z"
										></path>
										<path d="M188.3 78.5c4.4 0 6.7 2.4 6.7 2.4l-1.3 1.9s-2.1-2-5.3-2c-4.1 0-6.8 3.1-6.8 7s2.7 7.3 6.8 7.3c3.5 0 5.7-2.4 5.7-2.4l1.4 1.8s-2.5 2.9-7.1 2.9c-5.5 0-9.4-4.2-9.4-9.6 0-5.2 4-9.3 9.3-9.3z"></path>
										<use xlinkHref="#B"></use>
										<path d="M209.6 84h2.4v1.7c0 .5-.1 1-.1 1h.1c.5-1.1 2.1-3 4.9-3 3.1 0 4.5 1.7 4.5 5v8.4H219v-7.9c0-1.8-.4-3.3-2.5-3.3-2 0-3.6 1.3-4.2 3.2-.2.5-.2 1.1-.2 1.8v6.2h-2.5V84zm21.6 5h.6v-.2c0-2.2-1.2-2.9-2.9-2.9-2 0-3.7 1.3-3.7 1.3l-1-1.8s1.9-1.6 4.9-1.6c3.3 0 5.2 1.8 5.2 5.2v8.3H232V96c0-.6.1-1 .1-1h-.1s-1.1 2.6-4.2 2.6c-2.3 0-4.5-1.4-4.5-4-.1-4.4 5.7-4.6 7.9-4.6zm-2.9 6.5c2.1 0 3.5-2.2 3.5-4.2v-.4h-.7c-1.9 0-5.3.1-5.3 2.5 0 1.1.8 2.1 2.5 2.1zm13.8-11.8c3 0 4.1 2.1 4.1 2.1h.1s-.1-.4-.1-.9v-6.1h2.5v18.4h-2.4v-2.1h-.1s-1.1 2.4-4.3 2.4c-3.6 0-5.8-2.8-5.8-6.9 0-4.2 2.5-6.9 6-6.9zm.3 11.6c2 0 3.8-1.4 3.8-4.7 0-2.3-1.2-4.7-3.7-4.7-2.1 0-3.8 1.7-3.8 4.7 0 2.9 1.6 4.7 3.7 4.7z"></path>
										<use x="54.4" xlinkHref="#B"></use>
										<path d="M41.4 78.6c4.4 0 6.7 2.2 6.7 2.2l-1.3 1.9s-2.1-1.8-5.2-1.8c-4.3 0-6.9 3.1-6.9 7.1 0 4.3 2.9 7.2 6.8 7.2 3.2 0 5.2-2.3 5.2-2.3v-2.7h-3V88H49v9.2h-2.3V95.3h-.1s-2 2.2-5.6 2.2c-4.9 0-9-3.9-9-9.5 0-5.3 4-9.4 9.4-9.4zm9.8 5.5h2.4v2.3c0 .5-.1 1-.1 1h.1c.6-1.9 2.1-3.4 4.2-3.4a2.18 2.18 0 01.6.1v2.5s-.3-.1-.7-.1c-1.6 0-3.1 1.1-3.7 3.1-.2.8-.3 1.6-.3 2.4v5.4h-2.5V84.1zM66.5 89h.5v-.2c0-2.2-1.2-2.9-2.9-2.9-2 0-3.7 1.3-3.7 1.3l-1-1.8s1.9-1.6 4.9-1.6c3.3 0 5.2 1.8 5.2 5.1v8.3h-2.3V96c0-.6.1-1 .1-1h-.1s-1.1 2.6-4.2 2.6c-2.3 0-4.5-1.4-4.5-4 0-4.4 5.8-4.6 8-4.6zm-2.9 6.5c2.1 0 3.5-2.2 3.5-4.2v-.4h-.6c-1.9 0-5.3.1-5.3 2.5-.1 1.1.7 2.1 2.4 2.1zM72 84.1h2.4v1.7c0 .5-.1 1-.1 1h.1c.5-1.1 2.1-3 4.9-3 3.1 0 4.5 1.7 4.5 5v8.4h-2.5v-7.8c0-1.8-.4-3.3-2.5-3.3-2 0-3.6 1.3-4.2 3.2-.2.5-.2 1.1-.2 1.8v6.2H72V84.1zm19.7-.3c3 0 4.1 2.1 4.1 2.1h.1s-.1-.4-.1-.9v-6.1h2.5v18.3h-2.4v-2.1h-.1s-1.1 2.4-4.3 2.4c-3.6 0-5.8-2.8-5.8-6.9.1-4.1 2.6-6.8 6-6.8zm.4 11.5c1.9 0 3.8-1.4 3.8-4.7 0-2.3-1.2-4.7-3.7-4.7-2.1 0-3.8 1.7-3.8 4.7 0 2.9 1.5 4.7 3.7 4.7z"></path>
										<use xlinkHref="#C"></use>
										<path d="M118 78.9h6.1c5.6 0 9.3 3.4 9.3 9.1 0 5.8-3.7 9.2-9.3 9.2H118V78.9zm5.9 16.1c4.1 0 6.8-2.4 6.8-7 0-4.5-2.7-6.9-6.8-6.9h-3.3V95h3.3zM141 83.8c3.7 0 5.7 2.8 5.7 6.2 0 .3-.1 1.1-.1 1.1H137c.1 2.9 2.2 4.3 4.5 4.3s3.9-1.5 3.9-1.5l1 1.8s-1.9 1.9-5.1 1.9c-4.1 0-7-3-7-6.9.2-4.2 3-6.9 6.7-6.9zm3.2 5.3c-.1-2.3-1.5-3.3-3.2-3.3-1.9 0-3.5 1.2-3.8 3.3h7zm-2.4-9.3h2.7l-2.5 3.3h-2.1l1.9-3.3zm16.6 6.3h-6.5v11.1h-2.5V86.1h-1.6v-2h1.6v-.4c0-4.3 3.3-4.8 4.9-4.8.6 0 1 .1 1 .1v2.3s-.3-.1-.6-.1c-1 0-2.8 0-2.8 2.5v.4h9v13.1h-2.5V86.1zm0-7.2h2.5v2.6h-2.5v-2.6z"></path>
										<use x="62.7" xlinkHref="#C"></use>
										<path d="M241.6 53.1c4.4 0 6.7 2.4 6.7 2.4l-1.3 1.9s-2.1-2-5.3-2c-4.1 0-6.8 3.1-6.8 7s2.7 7.3 6.8 7.3c3.5 0 5.7-2.4 5.7-2.4l1.4 1.8s-2.5 2.9-7.1 2.9c-5.5 0-9.4-4.2-9.4-9.6 0-5.3 4-9.3 9.3-9.3z"></path>
										<use xlinkHref="#D"></use>
										<path d="M262.9 58.6h2.4v1.7c0 .5-.1 1-.1 1h.1c.5-1.1 2.1-3 4.9-3 3.1 0 4.5 1.7 4.5 5v8.4h-2.5v-7.9c0-1.8-.4-3.3-2.5-3.3-2 0-3.6 1.3-4.2 3.2-.2.5-.2 1.1-.2 1.8v6.2h-2.5V58.6z"></path>
										<use x="27.1" xlinkHref="#D"></use>
										<path d="M295.4 58.3c3 0 4.1 2.1 4.1 2.1h.1s-.1-.4-.1-.9v-6.1h2.5v18.4h-2.4v-2.1h-.1s-1.1 2.4-4.3 2.4c-3.6 0-5.8-2.8-5.8-6.9.1-4.2 2.5-6.9 6-6.9zm.4 11.6c2 0 3.8-1.4 3.8-4.7 0-2.3-1.2-4.7-3.7-4.7-2.1 0-3.8 1.7-3.8 4.7-.1 2.8 1.5 4.7 3.7 4.7zm16-6.4h.6v-.2c0-2.2-1.2-2.9-2.9-2.9-2 0-3.7 1.3-3.7 1.3l-1-1.8s1.9-1.6 4.9-1.6c3.3 0 5.2 1.8 5.2 5.2v8.3h-2.3v-1.2c0-.6.1-1 .1-1h-.1s-1.1 2.6-4.2 2.6c-2.3 0-4.5-1.4-4.5-4 0-4.5 5.7-4.7 7.9-4.7zm-2.9 6.5c2.1 0 3.5-2.2 3.5-4.2v-.4h-.7c-1.9 0-5.3.1-5.3 2.5 0 1.1.8 2.1 2.5 2.1zM41.4 53.1c4.4 0 6.7 2.2 6.7 2.2l-1.3 1.9s-2.1-1.8-5.2-1.8c-4.3 0-6.9 3.1-6.9 7.1 0 4.3 2.9 7.2 6.8 7.2 3.2 0 5.2-2.3 5.2-2.3v-2.7h-3v-2.2H49v9.2h-2.3V69.8h-.1S44.6 72 41 72c-4.9 0-9-3.9-9-9.5 0-5.2 4-9.4 9.4-9.4zm9.8 5.5h2.4v2.3c0 .5-.1 1-.1 1h.1c.6-1.9 2.1-3.4 4.2-3.4a2.18 2.18 0 01.6.1V61s-.3-.1-.7-.1c-1.6 0-3.1 1.1-3.7 3.1-.2.8-.3 1.6-.3 2.4v5.4h-2.5V58.6zm15.3 4.9h.5v-.2c0-2.2-1.2-2.9-2.9-2.9-2 0-3.7 1.3-3.7 1.3l-1-1.8s1.9-1.6 4.9-1.6c3.3 0 5.2 1.8 5.2 5.1v8.3h-2.3v-1.2c0-.6.1-1 .1-1h-.1s-1.1 2.6-4.2 2.6c-2.3 0-4.5-1.4-4.5-4 0-4.4 5.8-4.6 8-4.6zM63.6 70c2.1 0 3.5-2.2 3.5-4.2v-.4h-.6c-1.9 0-5.3.1-5.3 2.5-.1 1.1.7 2.1 2.4 2.1zM72 58.6h2.4v1.7c0 .5-.1 1-.1 1h.1c.5-1.1 2.1-3 4.9-3 3.1 0 4.5 1.7 4.5 5v8.4h-2.5v-7.8c0-1.8-.4-3.3-2.5-3.3-2 0-3.6 1.3-4.2 3.2-.2.5-.2 1.1-.2 1.8v6.2H72V58.6zm19.7-.3c3 0 4.1 2.1 4.1 2.1h.1s-.1-.4-.1-.9v-6.1h2.5v18.3h-2.4v-2.1h-.1S94.7 72 91.5 72c-3.6 0-5.8-2.8-5.8-6.9.1-4.1 2.6-6.8 6-6.8zm.4 11.6c1.9 0 3.8-1.4 3.8-4.7 0-2.3-1.2-4.7-3.7-4.7-2.1 0-3.8 1.7-3.8 4.7 0 2.8 1.5 4.7 3.7 4.7zm22.8-16.8c4.4 0 6.7 2.4 6.7 2.4l-1.3 1.9s-2.1-2-5.3-2c-4.1 0-6.8 3.1-6.8 7s2.7 7.2 6.8 7.2c3.5 0 5.7-2.4 5.7-2.4l1.4 1.8s-2.5 2.9-7.1 2.9c-5.5 0-9.4-4.2-9.4-9.6-.1-5.2 3.9-9.2 9.3-9.2zm8.3.3h2.5v6.7c0 .6-.1 1.1-.1 1.1h.1c.6-1.3 2.2-2.9 4.9-2.9 3.1 0 4.5 1.7 4.5 5v8.4h-2.5v-7.8c0-1.8-.4-3.3-2.5-3.3-2 0-3.6 1.4-4.2 3.2-.2.5-.2 1.1-.2 1.7v6.2h-2.5V53.4zm21.2 10.1h.6v-.2c0-2.2-1.2-2.9-2.9-2.9-2 0-3.7 1.3-3.7 1.3l-1-1.8s1.9-1.6 4.9-1.6c3.3 0 5.2 1.8 5.2 5.1v8.3h-2.3v-1.2c0-.6.1-1 .1-1h-.1s-1.1 2.6-4.2 2.6c-2.3 0-4.5-1.4-4.5-4 0-4.4 5.7-4.6 7.9-4.6zm-2.9 6.5c2.1 0 3.5-2.2 3.5-4.2v-.4h-.6c-1.9 0-5.3.1-5.3 2.5-.1 1.1.8 2.1 2.4 2.1zm8.3-16.6h2.5v14.3c0 1.6.6 1.9 1.4 1.9h.4v2.2h-.8c-1.4 0-3.5-.4-3.5-3.7V53.4zm6.1 0h2.5v14.3c0 1.6.6 1.9 1.4 1.9h.4v2.2h-.8c-1.4 0-3.5-.4-3.5-3.7V53.4zm11.7 4.9c3.7 0 5.7 2.8 5.7 6.2 0 .3-.1 1.1-.1 1.1h-9.6c.1 2.9 2.2 4.3 4.5 4.3s3.9-1.5 3.9-1.5l1 1.8s-1.9 1.9-5.1 1.9c-4.1 0-7-3-7-6.9.1-4.2 2.9-6.9 6.7-6.9zm3.1 5.3c-.1-2.3-1.5-3.4-3.2-3.4-1.9 0-3.5 1.2-3.8 3.4h7zm4.6-5h2.4v1.7c0 .5-.1 1-.1 1h.1c.5-1.1 2.1-3 4.9-3 3.1 0 4.5 1.7 4.5 5v8.4h-2.5v-7.8c0-1.8-.4-3.3-2.5-3.3-2 0-3.6 1.3-4.2 3.2-.2.5-.2 1.1-.2 1.8v6.2h-2.5V58.6zM194.7 75c2.3 0 4.2-1 4.2-3.7v-1.8h-.1c-.8 1.3-2 2.1-3.9 2.1-3.7 0-5.9-2.9-5.9-6.7s2.1-6.6 5.7-6.6c3.2 0 4.1 1.9 4.1 1.9h.1v-1.6h2.4v12.6c0 4.3-3.3 6-6.6 6-1.6 0-3.2-.4-4.5-1.1l.8-2c.1 0 1.7.9 3.7.9zm4.2-10.1c0-3.4-1.7-4.4-3.7-4.4-2.3 0-3.6 1.7-3.6 4.3 0 2.7 1.5 4.6 3.8 4.6 1.9 0 3.5-1.1 3.5-4.5zm10.8-6.6c3.7 0 5.7 2.8 5.7 6.2 0 .3-.1 1.1-.1 1.1h-9.6c.1 2.9 2.2 4.3 4.5 4.3s3.9-1.5 3.9-1.5l1 1.8s-1.9 1.9-5.1 1.9c-4.1 0-7-3-7-6.9.1-4.2 3-6.9 6.7-6.9zm3.1 5.3c-.1-2.3-1.5-3.4-3.2-3.4-1.9 0-3.5 1.2-3.8 3.4h7z"></path>
										<use
											x="116.5"
											y="-25.5"
											xlinkHref="#C"
										></use>
										<path
											fill="#231f20"
											d="M318.6 52.2c1.7 0 3.1 1.4 3.1 3.2s-1.4 3.2-3.1 3.2-3.1-1.4-3.1-3.2 1.4-3.2 3.1-3.2zm0 5.8c1.4 0 2.5-1.1 2.5-2.6s-1.1-2.6-2.5-2.6-2.5 1.1-2.5 2.6c0 1.4 1.1 2.6 2.5 2.6zm-1.1-4.3h1.3a.94.94 0 011 1c0 .5-.3.8-.6.9l.1.2.7 1.2h-.7l-.6-1.3h-.5V57h-.6v-3.3zm1.2 1.6c.3 0 .5-.2.5-.6a.47.47 0 00-.5-.5h-.5v1.1h.5z"
										></path>
										<defs>
											<path
												id="B"
												d="M204.1 89h.6v-.2c0-2.2-1.2-2.9-2.9-2.9-2 0-3.7 1.3-3.7 1.3l-1-1.8s1.9-1.6 4.9-1.6c3.3 0 5.2 1.8 5.2 5.2v8.3h-2.3V96c0-.6.1-1 .1-1h-.1s-1.1 2.6-4.2 2.6c-2.3 0-4.5-1.4-4.5-4-.1-4.4 5.7-4.6 7.9-4.6zm-2.9 6.5c2.1 0 3.5-2.2 3.5-4.2v-.4h-.7c-1.9 0-5.3.1-5.3 2.5 0 1.1.8 2.1 2.5 2.1z"
											></path>
											<path
												id="C"
												d="M101.1 93.8a5.79 5.79 0 003.8 1.5c1.1 0 2.2-.6 2.2-1.6 0-2.4-6.8-1.9-6.8-6.2 0-2.4 2.1-3.7 4.8-3.7 2.9 0 4.2 1.5 4.2 1.5l-1 1.9s-1.2-1.2-3.2-1.2c-1.1 0-2.2.5-2.2 1.6 0 2.4 6.8 1.8 6.8 6.2 0 2.2-1.9 3.8-4.8 3.8-3.2 0-5-1.9-5-1.9l1.2-1.9z"
											></path>
											<path
												id="D"
												d="M257.4 63.5h.6v-.2c0-2.2-1.2-2.9-2.9-2.9-2 0-3.7 1.3-3.7 1.3l-1-1.8s1.9-1.6 4.9-1.6c3.3 0 5.2 1.8 5.2 5.2v8.3h-2.3v-1.2c0-.6.1-1 .1-1h-.1s-1.1 2.6-4.2 2.6c-2.3 0-4.5-1.4-4.5-4-.1-4.5 5.7-4.7 7.9-4.7zm-2.9 6.5c2.1 0 3.5-2.2 3.5-4.2v-.4h-.7c-1.9 0-5.3.1-5.3 2.5 0 1.1.8 2.1 2.5 2.1z"
											></path>
										</defs>
									</svg>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

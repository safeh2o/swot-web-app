import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Card,
	CardContent,
	Typography,
	Box,
	Button,
	SvgIcon,
} from "@mui/material/";

import { NavLink } from "react-router-dom";
import Posts from "./Posts";
import { userSelectors as userSelectors } from "../reducers/user";

import { IconTrash } from "./icons";
import { clearViewStack, pushView } from "../reducers/view";
import { blogSelectors, getPosts } from "../reducers/posts";

export default function Blog(props) {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);
	const posts = useSelector(blogSelectors.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "News", path: "/blog" }));
		dispatch(getPosts());
	}, []);

	const css = {
		buttonBackToResults: {
			wrapper: {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				backgroundColor: "primary.main",
				color: "#fcfcfc",
				p: 2,
				mb: 4,
				"&:hover": {
					backgroundColor: "primary.main",
				},
			},
			icon: {
				flex: "1 0 1.3em",
				maxWidth: "1.3em",
				maxHeight: "1.3em",
			},
			text: {
				fontSize: "1rem",
				lineHeight: 1,
				textTransform: "capitalize",
				paddingLeft: "10px",
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
			"& .MuiAccordionSummary-expandIconWrapper": {
				"& svg": {
					width: "0.92em",
					height: "0.92em",
				},
			},
		},
	};

	return (
		<>
			<Button
				to={`/`}
				component={NavLink}
				size="large"
				sx={{ ...css.buttonBackToResults.wrapper }}
			>
				<SvgIcon
					viewBox="0 0 32 32"
					sx={{ ...css.buttonBackToResults.icon }}
				>
					<path d="M29.4 17.5h-22l4.2 5.6-2.4 1.8L2.6 16l6.7-8.9 2.4 1.8-4.2 5.6h22v3z" />
				</SvgIcon>
				<Box sx={{ ...css.buttonBackToResults.text }}>Home</Box>
			</Button>

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
				Latest News
			</Typography>

			<Card sx={{ ...css.cardElement }}>
				<CardContent>
					<Posts type={"news"} data={posts} postNumber={5} />
				</CardContent>
			</Card>
		</>
	);
}

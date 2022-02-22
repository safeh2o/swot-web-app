import {
	Box,
	Button,
	Card,
	CardContent,
	SvgIcon,
	Typography,
} from "@mui/material/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { blogSelectors, getPosts } from "../reducers/posts";
import { userSelectors as userSelectors } from "../reducers/user";
import { pushView } from "../reducers/view";
import Posts from "./Posts";

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

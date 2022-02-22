import { Typography } from "@mui/material/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogSelectors, getPosts } from "../reducers/posts";
import { pushView } from "../reducers/view";
import Posts from "./Posts";

export default function Blog(props) {
	const posts = useSelector(blogSelectors.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "News", path: "/blog" }));
		dispatch(getPosts());
	}, []);

	return (
		<>
			<Typography
				component={"h1"}
				variant="body1"
				sx={{
					mb: 2,
					fontSize: "1.55rem",
					fontWeight: "400",
					fontFamily: '"Roboto Condensed", sans-serif',
					lineHeight: "1.2",
					letterSpacing: "-0.02em",
					color: "#747e87",
					margin: "5px 0 10px 8px",
				}}
			>
				Latest News
			</Typography>

			<Posts type={"news"} data={posts} postNumber={5} />
		</>
	);
}

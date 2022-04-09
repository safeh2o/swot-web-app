import { Typography } from "@mui/material/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogSelectors, getPosts } from "../reducers/posts";
import { Blog as css } from "../styles/styles";
import Posts from "./Posts";

export default function Blog() {
	const posts = useSelector(blogSelectors.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	return (
		<>
			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				Latest News
			</Typography>

			<Posts type={"news"} data={posts} postNumber={5} />
		</>
	);
}

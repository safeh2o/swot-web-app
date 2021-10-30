import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
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

	return (
		<>
			<Posts type={"news"} data={posts} />
		</>
	);
}

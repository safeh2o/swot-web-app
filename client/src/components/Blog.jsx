import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

	return (
		<>
			<section id="news" className="content-window rich-text">
				<header>
					<div className="content-window-title txt-condensed">
						Latest News
					</div>
				</header>
				<Posts type={"news"} data={posts} />
			</section>
		</>
	);
}

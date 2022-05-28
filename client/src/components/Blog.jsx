import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogSelectors, getPosts } from "../reducers/posts";
import Posts from "./Posts";

export default function Blog() {
	const posts = useSelector(blogSelectors.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	return (
		<>
			<section>
				<div className="section-wrap posts">
					<div className="intro">
						<h1 className="section-subtitle">
							News, <br />
							Technical Blog
						</h1>
						<div className="posts-filters text-sm">
							<div className="categories-blog">
								<a className="active">All Posts</a>
								<span className="divider">...</span>
								<a>Announcements</a>
								<a>Resources</a>
								<a>Support & Guides</a>
							</div>
						</div>
						<div className="posts-count text-sm">
							<span>Showing 1 to 10 of 11 posts.</span>
						</div>
					</div>
					<div className="content">
						<Posts type={"news"} data={posts} postNumber={5} />
					</div>
					<footer className="posts-footer">
						<div className="pages">
							<a href="blog.php" target="_blank">
								Previous
							</a>
							<a className="active">1</a>
							<a>2</a>
							<a>3</a>
							<span>...</span>
							<a>last</a>
							<a href="blog.php" target="_blank">
								Next
							</a>
						</div>
					</footer>
				</div>
			</section>
		</>
	);
}

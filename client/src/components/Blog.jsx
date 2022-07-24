import { Button } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { blogSelectors, getPosts } from "../reducers/posts";
import Posts from "./Posts";

const DEFAULT_PAGE_SIZE = 10;

export default function Blog() {
	const posts = useSelector(blogSelectors.posts);
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const [postRange, setPostRange] = useState([0, DEFAULT_PAGE_SIZE - 1]);
	const [numPages, setNumPages] = useState(1);
	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	useEffect(() => {
		const pageNumber = searchParams.get("page");
		if (!pageNumber) {
			searchParams.set("page", 1);
		} else {
			const startRange = (pageNumber - 1) * pageSize;
			const endRange = pageNumber * pageSize;
			setPostRange([startRange, endRange]);
		}
	}, [searchParams]);

	useEffect(() => {
		if (posts?.length) {
			setNumPages(Math.ceil(posts.length / pageSize));
		}
	}, [posts]);

	return (
		<>
			<section>
				<div className="section-wrap posts">
					<div className="intro">
						<h1 className="section-subtitle">
							News, <br />
							Technical Blog
						</h1>
						<div className="posts-filters small">
							<div className="categories-blog">
								<a className="active">Announcements</a>
								<a>Resources</a>
								<a>Support &amp; Guides</a>
							</div>
						</div>
						<div className="posts-count small">
							<span>
								Showing {postRange[0] + 1} to {postRange[1] + 1}{" "}
								of {posts?.length || "..."} posts.
							</span>
						</div>
					</div>
					<div className="content">
						<Posts
							type={"news"}
							posts={posts}
							start={postRange[0]}
							end={postRange[1]}
						/>
					</div>
					<footer className="posts-footer">
						<div className="pages">
							<a href="blog.php" target="_blank">
								Previous
							</a>
							{_.range(1, numPages).map((pageNumber) => (
								<>
									<Button
										onClick={() =>
											searchParams.set("page", pageNumber)
										}
									>
										{pageNumber}
									</Button>
								</>
							))}
							{/* <a className="active">1</a>
							<a>2</a>
							<a>3</a>
							<span>...</span>
							<a>last</a> */}
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

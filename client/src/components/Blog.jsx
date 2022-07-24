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
	const [postRange, setPostRange] = useState([1, DEFAULT_PAGE_SIZE]);
	const [numPages, setNumPages] = useState(1);
	let [searchParams, setSearchParams] = useSearchParams();
	const currentPageNumber = searchParams.get("page")
		? parseInt(searchParams.get("page"))
		: 1;

	useEffect(() => {
		dispatch(getPosts());
	}, []);

	useEffect(() => {
		if (!currentPageNumber) {
			setPageNumber(1);
		} else {
			const startRange = (currentPageNumber - 1) * pageSize + 1;
			const endRange = Math.min(
				currentPageNumber * pageSize,
				posts?.length || Infinity
			);
			setPostRange([startRange, endRange]);
		}
	}, [searchParams]);

	useEffect(() => {
		if (posts?.length) {
			setNumPages(Math.ceil(posts.length / pageSize));
		}
	}, [posts]);

	function setPageNumber(pageNumber) {
		setSearchParams({
			...Object.fromEntries(searchParams),
			page: pageNumber,
		});
	}

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
								Showing {postRange[0]} to {postRange[1]} of{" "}
								{posts?.length || "..."} posts.
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
							{currentPageNumber > 1 && (
								<a
									onClick={() =>
										setPageNumber(currentPageNumber - 1)
									}
								>
									Previous
								</a>
							)}
							{_.range(1, numPages + 1).map((pageNumber) => (
								<a
									onClick={() => setPageNumber(pageNumber)}
									key={pageNumber}
									className={
										pageNumber == currentPageNumber
											? "active"
											: ""
									}
								>
									{pageNumber}
								</a>
							))}
							{currentPageNumber < numPages && (
								<a
									onClick={() =>
										setPageNumber(currentPageNumber + 1)
									}
								>
									Next
								</a>
							)}
						</div>
					</footer>
				</div>
			</section>
		</>
	);
}

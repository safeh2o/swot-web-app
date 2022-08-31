import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { blogSelectors, getPostCategories, getPosts } from "../reducers/blog";
import Posts from "./Posts";

const DEFAULT_PAGE_SIZE = 10;

export default function Blog() {
	const allPosts = useSelector(blogSelectors.posts);
	const allPostCategories = useSelector(blogSelectors.postCategories);
	const [posts, setPosts] = useState(allPosts);
	const dispatch = useDispatch();
	const [pageSize] = useState(DEFAULT_PAGE_SIZE);
	const [postRange, setPostRange] = useState([1, DEFAULT_PAGE_SIZE]);
	const [numPages, setNumPages] = useState(1);
	let [searchParams, setSearchParams] = useSearchParams();
	const currentCategory = searchParams.get("category");
	const currentPageNumber = searchParams.get("page")
		? parseInt(searchParams.get("page"))
		: 1;

	useEffect(() => {
		dispatch(getPosts());
		dispatch(getPostCategories());
	}, [dispatch]);

	useEffect(() => {
		if (!posts) {
			setPosts(allPosts);
		}
	}, [allPosts]);

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
	}, [currentPageNumber, currentCategory, posts]);

	useEffect(() => {
		const currentCategoryId =
			allPostCategories?.byName?.[currentCategory]?._id;
		if (currentCategoryId) {
			setPosts(
				allPosts.filter((post) =>
					post.categories.includes(currentCategoryId)
				)
			);
		} else {
			setPosts(allPosts);
		}
		setPageNumber(1);
	}, [currentCategory]);

	useEffect(() => {
		if (posts?.length) {
			setNumPages(Math.ceil(posts.length / pageSize));
		}
	}, [posts, pageSize]);

	function updateSearchParams(items) {
		setSearchParams(
			{
				...Object.fromEntries(searchParams),
				...items,
			},
			{ replace: true }
		);
	}

	function setPageNumber(pageNumber) {
		updateSearchParams({ page: pageNumber });
	}

	function setCategory(categoryName) {
		updateSearchParams({ category: categoryName });
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
								{Object.keys(
									allPostCategories?.byName || []
								).map((categoryName) => (
									<a
										key={categoryName}
										className={
											currentCategory == categoryName
												? "active"
												: ""
										}
										onClick={() => {
											setCategory(categoryName);
										}}
									>
										{categoryName}
									</a>
								))}
							</div>
						</div>
						<div className="posts-count small">
							<span>
								Showing {postRange[0]} to {postRange[1]} of{" "}
								{posts?.length ?? "..."} posts.
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

import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
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
	const [searchParams, setSearchParams] = useSearchParams();
	const currentCategory = searchParams.get("category");
	const currentPage = searchParams.get("page");
	const currentPageNumber = currentPage ? parseInt(currentPage) : 1;

	const updateSearchParams = useCallback(
		(items: Record<string, string>) => {
			setSearchParams(
				{
					...Object.fromEntries(searchParams),
					...items,
				},
				{ replace: true }
			);
		},
		[searchParams, setSearchParams]
	);
	const setPageNumber = useCallback(
		(pageNumber: number) => {
			updateSearchParams({ page: pageNumber.toString() });
		},
		[updateSearchParams]
	);
	useEffect(() => {
		dispatch(getPosts());
		dispatch(getPostCategories());
	}, [dispatch]);

	useEffect(() => {
		if (!posts) {
			setPosts(allPosts);
		}
	}, [allPosts, posts]);

	useEffect(() => {
		if (!currentPageNumber) {
			setPageNumber(1);
		} else {
			const startRange = (currentPageNumber - 1) * pageSize + 1;
			const endRange = Math.min(currentPageNumber * pageSize, posts?.length || Infinity);
			setPostRange([startRange, endRange]);
		}
	}, [currentPageNumber, currentCategory, posts, pageSize, setPageNumber]);

	useEffect(() => {
		const currentCategoryId =
			currentCategory && allPostCategories?.byName?.[currentCategory]?._id;
		if (currentCategoryId) {
			setPosts(allPosts.filter((post) => post.categories?.includes(currentCategoryId)));
		} else {
			setPosts(allPosts);
		}
	}, [currentCategory, allPosts, allPostCategories?.byName]);

	useEffect(() => {
		if (currentPageNumber > numPages) {
			setPageNumber(1);
		}
	}, [currentCategory, setPageNumber, numPages, currentPageNumber]);

	useEffect(() => {
		if (posts?.length) {
			setNumPages(Math.ceil(posts.length / pageSize));
		}
	}, [posts, pageSize]);

	function setCategory(categoryName: string) {
		updateSearchParams({ category: categoryName });
	}

	return (
		<>
			<div className="blog-header">
				<div className="blog-header-wrap">
					<h1 className="section-subtitle">
						SWOT News <br />
						&amp; Technical Resources
					</h1>
					<div className="posts-filters small">
						<div className="categories-blog">
							{Object.keys(allPostCategories?.byName || []).map((categoryName) => (
								<span
									key={categoryName}
									className={currentCategory === categoryName ? "active" : ""}
									onClick={() => {
										setCategory(categoryName);
									}}
								>
									{categoryName}
								</span>
							))}
						</div>
					</div>
					<div className="posts-count small">
						<span>
							Showing {postRange[0]} to {postRange[1]} of {posts?.length ?? "..."}{" "}
							posts.
						</span>
					</div>
				</div>
			</div>
			<section>
				<div className="section-wrap posts">
					<div className="content">
						<Posts posts={posts} start={postRange[0]} end={postRange[1]} />
					</div>
					<footer className="posts-footer">
						<div className="pages">
							{currentPageNumber > 1 && (
								<span onClick={() => setPageNumber(currentPageNumber - 1)}>
									Previous
								</span>
							)}
							{_.range(1, numPages + 1).map((pageNumber) => (
								<span
									onClick={() => setPageNumber(pageNumber)}
									key={pageNumber}
									className={pageNumber === currentPageNumber ? "active" : ""}
								>
									{pageNumber}
								</span>
							))}
							{currentPageNumber < numPages && (
								<span onClick={() => setPageNumber(currentPageNumber + 1)}>
									Next
								</span>
							)}
						</div>
					</footer>
				</div>
			</section>
		</>
	);
}

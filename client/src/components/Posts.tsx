import { Skeleton } from "@mui/material";
import _ from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { blogSelectors } from "../reducers/blog";
import { BlogPost } from "../types";

export default function Posts(props: { posts: BlogPost[]; start: number; end: number }) {
	const { posts, start, end } = props;
	const blogIsLoading = useSelector(blogSelectors.isLoading);
	const allPostCategories = useSelector(blogSelectors.postCategories);

	function articleFromPost(post: BlogPost) {
		const link = `/blog/${post.slug}`;
		return (
			<article key={link} className="app-card">
				<div className="post-details">
					<header className="small">
						<time>{post.publishedDate}</time>
						{post.categories && post.categories.length > 0 && (
							<span className="categories-post">
								<span className="divider">in</span>
								{post.categories.map((cat: string | number, i: number) => (
									<span key={"cat-" + i}>
										{allPostCategories?.byId?.[cat]?.name || ""}
									</span>
								))}
							</span>
						)}
					</header>
					<h1 className="post-title">
						<NavLink to={link}>{post.title}</NavLink>
					</h1>
					<div className="post-text">{post.content.brief}</div>
					<hr />
				</div>
			</article>
		);
	}

	function blogSkeleton(numPosts: number) {
		const samplePost = {
			title: "Stepping Up: Sanitation specialist develops system",
			publishedDate: "November 25, 2020",
			content: {
				brief: "This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership.",
			},
			categoryNames: ["Announcements"],
		};

		return _.times(numPosts, (i) => (
			<article key={i}>
				<div className="post-details">
					<header className="small">
						<Skeleton>
							<time>{samplePost.publishedDate}</time>
						</Skeleton>
						<span className="categories-post">
							<Skeleton>
								<span className="divider">in</span>
								{samplePost.categoryNames.map((cat, j) => (
									<span key={"cat-" + j}>{cat}</span>
								))}
							</Skeleton>
						</span>
					</header>
					<Skeleton>
						<h1 className="post-title">
							<NavLink to="#">{samplePost.title}</NavLink>
						</h1>
					</Skeleton>
					<Skeleton width="100%">
						<div className="post-text">{samplePost.content.brief}</div>
					</Skeleton>
					<hr />
				</div>
			</article>
		));
	}

	return (
		<>
			{blogIsLoading
				? blogSkeleton(5)
				: posts.slice(start - 1, end).map((post) => articleFromPost(post))}
		</>
	);
}

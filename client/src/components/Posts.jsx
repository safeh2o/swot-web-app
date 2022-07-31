import { Skeleton } from "@mui/material";
import _ from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { blogSelectors } from "../reducers/blog";

export default function Posts(props) {
	const { posts, start, end } = props;
	const blogIsLoading = useSelector(blogSelectors.isLoading);
	const allPostCategories = useSelector(blogSelectors.postCategories);

	function articleFromPost(post) {
		const link = `/blog/${post.slug}`;
		return (
			<article key={link}>
				{post?.image?.secure_url && (
					<figure className="image-post">
						<NavLink to={link}>
							<img src={post?.image?.secure_url} alt="" />
						</NavLink>
					</figure>
				)}
				<div className="details-post">
					<header className="small">
						<time>{post.publishedDate}</time>
						{post.categories && post.categories.length > 0 && (
							<span className="categories-post">
								<span className="divider">in</span>
								{post.categories.map((cat, i) => (
									<a key={"cat-" + i}>
										{allPostCategories?.byId?.[cat]?.name ||
											""}
									</a>
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

	function blogSkeleton(numPosts) {
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
				<div className="details-post">
					<header className="small">
						<Skeleton>
							<time>{samplePost.publishedDate}</time>
						</Skeleton>
						<span className="categories-post">
							<Skeleton>
								<span className="divider">in</span>
								{samplePost.categoryNames.map((cat, j) => (
									<a key={"cat-" + j}>{cat}</a>
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
						<div className="post-text">
							{samplePost.content.brief}
						</div>
					</Skeleton>
					<hr />
				</div>
			</article>
		));
	}

	return blogIsLoading
		? blogSkeleton(5)
		: posts.slice(start - 1, end).map((post) => articleFromPost(post));
}

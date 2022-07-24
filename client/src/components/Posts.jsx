import { Box, Divider, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { blogSelectors } from "../reducers/posts";

export default function Posts(props) {
	const { posts } = props;
	const blogIsLoading = useSelector(blogSelectors.isLoading);

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
									<a key={"cat-" + i}>{{ cat }}</a>
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
		};

		return _.times(numPosts, (i) => (
			<Box component="article" key={i} className="image-post">
				{i < 1 && (
					<figure>
						<Skeleton component="img" />
					</figure>
				)}
				<div className="details-post">
					<Skeleton>
						<header className="small">
							<time>{samplePost.publishedDate}</time>
						</header>
					</Skeleton>
					<Skeleton>
						<h1 className="post-title">{samplePost.title}</h1>
					</Skeleton>
					<Skeleton>
						<div className="post-text">
							{samplePost.content.brief}
						</div>
					</Skeleton>
					<hr />
				</div>
			</Box>
		));
	}

	return blogIsLoading
		? blogSkeleton(5)
		: posts.map((post) => articleFromPost(post));
}

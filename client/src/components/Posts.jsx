import { Box, Divider, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { blogSelectors } from "../reducers/posts";

export default function Posts(props) {
	const { data: posts } = props;
	const blogIsLoading = useSelector(blogSelectors.isLoading);

	function articleFromPost(post) {
		const link = `/blog/${post.slug}`;
		return (
			<>
				<article key={link}>
					{post?.image?.secure_url && (
						<figure className="image-post">
							<NavLink to={link}>
								<img src={post?.image?.secure_url} alt="" />
							</NavLink>
						</figure>
					)}
					<div className="details-post">
						<header className="text-sm">
							<time>{post.publishedDate}</time>
							{post.categories && post.categories.length > 0 && (
								<span className="categories-post">
									<span className="divider">in</span>
									<a>{post.categories.map((cat) => cat)}</a>
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
			</>
		);
	}

	function blogSkeleton(numPosts) {
		const post = {
			title: "Stepping Up: Sanitation specialist develops system",
			publishedDate: "November 25, 2020",
			content: {
				brief: "This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership.",
			},
		};

		return _.times(numPosts, (i) => (
			<Box component="article" key={i}>
				{post?.image?.secure_url && (
					<figure>
						<Skeleton component="img" />
					</figure>
				)}
				<Skeleton>
					<Typography component={"span"} variant="h2" gutterBottom>
						{post.title}
					</Typography>
				</Skeleton>
				<Skeleton>
					<Typography variant="body1" component="div" gutterBottom>
						{post.content.brief}
					</Typography>
				</Skeleton>
				<Skeleton>
					<Typography variant="caption" component="time">
						{post.publishedDate}
					</Typography>
				</Skeleton>
				<Divider
					sx={{
						borderColor: "primary.main",
						my: 3,
						opacity: 0.2,
					}}
				/>
			</Box>
		));
	}

	return blogIsLoading
		? blogSkeleton((props.postNumber && props.postNumber) || 3)
		: posts.map((post) => articleFromPost(post));
}

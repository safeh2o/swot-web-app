import {
	Box,
	Card,
	CardContent,
	Divider,
	Skeleton,
	Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { blogSelectors } from "../reducers/posts";
import { Posts as css } from "../styles/styles";

export default function Posts(props) {
	const { data: posts } = props;
	const blogLoadingStatus = useSelector(blogSelectors.loadingStatus);

	function articleFromPost(post) {
		const link = `/blog/${post.slug}`;
		return (
			<Card sx={{ ...css.cardElement }} key={link}>
				<CardContent>
					<Box component="article">
						{post?.image?.secure_url && (
							<figure>
								<NavLink to={link}>
									<img src={post?.image?.secure_url} alt="" />
								</NavLink>
							</figure>
						)}
						<Typography
							component={NavLink}
							to={link}
							variant="h3"
							gutterBottom
							color="primary"
							sx={{ display: "block", fontWeight: "500" }}
						>
							{post.title}
						</Typography>
						<Typography
							variant="body1"
							gutterBottom
							component="div"
						>
							{post.content.brief}
						</Typography>
						<Divider
							sx={{
								borderColor: "primary.main",
								my: 1,
								opacity: 0.1,
							}}
						/>
						<Typography
							component="time"
							variant="caption"
							sx={{ color: "#999" }}
						>
							{post.publishedDate}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		);
	}

	// my own custom times method with a custom api
	let times = (count, func) => {
		var i = 0,
			per,
			results = [];
		count = count || 0;
		func = func || function () {};

		// while i is less than len
		while (i < count) {
			per = i / count;

			// call function with a custom api that can be
			// used via the this keyword
			results.push(
				func.call(
					{
						i: i,
						count: count,
						per: per,
						bias: 1 - Math.abs(0.5 - per) / 0.5,
						results: results,
					},
					i,
					count,
					per
				)
			);
			i += 1;
		}
		return results;
	};

	function blogSkeleton(numPosts) {
		const post = {
			title: "Stepping Up: Sanitation specialist develops system",
			publishedDate: "November 25, 2020",
			content: {
				brief: "This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership.",
			},
		};

		return times(numPosts, (i) => (
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

	return blogLoadingStatus === "success"
		? posts.map((post) => articleFromPost(post))
		: blogSkeleton((props.postNumber && props.postNumber) || 3);
}

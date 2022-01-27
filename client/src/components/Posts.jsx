import { Box, Divider, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { blogSelectors } from "../reducers/posts";

export default function Posts(props) {
	const { data: posts } = props;
	const blogLoadingStatus = useSelector(blogSelectors.loadingStatus);

	function articleFromPost(post) {
		const link = `/blog/${post.slug}`;
		return (
			<Box component="article" key={link}>
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
				<Typography variant="body1" gutterBottom component="div">
					{post.content.brief}
				</Typography>
				<Typography component="time" variant="caption">
					{post.publishedDate}
				</Typography>
				<Divider
					sx={{
						borderColor: "primary.main",
						my: 3,
						opacity: 0.2,
					}}
				/>
			</Box>
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

/*
<Box component="article">
	<Typography variant="h2" gutterBottom sx={{ fontWeight: '500' }}>
		Stepping Up: Sanitation specialist develops system to ensure
		refugee camps anywhere can have healthy drinking water
	</Typography>
	<Typography variant="body1" gutterBottom component="div">
		This is part of Stepping Up, a series introducing Canadians to
		their country&lsquo;s new sources of inspiration and leadership.
	</Typography>
	<Typography
		component="time"
		variant="caption"
		sx={{ display: 'block', mt: 1, color: '#9a9a9a' }}
	>
		December 9th, 2020
	</Typography>
</Box>
<Box component="article">
	<Typography variant="h2" gutterBottom sx={{ fontWeight: '500' }}>
		Global WASH Cluster (GWC) Annual Meeting Satellite
	</Typography>
	<Typography variant="body1" gutterBottom component="div">
		Check out a recent presentation made during one of the events.
	</Typography>
	<Typography
		component="time"
		variant="caption"
		sx={{ display: 'block', mt: 1, color: '#9a9a9a' }}
	>
		May 22, 2021
	</Typography>
</Box>
<Box component="article">
	<Typography variant="h2" gutterBottom sx={{ fontWeight: '500' }}>
		New Research Grant: SWOT awarded major research grant from
		Humanitarian Innovation Fund/Elrha
	</Typography>
	<Typography variant="body1" gutterBottom component="div">
		SWOT awarded $0.5 million WASH Evidence Challenge grant from the
		HIF.
	</Typography>
	<Typography
		component="time"
		variant="caption"
		sx={{ display: 'block', mt: 1, color: '#9a9a9a' }}
	>
		November 25, 2020
	</Typography>
</Box>
*/

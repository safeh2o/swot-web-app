import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blogSelectors } from "../reducers/posts";

export default function Posts(props) {
	const { data: posts } = props;
	const blogLoadingStatus = useSelector(blogSelectors.loadingStatus);

	function articleFromPost(post) {
		const link = `/blog/${post.slug}`;
		return (
			<article className="block" key={link}>
				<figure>
					<Link to={link}>
						<img
							src={
								post?.image?.secure_url ||
								"/assets/placeholder-square.png"
							}
							alt=""
						/>
					</Link>
				</figure>
				<div>
					<time>{post.publishedDate}</time>
					<h2>
						<Link to={link}>{post.title}</Link>
					</h2>
					<div>
						<p>{post.content.brief}</p>
					</div>
				</div>
			</article>
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
			<article className="block" key={i}>
				<figure>
					<Skeleton variant="rectangular" component="img" />
				</figure>
				<div>
					<Skeleton>
						<time>{post.publishedDate}</time>
					</Skeleton>
					<Skeleton component="h2">
						<a>{post.title}</a>
					</Skeleton>

					<Skeleton variant="rectangular">
						<div>
							<p>{post.content.brief}</p>
						</div>
					</Skeleton>
				</div>
			</article>
		));
	}

	return blogLoadingStatus === "success"
		? posts.map((post) => articleFromPost(post))
		: blogSkeleton(3);
}

/*
			<article className="block">
				<figure>
					<img src="/assets/placeholder-square.png" alt="" />
				</figure>
				<div>
					<time dateTime="Fri, 30 Apr 2021 20:34:29 +0000">
						December 9th, 2020
					</time>
					<h2>
						<a href="#">
							New Research Grant: SWOT awarded major research
							grant from Humanitarian Innovation Fund/Elrha
						</a>
					</h2>
					<div>
						<p>
							SWOT awarded $0.5 million WASH Evidence Challenge
							grant from the HIF.
						</p>
					</div>
				</div>
			</article>
			<article className="block">
				<figure>
					<img src="/assets/placeholder-square.png" alt="" />
				</figure>
				<div>
					<time dateTime="Fri, 30 Apr 2021 20:34:29 +0000">
						May 22, 2021
					</time>
					<h2>
						<a href="#">
							Global WASH Cluster (GWC) Annual Meeting Satellite
						</a>
					</h2>
					<div>
						<p>
							Check out a recent presentation made during one of
							the events.
						</p>
					</div>
				</div>
			</article>
			<article className="block">
				<figure>
					<img
						src="https://www.theglobeandmail.com/resizer/7GtDjOvVq7XmAxufC7TZpAqjssw=/620x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/tgam/3Y4SNA4XKRGBNCXRG2MGV43YCM.JPG"
						alt=""
					/>
				</figure>
				<div>
					<time dateTime="Fri, 30 Apr 2021 20:34:29 +0000">
						November 25, 2020
					</time>
					<h2>
						<a href="#">
							Stepping Up: Sanitation specialist develops system
							to ensure refugee camps anywhere can have healthy
							drinking water
						</a>
					</h2>
					<div>
						<p>
							This is part of Stepping Up, a series introducing
							Canadians to their country’s new sources of
							inspiration and leadership.
						</p>
					</div>
				</div>
			</article>

*/

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { SvgIcon } from "@mui/material";

import { blogSelectors } from "../reducers/blog";
import { setLoading } from "../reducers/notifications";
import { replaceCrumbTitle } from "../reducers/view";

export default function BlogPost() {
	const dispatch = useDispatch();
	const allPostCategories = useSelector(blogSelectors.postCategories);
	const { slug } = useParams();
	const defaultPage: {
		title: string;
		content: { extended: string };
		image?: { secure_url: string };
		publishedDate?: string;
		categories?: string[];
	} = {
		title: "",
		content: { extended: "" },
	};
	const [page, setPage] = useState(defaultPage);
	useEffect(() => {
		dispatch(setLoading(true));
		fetch(`/api/cms/posts/${slug}`)
			.then((res) => res.json())
			.then((json) => {
				setPage(json);
			})
			.catch(() => {
				setPage({
					title: "Uh oh...",
					content: {
						extended: "Looks like you've entered an invalid post!",
					},
				});
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}, [slug, dispatch]);

	useEffect(() => {
		if (page.title) {
			dispatch(replaceCrumbTitle({ title: page.title, path: `/blog/${slug}` }));
		}
	}, [page, slug, dispatch]);

	const formatPublishTime = (isoTime: string) => {
		const publishTime = new Date(isoTime);
		const localeOptions: Intl.DateTimeFormatOptions = {
			month: "long",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
		};

		return publishTime.toLocaleString(undefined, localeOptions);
	};

	return (
		<>
			<section>
				<div className="section-wrap post">
					<article className="app-card">
						{page?.image?.secure_url && (
							<figure className="post-image">
								<img src={page.image.secure_url} alt="" />
							</figure>
						)}
						<div className="post-details">
							<h1 className="section-title h3">
								<span>{page.title || "Loading..."}</span>
							</h1>
							<header className="post-meta small">
								{page.publishedDate && (
									<time>{formatPublishTime(page.publishedDate)}</time>
								)}
								<span className="categories-post">
									{page.categories && page.categories.length > 0 && (
										<>
											<span className="divider">in</span>
											{page.categories.map((categoryId, i) => (
												<span key={"cat-" + i}>
													{allPostCategories?.byId?.[categoryId]?.name ||
														""}
												</span>
											))}
										</>
									)}
								</span>
							</header>
							{page.publishedDate && (
								<div className="post-text">
									<div
										dangerouslySetInnerHTML={{
											__html: DOMPurify.sanitize(page.content.extended),
										}}
									></div>
								</div>
							)}
						</div>
					</article>
					<footer className="posts-footer">
						<NavLink className="btn back" to={"/blog"}>
							<i>
								<SvgIcon
									xmlns="http://www.w3.org/2000/svg"
									width="40px"
									height="40px"
									fill="#000000"
									viewBox="0 0 256 256"
								>
									<path d="M224,128a8,8,0,0,1-8,8H120v64a8,8,0,0,1-4.9,7.4,8.5,8.5,0,0,1-3.1.6,8.3,8.3,0,0,1-5.7-2.3l-72-72a8.1,8.1,0,0,1,0-11.4l72-72a8.4,8.4,0,0,1,8.8-1.7A8,8,0,0,1,120,56v64h96A8,8,0,0,1,224,128Z"></path>
								</SvgIcon>
							</i>
							<span>All Articles</span>
						</NavLink>
					</footer>
				</div>
			</section>
		</>
	);
}

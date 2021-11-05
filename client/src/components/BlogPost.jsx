import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import { pushView } from "../reducers/view";
import { setLoading } from "../reducers/notifications";

export default function BlogPost(props) {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const defaultPage = {
		title: "",
		content: { extended: null },
	};
	const [page, setPage] = useState(defaultPage);
	useEffect(() => {
		dispatch(setLoading(true));
		setPage(defaultPage);
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
	}, [slug]);

	useEffect(() => {
		if (page.title) {
			dispatch(pushView({ title: page.title, path: `/blog/${slug}` }));
		}
	}, [page]);

	return (
		<>
			<div className="container">
				<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
					<h1 className="display-4" id="headerText">
						{page.title || "Loading..."}
					</h1>
				</div>
			</div>
			<div className="container px-3 py-3 pb-md-4 mx-auto">
				{page.image && page.image.secure_url && (
					<div className="image-wrap">
						<img
							src={page.image.secure_url}
							className="img-responsive"
						/>
						<br />
						<br />
					</div>
				)}
				<div
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(
							page.content.extended !== null
								? page.content.extended
								: "Content is loading..."
						),
					}}
				/>
			</div>
		</>
	);
}

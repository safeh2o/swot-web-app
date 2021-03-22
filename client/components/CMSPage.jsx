import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function CMSPage(props) {
	const { slug } = useParams();
	const defaultPage = {
		title: "Loading...",
		content: { extended: "Content is loading..." },
	};
	const [page, setPage] = useState(defaultPage);
	useEffect(() => {
		setPage(defaultPage);
		fetch(`/api/cms/pages/${slug}`)
			.then((res) => res.json())
			.then((json) => {
				setPage(json);
			})
			.catch(() => {
				setPage({
					title: "Uh oh...",
					content: {
						extended: "Looks like you've entered an invalid page!",
					},
				});
			});
	}, [slug]);

	return (
		<>
			<div className="container">
				<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
					<h1 className="display-4" id="headerText">
						{page.title}
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
						__html: DOMPurify.sanitize(page.content.extended),
					}}
				/>
			</div>
		</>
	);
}

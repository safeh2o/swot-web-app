import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../reducers/notifications";
import { pushView } from "../reducers/view";

export default function CMSPage(props) {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const defaultPage = {
		title: "",
		content: { extended: "" },
	};
	const [page, setPage] = useState(defaultPage);
	useEffect(() => {
		dispatch(setLoading(true));
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
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}, [slug]);

	useEffect(() => {
		if (page.title) {
			dispatch(pushView({ title: page.title, path: `/pages/${slug}` }));
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
							page.content.extended || "Content is loading..."
						),
					}}
				/>
			</div>
		</>
	);
}

import { Box } from "@mui/material";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../reducers/notifications";
import { replaceCrumbTitle } from "../reducers/view";

export default function CMSPage() {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const defaultPage: {
		title: string;
		content: { extended: string };
		image?: { secure_url: "" };
	} = {
		title: "",
		content: { extended: "" },
	};
	const [page, setPage] = useState(defaultPage);
	useEffect(() => {
		dispatch(setLoading(true));
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
	}, [slug, dispatch]);

	useEffect(() => {
		if (page.title) {
			dispatch(replaceCrumbTitle({ title: page.title, path: slug }));
		}
	}, [page, slug, dispatch]);

	return (
		<>
			<article id={"page-" + slug}>
				<section>
					<div className="section-wrap">
						<div class="intro">
							<h1 class="section-title">
								{page.title || "Loading..."}
							</h1>
							{page.image && page.image.secure_url && (
								<Box component={"figure"} sx={{ mb: 2 }}>
									<img src={page.image.secure_url} alt="" />
								</Box>
							)}
							<div
								className="rte"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										page.content.extended ||
											"Content is loading..."
									),
								}}
							></div>
						</div>
					</div>
				</section>
			</article>
		</>
	);
}
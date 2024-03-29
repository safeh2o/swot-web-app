import { Box } from "@mui/material";
import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../reducers/notifications";
import { replaceCrumbTitle } from "../reducers/view";
import { Page } from "../types";

export default function CMSPage() {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const defaultPage: Page = {
		title: "",
		content: { extended: "" },
	};
	const [page, setPage] = useState(defaultPage);
	useEffect(() => {
		dispatch(setLoading(true));
		axios
			.get<Page>(`/api/cms/pages/${slug}`)
			.then(({ data }) => {
				setPage(data);
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
			dispatch(replaceCrumbTitle({ title: page.title, path: `/pages/${slug}` }));
		}
	}, [dispatch, page, slug]);

	return (
		<>
			<article id={"page-" + slug}>
				<section>
					<div className="section-wrap">
						<div className="intro">
							<h1 className="section-title">{page.title || "Loading..."}</h1>
							{page.image?.secure_url && (
								<Box component={"figure"} sx={{ mb: 2 }}>
									<img src={page.image.secure_url} alt="" />
								</Box>
							)}
							<div
								className="rte"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										page.content?.extended || "Content is loading..."
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

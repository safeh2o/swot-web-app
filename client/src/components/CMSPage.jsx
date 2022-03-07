import { Box, Card, CardContent, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../reducers/notifications";
import { pushView } from "../reducers/view";
import { CMSPage as css } from "../styles/styles";

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
			<Card sx={{ ...css.cardElement }}>
				<CardContent>
					<Box component="article">
						{page.image && page.image.secure_url && (
							<Box component={"figure"} sx={{ mb: 2 }}>
								<img src={page.image.secure_url} alt="" />
							</Box>
						)}
						<Typography
							component={"h3"}
							variant="h3"
							gutterBottom
							color="primary"
							sx={{ display: "block", fontWeight: "500" }}
						>
							{page.title || "Loading..."}
						</Typography>
						<div
							variant="body1"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(
									page.content.extended ||
										"Content is loading..."
								),
							}}
						></div>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}

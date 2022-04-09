import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Typography,
} from "@mui/material";
import DOMPurify from "dompurify";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { setLoading } from "../reducers/notifications";
import { replaceCrumbTitle } from "../reducers/view";
import { BlogPost as css } from "../styles/styles";
import { IconArrowBack } from "./icons";

export default function BlogPost() {
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
			dispatch(replaceCrumbTitle({ title: page.title, path: slug }));
		}
	}, [page]);

	const formatPublishTime = (string) => {
		const dt = DateTime.fromISO(string);
		const f = {
			month: "long",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
		};
		return dt.toLocaleString(f);
	};

	return (
		<>
			<Button
				to={`/blog`}
				component={NavLink}
				size="large"
				sx={{ ...css.buttonBackToResults.wrapper }}
			>
				<IconArrowBack />
				<Box sx={{ ...css.buttonBackToResults.text }}>All News</Box>
			</Button>
			<Card sx={{ ...css.cardElement }}>
				<CardContent>
					<Box component="article">
						{page.image && page.image.secure_url && (
							<Box component={"figure"} sx={{ mb: 2 }}>
								<img src={page.image.secure_url} alt="" />
							</Box>
						)}
						<Typography
							component={"h1"}
							variant="h1"
							gutterBottom
							color="primary"
							sx={{ display: "block", fontWeight: "500" }}
						>
							{page.title || "Loading..."}
						</Typography>
						<Typography variant="body1" component={"div"}>
							<div
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										page.content.extended !== null
											? page.content.extended
											: "Content is loading..."
									),
								}}
							></div>
						</Typography>
						<Divider sx={{ mb: 1 }} />
						<Typography
							component="time"
							variant="caption"
							sx={{ color: "#999" }}
						>
							{formatPublishTime(page.publishedDate)}
						</Typography>
						{page.categories && page.categories.length > 0 && (
							<Typography
								component="div"
								variant="caption"
								sx={{ color: "#999" }}
							>
								Categories: &nbsp;{" "}
								{page.categories.map((cat) => cat)}
							</Typography>
						)}
					</Box>
				</CardContent>
			</Card>
		</>
	);
}

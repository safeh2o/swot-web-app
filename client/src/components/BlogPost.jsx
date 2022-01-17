import { Card, CardContent, Divider } from "@mui/material";
import { Box, Typography, Button, SvgIcon } from "@mui/material";
import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { pushView } from "../reducers/view";
import { setLoading } from "../reducers/notifications";

import DOMPurify from "dompurify";
import { DateTime } from "luxon";
import { object } from "prop-types";

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
			dispatch(pushView({ title: page.title, path: `/blog/${slug}` }));
		}
	}, [page]);

	const formatPublishTime = (string) => {
		const dt = DateTime.fromISO(string);
		const f = {
			month: "long",
			day: "numeric",
			year: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
		};
		return dt.toLocaleString(f);
	};

	// Styles
	const css = {
		buttonBackToResults: {
			wrapper: {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				backgroundColor: "primary.main",
				color: "#fcfcfc",
				p: 2,
				mb: 4,
				"&:hover": {
					backgroundColor: "primary.main",
				},
			},
			icon: {
				flex: "1 0 1.3em",
				maxWidth: "1.3em",
				maxHeight: "1.3em",
			},
			text: {
				fontSize: "1rem",
				lineHeight: 1,
				textTransform: "capitalize",
				paddingLeft: "10px",
			},
		},
		cardElement: {
			overflow: "visible",
			marginBottom: "30px",
			"& .MuiCardContent-root": {
				p: 2,
				"&:last-child": {
					p: 2,
				},
			},
		},
	};

	return (
		<>
			<Button
				to={`/blog`}
				component={NavLink}
				size="large"
				sx={{ ...css.buttonBackToResults.wrapper }}
			>
				<SvgIcon
					viewBox="0 0 32 32"
					sx={{ ...css.buttonBackToResults.icon }}
				>
					<path d="M29.4 17.5h-22l4.2 5.6-2.4 1.8L2.6 16l6.7-8.9 2.4 1.8-4.2 5.6h22v3z" />
				</SvgIcon>
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
									page.content.extended !== null
										? page.content.extended
										: "Content is loading..."
								),
							}}
						></div>
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

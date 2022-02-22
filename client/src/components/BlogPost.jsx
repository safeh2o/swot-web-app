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
				backgroundColor: "transparent",
				border: ".5px solid #ddd",
				color: "#666",
				p: 1,
				mb: 4,
				"&:hover": {
					color: "currentColor",
					backgroundColor: "#eee",
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
					viewBox="0 0 256 256"
					sx={{ ...css.buttonBackToResults.icon }}
				>
					<rect width="256" height="256" fill="none"></rect>
					<line
						x1="216"
						y1="128"
						x2="40"
						y2="128"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
					></line>
					<polyline
						points="112 56 40 128 112 200"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
					></polyline>
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
							component={"h1"}
							variant="h1"
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

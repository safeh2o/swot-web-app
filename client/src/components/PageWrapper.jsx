import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
	AppBar,
	Backdrop,
	Box,
	CircularProgress,
	IconButton,
	Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { notificationsSelectors } from "../reducers/notifications";
import { userSelectors } from "../reducers/user";
import AppBreadcrumbs from "./elements/AppBreadcrumbs";
import PublicSnackbar from "./elements/PublicSnackbar";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import NavTools from "./layout/NavTools.jsx";

function PageWrapper(props) {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const isLoading = useSelector(notificationsSelectors.loading);

	let url = useLocation();
	const isToolSideBar = [
		"/collect",
		"/upload",
		"/analyze",
		"/results",
		"/",
	].some((path) => url.pathname === path);

	const layoutMetrics = {
		sidebar: 170,
		content: 700,
	};

	const BackToTopAnchor = useRef(null);
	const scrollTrigger = useScrollTrigger();

	const css = {
		header: {
			position: "sticky",
		},
		backdrop: {
			color: "#4369ac",
			zIndex: (theme) => theme.zIndex.speedDial + 1,
			backgroundColor: "#fff",
			"& > *": {
				color: "inherit",
			},
		},
		breadcrumbs: {
			typography: "caption",
			color: "#aaa",
			width: "100%",
			pt: 1,
			pb: 0,
			px: 4,
			ml: "auto",
			mr: "auto",
			"& a": {
				color: "inherit",
				textDecorationStyle: "dotted",
			},
		},
		main: {
			display: "flex",
			flexDirection: { xs: "Columns", md: "Rows" },
			justifyContent: "center",
			px: 2,
			width: "100%",
		},
		nav: {
			display: { xs: "none", md: "block" },
			flex: { xs: "1", md: "1 0 33%" },
			maxWidth: layoutMetrics.sidebar,
			m: { md: 2 },
			mr: { md: 3 },
		},
		article: {
			flex: { xs: "1", md: "1 0 66%" },
			maxWidth: layoutMetrics.content,
			m: 2,
		},
	};

	return (
		<>
			{/* Header */}
			<Slide appear={false} direction="down" in={!scrollTrigger}>
				<AppBar sx={{ ...css.header }}>
					<Header />
				</AppBar>
			</Slide>

			<Box ref={BackToTopAnchor} component="span"></Box>

			{/* Loading Screen */}
			<Backdrop
				open={isLoading}
				sx={{ ...css.backdrop }}
				transitionDuration={{
					appear: 0,
					enter: 550,
					exit: 750,
				}}
			>
				<CircularProgress />
			</Backdrop>

			{/* Breadcrumbs */}
			<AppBreadcrumbs sx={{ ...css.breadcrumbs }} />

			{/* Content Wrapper */}
			<Box component={"main"} sx={{ ...css.main }}>
				{/* Sidebar */}
				{isLoggedIn && isToolSideBar && (
					<Box component="nav" sx={{ ...css.nav }}>
						<Typography
							component={"h1"}
							variant="body1"
							sx={{
								mb: 2,
								fontSize: "1.45rem",
								fontWeight: "400",
								fontFamily: '"Roboto Condensed", sans-serif',
								lineHeight: "1.2",
								letterSpacing: "-0.02em",
								color: "#747e87",
								margin: "5px 0 10px 8px",
							}}
						>
							Tool Menu
						</Typography>
						<NavTools />
					</Box>
				)}
				<Box component={"article"} sx={{ ...css.article }}>
					{props.children}
				</Box>
				<PublicSnackbar />
			</Box>

			{/* Footer */}
			<Footer />

			{/* Scroll Up */}
			<IconButton
				onClick={() =>
					BackToTopAnchor.current &&
					BackToTopAnchor.current.scrollIntoView({
						behavior: "smooth",
						block: "center",
					})
				}
				role="presentation"
				sx={{
					opacity: scrollTrigger ? "1" : "0",
					pointerEvents: scrollTrigger ? "all" : "none",
					position: "fixed",
					bottom: "24px",
					right: "24px",
					color: "#fff",
					lineHeight: "0",
					borderRadius: "3px",
					backgroundColor: "primary.main",
					boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
					"&:hover": {
						backgroundColor: "primary.main",
					},
					transition: "opacity 0.2s ease",
				}}
			>
				<KeyboardArrowUpIcon aria-label="scroll back to top" />
			</IconButton>
		</>
	);
}

PageWrapper.propTypes = {
	children: PropTypes.object,
};

export default PageWrapper;

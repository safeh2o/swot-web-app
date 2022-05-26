import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
	Backdrop,
	Box,
	CircularProgress,
	IconButton,
	Typography,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { notificationsSelectors } from "../reducers/notifications";
import { userSelectors } from "../reducers/user";
import { PageWrapper as css } from "../styles/styles";
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

	const BackToTopAnchor = useRef(null);
	const scrollTrigger = useScrollTrigger();

	return (
		<>
			{/* Header */}
			<Box component={"header"} className="site-header">
				<Header />
			</Box>

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
							sx={{ ...css.sectionHeader }}
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
					...css.scrollup,
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

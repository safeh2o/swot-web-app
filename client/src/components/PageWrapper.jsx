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

	const isHome = url.pathname === "/";

	const isToolPage = ["/collect", "/upload", "/analyze", "/results"].some(
		(path) => url.pathname.includes(path)
	);

	const isNotFound = url.pathname === "/not-found";

	const isBlogPage = ["/blog"].some((path) => url.pathname.includes(path));

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
				transitionDuration={{
					appear: 0,
					enter: 550,
					exit: 750,
				}}
				className="backdrop"
			>
				<CircularProgress />
			</Backdrop>

			{/* Content Wrapper */}
			<Box
				component={"main"}
				className={{
					home: isHome,
					"page-blog": isBlogPage,
					"page-tool": (isToolPage || isHome) && isLoggedIn,
					page: !isBlogPage && !isToolPage,
				}}
			>
				{/* Breadcrumbs */}
				{!isNotFound && <AppBreadcrumbs />}
				{/* Sidebar */}
				{isLoggedIn && (isToolPage || isHome) && (
					<Box component="nav" className="nav-tool">
						<NavTools />
					</Box>
				)}
				{/* Content */}
				{props.children}
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
				}}
				className="scrollup"
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

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Backdrop, Box, CircularProgress, IconButton } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { notificationsSelectors } from "../reducers/notifications";
import { userSelectors } from "../reducers/user";
import { viewSelectors } from "../reducers/view";
import AppBreadcrumbs from "./elements/AppBreadcrumbs";
import PublicSnackbar from "./elements/PublicSnackbar";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import NavTools from "./layout/NavTools";

function PageWrapper(props: { children: ReactElement | ReactElement[] }) {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const isLoading = useSelector(notificationsSelectors.loading);

	const url = useLocation();

	const isHome = url.pathname === "/";

	const isToolPage = [
		"/collect",
		"/upload",
		"/analyze",
		"/results",
		"/manage",
	].some((path) => url.pathname.includes(path));

	const isNotFound = url.pathname === "/not-found";

	const isBlogPage = ["/blog", "/faq"].includes(url.pathname);

	const BackToTopAnchor = useRef<Element>(null);
	const scrollTrigger = useScrollTrigger();

	const viewStack = useSelector(viewSelectors.viewStack);
	const currentView = viewStack?.[viewStack.length - 1];

	useEffect(() => {
		if (currentView?.title) {
			document.title = `SWOT - ${currentView.title}`;
		} else {
			document.title = "Safe Water Optimization Tool";
		}
	}, [currentView]);

	const getClassName = () => {
		const classes: string[] = [];

		classes.push(isLoggedIn ? "user" : "guest");
		if (isHome) {
			classes.push("page-home");
		}
		if (isBlogPage) {
			classes.push("page-blog");
		}
		if ((isToolPage || isHome) && isLoggedIn) {
			classes.push("page-tool");
		}
		if (!isBlogPage && !isToolPage && !isHome) {
			classes.push("page-cms");
		}

		return classes.join(" ");
	};

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
			<Box component={"main"} className={getClassName()}>
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
					BackToTopAnchor.current?.scrollIntoView({
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

export default PageWrapper;

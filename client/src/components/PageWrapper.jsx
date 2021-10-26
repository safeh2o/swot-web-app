import React from "react";

import Header from "./layout/Header";
import SideBar from "./layout/SideBar";
import Footer from "./layout/Footer";
import FlashMessages from "./elements/FlashMessages";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../reducers/notifications";
import AppBreadcrumbs from "./elements/AppBreadcrumbs";
import { Link } from "react-router-dom";

import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default function PageWrapper(props) {
	const classes = useStyles();

	const isLoading = useSelector(notificationsSelectors.loading);

	return (
		<>
			<Header />
			<Backdrop open={isLoading} className={classes.backdrop}>
				<CircularProgress />
			</Backdrop>
			<main>
				<AppBreadcrumbs />
				<SideBar />
				<section id="content">
					<FlashMessages />
					{props.children}
				</section>
			</main>
			<Footer />
		</>
	);
}

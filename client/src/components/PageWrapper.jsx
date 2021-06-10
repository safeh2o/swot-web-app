import React from "react";
import { Helmet } from "react-helmet";

import Header from "./layout/Header";
import SideBar from "./layout/SideBar";
import Footer from "./layout/Footer";
import FlashMessages from "./elements/FlashMessages";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../reducers/notifications";
import { ThemeProvider } from "@material-ui/styles";
// import DateFnsUtils from "@date-io/date-fns";

import theme from "../theme";
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

	let pageTitle = false;
	function HeaderView() {
		if (pageTitle) {
			return (
				'<h1 className="content-title txt-condensed">' +
				pageTitle +
				"</h1>"
			);
		}
	}

	function renderModals() {
		const { user } = context;
		if (!user) {
			return null;
		}
		return (
			<>
				<Helmet>
					<meta charset="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<link
						rel="shortcut icon"
						href="/favicon.ico"
						type="image/x-icon"
					/>
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<script
						src="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
						integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
						crossorigin="anonymous"
					></script>
				</Helmet>
				<div className="water-container hide">
					<div className="glass">
						<div className="water"></div>
					</div>
				</div>
			</>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Backdrop open={isLoading} className={classes.backdrop}>
				<CircularProgress />
			</Backdrop>
			<main>
				{HeaderView()}
				<div className="breadcrumbs">
					<span className="crumb">
						<span className="txt-icon">
							<i></i>
							<span>Home</span>
						</span>
					</span>
					<span className="crumb">
						<span className="txt-icon">
							<span>Tool</span>
						</span>
					</span>
				</div>
				<SideBar /> {/* Tool|Admin Navigation */}
				<section id="content">
					<FlashMessages />
					{props.children}
				</section>
			</main>{" "}
			{/* Component|Views */}
			<Footer /> {/* Colophon */}
		</ThemeProvider>
	);
}

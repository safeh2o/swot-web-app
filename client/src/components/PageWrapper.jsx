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
							<i>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									x="0"
									y="0"
									version="1.1"
									viewBox="0 0 40 40"
									xmlSpace="preserve"
								>
									<path
										fill="#747E87"
										d="M23.6 33.1v-7.6c0-.7-.6-1.3-1.3-1.3h-5.1c-.7 0-1.3.6-1.3 1.3v7.6c0 .7-.6 1.3-1.3 1.3H7c-.7 0-1.3-.6-1.3-1.3V18.4c0-.4.2-.7.4-.9L19 5.9c.5-.4 1.2-.4 1.7 0l12.7 11.6c.3.2.4.6.4.9v14.7c0 .7-.6 1.3-1.3 1.3h-7.6c-.7 0-1.3-.6-1.3-1.3z"
									></path>
								</svg>
							</i>
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

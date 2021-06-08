import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./layout/Header";
import SideBar from "./layout/SideBar";
import Footer from "./layout/Footer";
import FlashMessages from "./elements/FlashMessages";
import { useDispatch, useSelector } from "react-redux";
import { notificationsSelectors } from "../reducers/notifications";
import { ThemeProvider } from "@material-ui/styles";

import theme from "../theme";

export default function PageWrapper(props) {
	const dispatch = useDispatch();
	const notifications = useSelector(notificationsSelectors.notifications);

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

	const history = useHistory();
	useEffect(() => {
		return history.listen((location) => {
			console.log(props);
		});
	}, [history]);

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
				<div className="modal fade" id="ConfirmModal">
					<div className="modal-content dashboard">
						<div className="modal-header">
							<span className="modal-title">Status</span>
							<button
								type="button"
								className="close txt-icon"
								data-dismiss="modal"
							>
								<i>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 40 40"
										xmlSpace="preserve"
									>
										<line
											fill="none"
											stroke="currentColor"
											strokeWidth="3"
											strokeMiterlimit="10"
											x1="7"
											y1="33"
											x2="33"
											y2="7"
										/>
										<line
											fill="none"
											stroke="currentColor"
											strokeWidth="3"
											strokeMiterlimit="10"
											x1="7"
											y1="7"
											x2="33"
											y2="33"
										/>
									</svg>
								</i>
							</button>
						</div>
						<div className="modal-body">
							<p id="confirmMsg"></p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="button"
								data-dismiss="modal"
							>
								<span>OK</span>
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Header /> {/* Content Navigation */}
			<main>
				{HeaderView()}
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

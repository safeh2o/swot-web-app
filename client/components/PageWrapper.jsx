import React, { useContext, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

import AppContext from "../contexts/AppContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FlashMessages from "./elements/FlashMessages";

export default function PageWrapper(props) {
	const context = useContext(AppContext);

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
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Status</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
								>
									&times;
								</button>
							</div>

							<div className="modal-body">
								<p id="confirmMsg"></p>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									data-dismiss="modal"
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<NavBar />
			<div id="body">
				{renderModals()}
				<FlashMessages messages={context.messages} />
				{props.children}
			</div>
			<Footer />
		</>
	);
}

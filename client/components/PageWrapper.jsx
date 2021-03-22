import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import AppContext from "../contexts/AppContext";
import NavBar from "./NavBar";
import Footer from "./Footer";

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
				<div className="modal fade" id="UserDetailsModal">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">USER DETAILS</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
								>
									&times;
								</button>
							</div>

							<div className="modal-body">
								<form
									className="form"
									role="form"
									autoComplete="off"
									id="formUser"
								>
									<div className="form-group">
										<label htmlFor="firstName">
											First Name
										</label>
										<input
											type="text"
											autoComplete="given-name"
											className="form-control form-control-lg"
											name="firstName"
											id="firstName"
											required=""
											defaultValue={user.name.first}
										/>
									</div>

									<div className="form-group">
										<label htmlFor="lastName">
											Last Name
										</label>
										<input
											type="text"
											autoComplete="family-name"
											className="form-control form-control-lg"
											name="lastName"
											id="lastName"
											defaultValue={user.name.last}
											required=""
										/>
									</div>

									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input
											type="text"
											autoComplete="email"
											className="form-control form-control-lg"
											name="email"
											id="email"
											defaultValue={user.email}
											required=""
										/>
									</div>

									<h6>Change Password</h6>
									<div className="form-group">
										<label htmlFor="password1">
											Password
										</label>
										<input
											type="password"
											autoComplete="new-password"
											className="form-control form-control-lg"
											name="password1"
											id="password1"
											minLength="6"
										/>
									</div>

									<div className="form-group">
										<label htmlFor="password2">
											Confirm Password
										</label>
										<input
											type="password"
											autoComplete="new-password"
											className="form-control form-control-lg"
											name="password2"
											id="password2"
											minLength="6"
										/>
									</div>

									<div className="form-group pt-4">
										<button
											className="btn btn-danger btn-lg"
											data-dismiss="modal"
											aria-hidden="true"
										>
											Cancel
										</button>
										<button
											type="submit"
											className="btn btn-primary btn-lg float-right"
											id="btnSaveUserDetails"
										>
											Save
										</button>
									</div>
								</form>
							</div>
						</div>
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
				{props.children}
			</div>
			<Footer />
		</>
	);
}

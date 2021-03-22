import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../contexts/AppContext";

export default class NavBar extends React.Component {
	static contextType = AppContext;
	capitalizeFirstLetter(s) {
		return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
	}
	renderNavItem(section) {
		return (
			<li key={section} className="nav-item">
				<NavLink className="nav-link link" to={`/${section}`}>
					{this.capitalizeFirstLetter(section)}
				</NavLink>
			</li>
		);
	}
	renderNavItems() {
		const sections = [
			"download",
			"upload",
			"analyze",
			// "manage",
			"results",
		];
		return <>{sections.map((section) => this.renderNavItem(section))}</>;
	}
	renderNavbarCollapse() {
		const { user } = this.context;
		if (user) {
			return (
				<>
					<ul className="navbar-nav mr-auto">
						{this.renderNavItems()}
					</ul>
				</>
			);
		}
	}

	renderRightButtons() {
		const { user } = this.context;
		if (user) {
			return (
				<>
					<a
						className="panel-link"
						href="#"
						id="accountDetails"
						tabIndex="-1"
						title="Account Details"
						onClick={() => {
							$("#UserDetailsModal").modal({
								backdrop: "static",
								keyboard: false,
								focus: true,
							});
						}}
					>
						<img src="/assets/user.svg" alt="Account Details" />
					</a>
					{user.isAdmin === true && (
						<a
							className="panel-link"
							href="/admin"
							tabIndex="-1"
							title="SWOT Admin Panel"
						>
							<img
								src="/assets/settings_w.svg"
								alt="Admin Panel"
							/>
						</a>
					)}
					<a
						className="panel-link"
						href="/admin/signout"
						id="accountDetails"
						tabIndex="-1"
						title="Log Out"
					>
						<img src="/assets/logout.svg" alt="Log Out" />
					</a>
				</>
			);
		} else {
			return (
				<>
					<button
						onClick={() => {
							location.href = "/signin";
						}}
						className="btn btn-lg btn-outline-primary my-2 my-sm-0 text-nowrap"
						type="button"
					>
						LOGIN
					</button>
					<button
						onClick={() => {
							location.href = "/contact";
						}}
						className="btn btn-lg btn-outline-primary my-2 my-sm-0 text-nowrap"
						type="button"
					>
						REGISTER
					</button>
				</>
			);
		}
	}

	render() {
		return (
			<>
				<nav
					className="navbar navbar-expand-lg bg-swot-dark-blue shadow-sm"
					id="top-scroll"
				>
					<div className="container w-100">
						<Link to="/">
							<img
								className="main-logo"
								src="/assets/SWOT_LOGO.png"
								alt="swot logo"
							/>
						</Link>
						<button
							className="navbar-toggler collapsed first-button"
							type="button"
							data-toggle="collapse"
							data-target="#navbarCollapse"
							aria-controls="navbarCollapse"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<div className="animated-icon1">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</button>
						<div
							className="navbar-collapse collapse justify-flex-end"
							id="navbarCollapse"
						>
							{this.renderNavbarCollapse()}
							<div className="form-inline mt-2 mt-md-0 justify-center flex-no-wrap">
								{this.renderRightButtons()}
							</div>
						</div>
					</div>
				</nav>
			</>
		);
	}
}

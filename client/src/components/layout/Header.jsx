import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import UserDetailsModal from "../elements/UserDetailsModal";

export default class SideBar extends React.Component {
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

	renderNavbarCollapse() {
		const { user } = this.context;
		const sections = [
			"collect",
			"upload",
			"analyze",
			"results",
		];
		if (user) {
			return (
				<>
					<ul className="navbar-nav mr-auto">
						{sections.map((section) => this.renderNavItem(section))}
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
					<li className="nav-item get-started has-children">
						<a href="#" title="Get Started" className="txt-icon">
							<i><img src="/assets/icons/header-nav-swot.svg" alt="" /></i>
							<span className="label">Get Started</span>
						</a>
						<ul>
							<li>
								<Link to="/dashboard" className="txt-icon">
									<i><img src="/assets/icons/dashboard.svg" alt="" /></i>
									<span className="label">Dashboard</span>
								</Link>
							</li>
							<li><hr /></li>
							<li>
								<Link to="/collect" className="txt-icon">
									<i><img src="/assets/icons/header-nav-swot.svg" alt="" /></i>
									<span className="label">Tool</span>
								</Link>
							</li>
							<li>
								<Link to="/page/guides" className="txt-icon">
									<i><img src="/assets/icons/guide.svg" alt="" /></i>
									<span className="label">Guides</span>
								</Link>
							</li>
							<li><hr /></li>
							<li>
								<Link to="/fieldsites" className="txt-icon">
									<i><img src="/assets/icons/location-marker.svg" alt="" /></i>
									<span className="label">Field Sites</span>
								</Link>
							</li>
							<li>
								<Link to="/people" className="txt-icon">
									<i><img src="/assets/icons/people-figure.svg" alt="" /></i>
									<span className="label">People</span>
								</Link>
							</li>
						</ul>
					</li>
					<li className="nav-item nav-profile">
						<UserDetailsModal />
						{user.isAdmin === true && (
							<span
								className="profile"
								href="/admin"
								tabIndex="-1"
								title="SWOT Admin Panel">
								<img
									src="/assets/icons/header-nav-profile.svg"
									alt="Manage your Profile" />
							</span>
						)}
						<a
							id="accountDetails"
							className="signout"
							href="/admin/signout"
							tabIndex="-1"
							title="Log Out">
							<img
								src="/assets/icons/header-nav-logout.svg"
								alt="Logout" />
						</a>
					</li>
				</>
			);
		} else {
			return (
				<li className="nav-item get-started">
					<Link to="/signin" className="txt-icon">
						<i><img src="/assets/icons/header-nav-swot.svg" alt="" /></i>
						<span className="label">Log in to Start</span>
					</Link>
				</li>
			);
		}
	}

	render() {
		return (
			<header id="header">
				<nav
					id="main-navigation"
					aria-label="Site Menu"
				>
					<Link to="/" className="nav-logo">
						<img
							src="/assets/safe-water-optimization-tool-logo.svg"
							alt="Safe Water Optimization Tool (SWOT) logo" />
					</Link>

					<button className="nav-mobile">
						<span><img
							src="/assets/icons/header-nav-mobile.svg"
							alt="Toggle mobile nav" /></span>
					</button>

					<ul className="nav-wrap">

						{this.renderRightButtons()}

						<li className="nav-item">
							<Link
								to="/page/about"
								title="About the Project">
								<span>About</span>
							</Link>
						</li>

						<li className="nav-item">
							<Link
								to="/blog"
								title="News">
								<span>News</span>
							</Link>
						</li>

						<li className="nav-item">
							<Link
								to="/contact"
								title="Contact">
								<span>Contact</span>
							</Link>
						</li>

					</ul>
				</nav>
			</header>
		);
	}
}

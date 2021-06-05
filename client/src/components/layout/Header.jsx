import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import UserDetailsModal from "../elements/UserDetailsModal";

export default class SideBar extends React.Component {
	static contextType = AppContext;
	capitalizeFirstLetter(s) {
		return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
	}

	renderRightButtons() {
		const { user } = this.context;
		if (user) {
			return (
				<>
					<li className="nav-item get-started has-children">
						<a href="/collect" title="Get Started" className="txt-icon">
							<i><img src="/assets/icons/header-nav-swot.svg" alt="" /></i>
							<span className="label">Get Started</span>
						</a>
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
				<>
					<li className="nav-item get-started show-medium-up">
						<Link to="/signin" className="txt-icon">
							<i><img src="/assets/icons/header-nav-swot.svg" alt="" /></i>
							<span className="label">Log in to Start</span>
						</Link>
					</li>
					<li className="nav-item nav-profile">
						<a href="/signin" title="Sign In" className="icon">
							<i><img src="/assets/icons/header-nav-login.svg" alt="" /></i>
						</a>
					</li>
				</>
			);
		}
	}

	toggleMobileNav() {
		const body = document.querySelector('body');
		if (body.classList.contains('nav-active')) {
			body.classList.remove('nav-active');
		} else {
			body.classList.add('nav-active');
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

					<ul className="nav-wrap">

						<li className="nav-item show-medium-up">
							<Link
								to="/page/about"
								title="About the Project">
								<span>About</span>
							</Link>
						</li>

						<li className="nav-item show-medium-up">
							<Link
								to="/blog"
								title="News">
								<span>News</span>
							</Link>
						</li>

						<li className="nav-item show-medium-up">
							<Link
								to="/contact"
								title="Contact">
								<span>Contact</span>
							</Link>
						</li>

						{this.renderRightButtons('get-started')}

						<li className="nav-item nav-mobile">
							<button onClick={() => this.toggleMobileNav()}>
								<i><img
									className="open"
									src="/assets/icons/header-nav-mobile.svg"
									alt="Toggle mobile nav" /><img
										className="close"
										src="/assets/icons/header-nav-mobile-close.svg"
										alt="Toggle mobile nav" /></i>
							</button>
						</li>

					</ul>
				</nav>
			</header>
		);
	}
}

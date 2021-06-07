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
					<li className="nav-item get-started show-medium-up">
						<a href="/collect" title="Get Started" className="txt-icon">
							<i><img src="/assets/icons/header-nav-swot.svg" alt="" /></i>
							<span className="label">Get Started</span>
						</a>
					</li>
					{user.isAdmin === true && (
						<UserDetailsModal />
					)}
					<li className="nav-item nav-profile signout">
						<a
							id="accountDetails"
							className="signout"
							href="/admin/signout"
							tabIndex="-1"
							title="Log Out">
							<i>
								<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
									<path fill="none" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" d="M35.6,20H16.4 M31,25.8l4.6-5.9L31,14.1 M27.3,12.8V7.4l-18.7,1v25.2l18.7-1v-4.5" />
								</svg>
							</i>
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
					<li className="nav-item nav-profile signin">
						<a href="/signin" title="Sign In" className="icon">
							<i>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
									<line fill="none" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" x1="3.3" y1="20.1" x2="23.3" y2="20.1" />
									<polyline fill="none" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" points="18.5,13.9 23.3,20.1 18.5,26.2 " />
									<polyline fill="none" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" points="12.5,11.6 12.5,6.9 31.9,7.9 31.9,33.1 12.5,32.1 12.5,27.6" />
								</svg>
							</i>
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
							<button class="button" onClick={() => this.toggleMobileNav()}>
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

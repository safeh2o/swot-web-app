import React from "react";
import { Link, NavLink } from "react-router-dom";
import UserDetailsModal from "../elements/UserDetailsModal";
import { userSelectors } from "../../reducers/user";
import { useSelector } from "react-redux";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton } from "@material-ui/core";

export default function SideBar(props) {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);

	function renderRightButtons() {
		if (isLoggedIn) {
			return (
				<>
					<li className="nav-item get-started show-medium-up">
						<Link
							to="/collect"
							title="Get Started"
							className="txt-icon"
						>
							<i>
								<img
									src="/assets/icons/header-nav-swot.svg"
									alt=""
								/>
							</i>
							<span className="label">Get Started</span>
						</Link>
					</li>
					<UserDetailsModal />
					{user.isAdmin === true && (
						<IconButton
							href="/admin"
							title="SWOT Admin Panel"
							color="inherit"
						>
							<SettingsIcon />
						</IconButton>
					)}
					<IconButton
						id="accountDetails"
						href="/admin/signout"
						title="Log Out"
					>
						<img src="/assets/icons/header-nav-logout.svg" />
					</IconButton>
				</>
			);
		} else {
			return (
				<>
					<li className="nav-item get-started show-medium-up">
						<Link to="/signin" className="txt-icon">
							<i>
								<img
									src="/assets/icons/header-nav-swot.svg"
									alt=""
								/>
							</i>
							<span className="label">Log in to Start</span>
						</Link>
					</li>
					<li className="nav-item nav-profile signin">
						<a href="/signin" title="Sign In" className="icon">
							<i>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 40 40"
								>
									<line
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeMiterlimit="10"
										x1="3.3"
										y1="20.1"
										x2="23.3"
										y2="20.1"
									/>
									<polyline
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeMiterlimit="10"
										points="18.5,13.9 23.3,20.1 18.5,26.2 "
									/>
									<polyline
										fill="none"
										stroke="currentColor"
										strokeWidth="3"
										strokeMiterlimit="10"
										points="12.5,11.6 12.5,6.9 31.9,7.9 31.9,33.1 12.5,32.1 12.5,27.6"
									/>
								</svg>
							</i>
						</a>
					</li>
				</>
			);
		}
	}

	function toggleMobileNav() {
		const body = document.querySelector("body");
		if (body.classList.contains("nav-active")) {
			body.classList.remove("nav-active");
		} else {
			body.classList.add("nav-active");
		}
	}

	return (
		<header id="header">
			<nav id="main-navigation" aria-label="Site Menu">
				<Link to="/" className="nav-logo">
					<img
						src="/assets/safe-water-optimization-tool-logo.svg"
						alt="Safe Water Optimization Tool (SWOT) logo"
					/>
				</Link>

				<ul className="nav-wrap">
					<li className="nav-item show-medium-up">
						<Link to="/page/about" title="About the Project">
							<span>About</span>
						</Link>
					</li>

					<li className="nav-item show-medium-up">
						<Link to="/blog" title="News">
							<span>News</span>
						</Link>
					</li>

					<li className="nav-item show-medium-up">
						<Link to="/contact" title="Contact">
							<span>Contact</span>
						</Link>
					</li>

					{renderRightButtons("get-started")}

					<li className="nav-item nav-mobile">
						<button
							className="button"
							onClick={() => toggleMobileNav()}
						>
							<i>
								<img
									className="open"
									src="/assets/icons/header-nav-mobile.svg"
									alt="Toggle mobile nav"
								/>
								<img
									className="close"
									src="/assets/icons/header-nav-mobile-close.svg"
									alt="Toggle mobile nav"
								/>
							</i>
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}

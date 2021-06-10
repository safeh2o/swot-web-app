import React from "react";
import { Link, NavLink } from "react-router-dom";
import UserDetailsModal from "../elements/UserDetailsModal";
import { userSelectors } from "../../reducers/user";
import { useSelector } from "react-redux";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton } from "@material-ui/core";

// icons
import SignInIcon from "../icons/SignIn";
import SignOutIcon from "../icons/SignOut";
import AdminIcon from "../icons/Admin";

export default function Header(props) {
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
						<li className="nav-item nav-profile admin">
							<a
								href="/admin"
								className="admin"
								title="SWOT Admin Panel"
								color="inherit"
							>
								<i>
									<AdminIcon />
								</i>
							</a>
						</li>
					)}
					<li className="nav-item nav-profile signout">
						<a
							id="accountDetails"
							className="signout"
							href="/admin/signout"
							tabIndex="-1"
							title="Log Out"
						>
							<i>
								<SignOutIcon />
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
							<i>
								<img
									src="/assets/icons/header-nav-swot.svg"
									alt=""
								/>
							</i>
							<span className="label">Log in to Start</span>
						</Link>
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
						<a
							href="https://www.safeh2o.app/"
							title="About the Project"
						>
							<span>About</span>
						</a>
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

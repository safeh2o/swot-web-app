import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userSelectors } from "../../reducers/user";

// icons
import SidebarToolNav from "../icons/SidebarToolNav";
import SidebarManageNav from "../icons/SidebarManageNav";

export default function SideBar() {
	const user = useSelector(userSelectors.user);
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);

	function renderNavItem(section, i) {
		return (
			<NavLink
				key={section[1]}
				title={section[1]}
				className="nav-item-side"
				to={`/${section[0]}`}
			>
				<span>
					{section[2] ? <span className="num">{i + 1}.</span> : ``}
					<span>{section[1]}</span>
				</span>
			</NavLink>
		);
	}

	function renderGuestNav() {
		if (!user) {
			return (
				<>
					<nav aria-label="Guest Options" className="guest-options">
						<h6>Hello Guest,</h6>
						<hr />
						<p>
							For you and/or your organisation to use the SWOT,
							please{" "}
							<Link to="/contact">
								<span>Contact Us</span>
							</Link>{" "}
							in-order to setup an account, OR{" "}
							<Link to="/signin">
								<span>Log In</span>
							</Link>{" "}
							to your existing account.
						</p>
					</nav>
				</>
			);
		}
	}

	function renderContentNav() {
		// [ value, label, icon (location) ]
		if (isLoggedIn) {
			return (
				<>
					<nav aria-label="Page Menu">
						<NavLink
							to="/"
							className="nav-item-side dashboard"
							title="Home"
						>
							<span>
								<span className="label">Home</span>
							</span>
						</NavLink>
					</nav>
				</>
			);
		}
	}

	function renderToolNav() {
		// [ value, label, icon (location) ]
		const sections = [
			["collect", "Collect Data", 1],
			["upload", "Upload Data", 2],
			["analyze", "Send for Analysis", 3],
			["results", "View Results", 4],
		];
		if (isLoggedIn) {
			return (
				<>
					<nav aria-label="Tool Menu">
						<span title="Tool" className="nav-item-header">
							<span>Tool Steps</span>
							<i>
								<SidebarToolNav />
							</i>
						</span>
						{sections.map((toolSection, i) =>
							renderNavItem(toolSection, i)
						)}
					</nav>
				</>
			);
		}
	}

	function toggleAdminNav() {
		// [ value, label, icon (location) ]
		const sections = [
			["fieldsites", "Field Sites"],
			["people", "People"],
		];
		if (isLoggedIn) {
			return (
				<>
					{user.isAdmin === true && (
						<nav aria-label="Admin Menu">
							<span
								title="Admin Header"
								className="nav-item-header"
							>
								<span>Manage</span>
								<i>
									<SidebarManageNav />
								</i>
							</span>
							{sections.map((adminSection) =>
								renderNavItem(adminSection)
							)}
						</nav>
					)}
				</>
			);
		}
	}

	function togglePagesNav() {
		const sections = [
			["about", "About"],
			["news", "News"],
			["contact", "Contact"],
		];
		return (
			<nav aria-label="Page Menu" className="hide-medium-up">
				<span title="Admin Header" className="nav-item-header">
					<span>Information</span>
				</span>
				{sections.map((pageSection) => renderNavItem(pageSection))}
			</nav>
		);
	}

	return (
		<section id="sidebar">
			{renderGuestNav()}
			{renderContentNav()}
			{renderToolNav()}
			{toggleAdminNav()}
			{togglePagesNav()}
		</section>
	);
}

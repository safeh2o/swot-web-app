import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import UserDetailsModal from "../elements/UserDetailsModal";

export default function SideBar() {
	const context = useContext(AppContext);

	function renderNavItem(section, i) {
		return (
			<NavLink key={section[1]} title={section[1]} className="nav-item-side" to={`/${section[0]}`}>
				<span>
					{section[2]
						? <span className="num">{i + 1}.</span>
						: ``
					}
					{section[1]}
				</span>
			</NavLink>
		);
	}

	function renderGuestNav() {
		const { user } = context;
		if (!user) {
			return (
				<>
					<nav aria-label="Guest Options" className="guest-options">
						<h6>Hello Guest,</h6>
						<hr />
						<p>For you and/or your organisation to use the SWOT, please <Link to="/contact"><span>Contact Us</span></Link> in-order to setup an account, OR <Link to="/signin"><span>Log In</span></Link> to your existing account.</p>
					</nav>
				</>
			);
		}
	}

	function renderContentNav() {
		const { user } = context;
		// [ value, label, icon (location) ]
		if (user) {
			return (
				<>
					<nav aria-label="Page Menu">
						<Link to="/dashboard" className="nav-item-side dashboard">
							<span>
								<span className="label">Home</span>
							</span>
						</Link>
					</nav>
				</>
			);
		}
	}

	function renderToolNav() {
		const { user } = context;
		// [ value, label, icon (location) ]
		const sections = [
			["collect", "Collect Data", 1],
			["upload", "Upload Data", 2],
			["analyze", "Send for Analysis", 3],
			["results", "View Results", 4]
		];
		if (user) {
			return (
				<>
					<nav aria-label="Tool Menu">
						<span title="Tool" className="nav-item-header">
							<span>Tool Steps</span>
							<i><svg
								xmlns="http://www.w3.org/2000/svg"
								width="40px" height="40px"
								viewBox="0 0 40 40">
								<path className="swot-1" d="M20,0c4.5,2.7,6.4,8.2,6.4,8.2s-3.6,1.4-6.4,4.5c-2.3,0-4.4,1.2-5.7,2.9h0
								c-0.9,1.2-1.6,2.7-1.6,4.3h0c-3.1-2.8-4.5-6.4-4.5-6.4S2.7,15.5,0,20h0C0,9,9,0,20,0z"/>
								<path className="swot-2" d="M31.8,26.4c0,0-1.4-3.6-4.5-6.4c0,1.6-0.6,3.1-1.5,4.3c-1.3,1.8-3.4,3-5.8,3c-2.8,3.1-6.4,4.5-6.4,4.5
								s1.9,5.4,6.4,8.2c11,0,20-9,20-20C37.3,24.5,31.8,26.4,31.8,26.4z"/>
								<path className="swot-3" d="M27.3,20c0-2.3-1.2-4.4-2.9-5.7c-1.2-0.9-2.7-1.6-4.3-1.6c2.8-3.1,6.4-4.5,6.4-4.5S24.5,2.7,20,0
								c11,0,20,9,20,20v0c-2.7,4.5-8.2,6.4-8.2,6.4S30.4,22.8,27.3,20L27.3,20z"/>
								<path className="swot-4" d="M13.6,31.8c0,0,3.6-1.4,6.4-4.5c-1.6,0-3.1-0.6-4.3-1.6l0,0c-1.7-1.3-2.9-3.4-2.9-5.7h0
								c-3.1-2.8-4.5-6.4-4.5-6.4S2.7,15.5,0,20h0c0,0,0,0,0,0c0,0,0,0,0,0h0c0,11,9,20,20,20C15.5,37.3,13.6,31.8,13.6,31.8z"/>
							</svg></i>
						</span>
						{sections.map((toolSection, i) => renderNavItem(toolSection, i))}
					</nav>
				</>
			);
		}
	}

	function toggleAdminNav() {
		const { user } = context;
		// [ value, label, icon (location) ]
		const sections = [
			["fieldsites", "Field Sites", "assets/icons/location-marker.svg"],
			["people", "People", "assets/icons/people-figure.svg"],
		];
		if (user) {
			return (
				<>
					{user.isAdmin === true && (
						<nav aria-label="Admin Menu">
							<span title="Admin Header" className="nav-item-header">
								<span>Admin</span>
								<i><svg
									xmlns="http://www.w3.org/2000/svg"
									width="40px" height="40px"
									viewBox="0 0 40 40">
									<path fill="currentColor" d="M26.6,20c0,3.7-3,6.6-6.6,6.6s-6.6-3-6.6-6.6s3-6.6,6.6-6.6S26.6,16.3,26.6,20z M39.9,18.2c0-0.5-0.3-0.9-0.8-1.2l-3.8-2.3 l-0.8-1.8l0,0l1.1-4.4c0.2-0.5,0-0.9-0.3-1.4c-0.8-0.9-1.5-1.7-2.4-2.4c-0.3-0.3-0.9-0.5-1.4-0.3l-4.4,1.1c-0.3-0.2-1.5-0.8-1.8-0.8 l0,0L23,0.9c-0.3-0.5-0.6-0.8-1.2-0.8c-1.2-0.2-2.3-0.2-3.5,0c-0.5,0-0.9,0.3-1.2,0.8l-2.3,3.8L13,5.4l0,0L8.6,4.4 c-0.5-0.2-0.9,0-1.4,0.3C6.3,5.4,5.5,6.2,4.7,7.1C4.4,7.4,4.3,8,4.4,8.5l1.1,4.4l-0.8,1.8l0,0L0.9,17c-0.5,0.3-0.8,0.6-0.8,1.2 c-0.2,1.2-0.2,2.3,0,3.5c0,0.5,0.3,0.9,0.8,1.2l3.8,2.3l0.8,1.8l0,0l-1.1,4.4c-0.2,0.5,0,0.9,0.3,1.4c0.8,0.9,1.5,1.7,2.4,2.4 c0.3,0.3,0.9,0.5,1.4,0.3l4.4-1.1l1.8,0.8l0,0l2.3,3.8c0.3,0.5,0.6,0.8,1.2,0.8c1.2,0.2,2.3,0.2,3.5,0c0.5,0,0.9-0.3,1.2-0.8 l2.3-3.8l1.8-0.8l0,0l4.4,1.1c0.5,0.2,0.9,0,1.4-0.3c0.9-0.8,1.7-1.5,2.4-2.4c0.3-0.3,0.5-0.9,0.3-1.4l-1.1-4.4l0.8-1.8l0,0l3.8-2.3 c0.5-0.3,0.8-0.6,0.8-1.2C39.9,20.5,39.9,19.3,39.9,18.2z" />
								</svg></i>
							</span>
							{sections.map((adminSection) => renderNavItem(adminSection))}
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

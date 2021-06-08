import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userSelectors } from "../../reducers/user";

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
						<Link to="/" className="nav-item-side dashboard">
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
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40px"
									height="40px"
									viewBox="0 0 40 40"
								>
									<path
										fill="#B3E8CD"
										d="M20,5L20,5C11.7,5,5,11.7,5,20h0c2.1-3.4,6.1-4.8,6.1-4.8s1.1,2.7,3.4,4.8h0
									c0-1.2,0.5-2.3,1.2-3.3c1-1.3,2.5-2.2,4.3-2.2l0,0c2.1-2.3,4.8-4.1,4.8-4.1S23.4,7.1,20,5z"
									/>
									<path
										fill="#FFF4A4"
										d="M20,25.4c-1.2,0-2.3-0.5-3.3-1.2h0c-1.3-1-2.2-2.5-2.2-4.3l0,0v0c0,0,0,0,0,0h0
									c-2.3-2.1-3.4-4.8-3.4-4.8S7.1,16.6,5,20h0c0,0,0,0,0,0v0l0,0c0,8.3,6.7,15,15,15c-3.4-2.1-4.8-5.5-4.8-5.5S17.9,27.8,20,25.4z"
									/>
									<path
										fill="#FF99CC"
										d="M20,25.4L20,25.4c-2.1,2.3-4.8,4.1-4.8,4.1s1.4,3.4,4.8,5.5c8.3,0,15-6.7,15-15
									c-2.1,3.4-5.5,4.8-5.5,4.8s-1.7-2.7-4.1-4.8c0,1.2-0.5,2.3-1.1,3.2C23.3,24.5,21.8,25.4,20,25.4z"
									/>
									<path
										fill="#99D8FF"
										d="M35,20L35,20L35,20c0-8.3-6.7-15-15-15c3.4,2.1,4.8,5.5,4.8,5.5s-2.7,1.7-4.8,4.1
									c1.2,0,2.3,0.5,3.3,1.2c1.3,1,2.2,2.5,2.2,4.3l0,0l0,0l0,0l0,0c2.3,2.1,4.1,4.8,4.1,4.8S32.9,23.4,35,20L35,20L35,20z"
									/>
									<path
										fill="none"
										stroke="#3F4344"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										d="M15.7,16.7
									c1-1.3,2.5-2.2,4.3-2.2l0,0c2.1-2.3,4.8-4.1,4.8-4.1S23.4,7.1,20,5l0,0C12.8,5,6.8,10,5.4,16.7"
									/>
									<path
										fill="none"
										stroke="#3F4344"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										d="M16.7,24.3L16.7,24.3
									c-1.3-1-2.2-2.5-2.2-4.3c-2.3-2.1-3.4-4.8-3.4-4.8S7.1,16.6,5,20c0,7.2,5,13.1,11.7,14.6"
									/>
									<path
										fill="none"
										stroke="#3F4344"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										d="M24.3,23.2
									c-1,1.3-2.5,2.2-4.3,2.2c-2.1,2.3-4.8,4.1-4.8,4.1s1.4,3.4,4.8,5.5c7.2,0,13.2-5,14.7-11.8"
									/>
									<path
										fill="none"
										stroke="#3F4344"
										strokeWidth="1.5"
										strokeMiterlimit="10"
										d="M23.3,15.7
									c1.3,1,2.2,2.5,2.2,4.3l0,0l0,0l0,0l0,0c2.3,2.1,4.1,4.8,4.1,4.8s3.4-1.4,5.5-4.8l0,0l0,0l0,0l0,0c0-7.2-5-13.2-11.7-14.6"
									/>
								</svg>
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
								<span>Admin</span>
								<i>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="40px"
										height="40px"
										viewBox="0 0 40 40"
									>
										<path
											fill="#BDCCD4"
											d="M35.5,18.6c0-0.4-0.3-0.7-0.6-0.9l-3-1.8c-0.1-0.2-0.2-0.5-0.3-0.7
										c-0.1-0.2-0.2-0.5-0.3-0.7v0l0.9-3.4c0.1-0.4,0-0.8-0.2-1.1c-0.6-0.7-1.2-1.4-1.9-1.9c-0.3-0.2-0.7-0.3-1.1-0.2l-3.4,0.9
										c-0.2-0.1-0.5-0.2-0.7-0.3c-0.2-0.1-0.5-0.2-0.7-0.3v0l-1.8-3c-0.2-0.3-0.5-0.5-0.9-0.6c-0.9-0.1-1.8-0.1-2.7,0
										c-0.4,0-0.7,0.3-0.9,0.6l-1.8,3c-0.2,0.1-0.5,0.2-0.7,0.3c-0.2,0.1-0.5,0.2-0.7,0.3l0,0l-3.4-0.9c-0.4-0.1-0.8,0-1.1,0.2
										C9.3,8.7,8.7,9.3,8.1,10c-0.2,0.3-0.3,0.7-0.2,1.1l0.9,3.4c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.2-0.2,0.5-0.3,0.7v0l-3,1.8
										c-0.3,0.2-0.5,0.5-0.6,0.9c-0.1,0.9-0.1,1.8,0,2.7c0,0.4,0.3,0.7,0.6,0.9l3,1.8c0.1,0.2,0.2,0.5,0.3,0.7c0.1,0.2,0.2,0.5,0.3,0.7v0
										l-0.9,3.4c-0.1,0.4,0,0.8,0.2,1.1c0.6,0.7,1.2,1.4,1.9,1.9c0.3,0.2,0.7,0.3,1.1,0.2l3.4-0.9c0.2,0.1,0.5,0.2,0.7,0.3
										c0.2,0.1,0.5,0.2,0.7,0.3v0l1.8,3c0.2,0.3,0.5,0.5,0.9,0.6c0.9,0.1,1.8,0.1,2.7,0c0.4,0,0.7-0.3,0.9-0.6l1.8-3
										c0.2-0.1,0.5-0.2,0.7-0.3c0.2-0.1,0.5-0.2,0.7-0.3l0,0l3.4,0.9c0.4,0.1,0.8,0,1.1-0.2c0.7-0.6,1.4-1.2,1.9-1.9
										c0.2-0.3,0.3-0.7,0.2-1.1l-0.9-3.4c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.2-0.5,0.3-0.7v0l3-1.8c0.3-0.2,0.5-0.5,0.6-0.9
										C35.6,20.5,35.6,19.5,35.5,18.6z M20,25.4c-3,0-5.4-2.4-5.4-5.4s2.4-5.4,5.4-5.4c3,0,5.4,2.4,5.4,5.4S23,25.4,20,25.4z"
										/>
										<path
											fill="none"
											stroke="#3F4344"
											strokeWidth="1.5"
											strokeMiterlimit="10"
											d="M32.2,28.9l-0.9-3.4
										c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.2-0.5,0.3-0.7v0l3-1.8c0.3-0.2,0.5-0.5,0.6-0.9c0.1-0.9,0.1-1.8,0-2.7 M8.7,25.5L8.7,25.5
										l-0.9,3.4c-0.1,0.4,0,0.8,0.2,1.1c0.6,0.7,1.2,1.4,1.9,1.9c0.3,0.2,0.7,0.3,1.1,0.2l3.4-0.9c0.2,0.1,0.5,0.2,0.7,0.3
										c0.2,0.1,0.5,0.2,0.7,0.3v0l1.8,3c0.2,0.3,0.5,0.5,0.9,0.6c0.9,0.1,1.8,0.1,2.7,0c0.4,0,0.7-0.3,0.9-0.6l1.8-3
										c0.2-0.1,0.5-0.2,0.7-0.3c0.2-0.1,0.5-0.2,0.7-0.3l0,0l3.4,0.9 M8.1,24.1 M31.3,14.5L31.3,14.5l0.9-3.4c0.1-0.4,0-0.8-0.2-1.1
										c-0.6-0.7-1.2-1.4-1.9-1.9c-0.3-0.2-0.7-0.3-1.1-0.2l-3.4,0.9c-0.2-0.1-0.5-0.2-0.7-0.3c-0.2-0.1-0.5-0.2-0.7-0.3v0l-1.8-3
										c-0.2-0.3-0.5-0.5-0.9-0.6c-0.9-0.1-1.8-0.1-2.7,0c-0.4,0-0.7,0.3-0.9,0.6l-1.8,3c-0.2,0.1-0.5,0.2-0.7,0.3
										c-0.2,0.1-0.5,0.2-0.7,0.3l0,0l-3.4-0.9c-0.4-0.1-0.8,0-1.1,0.2C9.3,8.7,8.7,9.3,8.1,10c-0.2,0.3-0.3,0.7-0.2,1.1l0.9,3.4
										c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.2-0.2,0.5-0.3,0.7v0l-3,1.8c-0.3,0.2-0.5,0.5-0.6,0.9c-0.1,0.9-0.1,1.8,0,2.7 M20,25.4
										c-3,0-5.4-2.4-5.4-5.4s2.4-5.4,5.4-5.4c3,0,5.4,2.4,5.4,5.4S23,25.4,20,25.4z"
										/>
									</svg>
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

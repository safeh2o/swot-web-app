import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userSelectors } from "../../reducers/user";
import SidebarManageNav from "../icons/SidebarManageNav";
import SidebarToolNav from "../icons/SidebarToolNav";

export default function SideBar() {
	const user = useSelector(userSelectors.user);
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);

	function renderGuestNav() {
		return (
			<>
				<nav aria-label="Guest Options" className="guest-options">
					<h6>Hello Guest,</h6>
					<hr />
					<p>
						For you and/or your organisation to use the SWOT, please{" "}
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
				<nav aria-label="Page Menu" className="hide-medium-up">
					<span title="Admin Header" className="nav-item-header">
						<span>Information</span>
					</span>
					<a
						title="About"
						className="nav-item-side"
						href="https://safeh2o.app"
					>
						<span>
							<span>About</span>
						</span>
					</a>
					<NavLink title="News" className="nav-item-side" to="/blog">
						<span>
							<span>News</span>
						</span>
					</NavLink>
					<NavLink
						title="Contact"
						className="nav-item-side"
						to="/contact"
					>
						<span>
							<span>Contact</span>
						</span>
					</NavLink>
				</nav>
			</>
		);
	}

	const renderPrivateSidebar = () => {
		return (
			<>
				<nav aria-label="Page Menu">
					<NavLink
						title="Home"
						className="nav-item-side dashboard"
						to="/"
					>
						<span>
							<span className="label">Home</span>
						</span>
					</NavLink>
				</nav>
				<nav aria-label="Tool Menu">
					<span title="Tool" className="nav-item-header">
						<span>Tool Steps</span>
						<i>
							<SidebarToolNav />
						</i>
					</span>
					<NavLink
						title="Collect Data"
						className="nav-item-side"
						to="/collect"
					>
						<span>
							<span className="num">1.</span>
							<span>Collect Data</span>
						</span>
					</NavLink>
					<NavLink
						title="Upload Data"
						className="nav-item-side"
						to="/upload"
					>
						<span>
							<span className="num">2.</span>
							<span>Upload Data</span>
						</span>
					</NavLink>
					<NavLink
						title="Send for Analysis"
						className="nav-item-side"
						to="/analyze"
					>
						<span>
							<span className="num">3.</span>
							<span>Send for Analysis</span>
						</span>
					</NavLink>
					<NavLink
						title="View Results"
						className="nav-item-side"
						to="/results"
					>
						<span>
							<span className="num">4.</span>
							<span>View Results</span>
						</span>
					</NavLink>
				</nav>

				{user?.isAdmin && (
					<nav aria-label="Admin Menu">
						<span title="Admin Header" className="nav-item-header">
							<span>Manage</span>
							<i>
								<SidebarManageNav />
							</i>
						</span>
						<NavLink
							title="Field Sites"
							className="nav-item-side"
							to="/fieldsites"
						>
							<span>
								<span>Field Sites</span>
							</span>
						</NavLink>
						<NavLink
							title="People"
							className="nav-item-side"
							to="/people"
						>
							<span>
								<span>People</span>
							</span>
						</NavLink>
					</nav>
				)}
			</>
		);
	};

	return (
		<Box
			position="sticky"
			zIndex="10"
			top="0"
			alignSelf="flex-start"
			overflow="hidden"
			mb="10px"
			id="sidebar"
		>
			{(isLoggedIn && renderPrivateSidebar()) || renderGuestNav()}
		</Box>
	);
}

import {
	Box,
	Button,
	Drawer,
	IconButton,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { markAllRead, setLoading } from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";
import { Header as css } from "../../styles/styles";
import UserDetailsModal from "../elements/UserDetailsModal";
import UserNotificationsPopover from "../elements/UserNotificationsPopover";
import {
	IconAdmin,
	IconNavClose,
	IconNavOpen,
	IconProfile,
	IconSignOut,
	IconSelect,
	SWOTLogo,
	SWOTLogoCompact,
} from "../icons";
import NavContent from "./NavContent";
import NavTools from "./NavTools";

export default function Header() {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);
	const userLoadingStatus = useSelector(userSelectors.loadingStatus);

	const [waitingForSignout, setWaitingForSignout] = useState(false);

	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (waitingForSignout && isLoggedIn) {
			dispatch(setLoading(true));
		} else {
			setWaitingForSignout(false);
			dispatch(setLoading(false));
		}
	}, [waitingForSignout]);

	const handleSignout = () => {
		dispatch(markAllRead());
		setWaitingForSignout(true);
	};

	function headerSkeleton(text) {
		return text !== "space" ? (
			<Skeleton component="li" variant="rectangular" animation="wave">
				<Typography component="span">{text}</Typography>
			</Skeleton>
		) : (
			<Box component="li">
				<Typography component="span">&nbsp;&nbsp;&nbsp;</Typography>
			</Box>
		);
	}

	function headerSkeletonCircle() {
		const circle = {
			flex: "0 1 auto",
			width: "1.3em",
			height: "1.3em",
		};
		return (
			<Skeleton
				component="li"
				variant="circular"
				animation="wave"
				sx={{ ...circle }}
			/>
		);
	}

	function headerMenuItems() {
		return (
			<>
				{(userLoadingStatus === "success" && (
					<>
						{isLoggedIn && (
							<li className="sign-out">
								<Button
									href="/admin/signout"
									tabIndex={-1}
									onClick={handleSignout}
									className="signout"
								>
									<span>Sign Out</span>
									<i>
										<IconSignOut />
									</i>
								</Button>
							</li>
						)}
						<li className="dropdown" tabIndex="0">
							<span>
								<span>About</span>
								<i className="select">
									<IconSelect />
								</i>
							</span>
							<ul>
								<li>
									<a
										href="https://live.safeh2o.app/how-it-works.html"
										target="_blank"
										rel="noreferrer"
									>
										How it Works
									</a>
								</li>
								<li>
									<a
										href="https://live.safeh2o.app/research.html"
										target="_blank"
										rel="noreferrer"
									>
										Research
									</a>
								</li>
								<li>
									<a
										href="https://live.safeh2o.app/our-story.html"
										target="_blank"
										rel="noreferrer"
									>
										Our Story
									</a>
								</li>
								<li>
									<a
										href="https://live.safeh2o.app/team.html"
										target="_blank"
										rel="noreferrer"
									>
										Team
									</a>
								</li>
							</ul>
						</li>
						<li>
							<NavLink to="https://app.safeh2o.app/">
								<span>Get Started</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? "active" : undefined
								}
								to="/contact"
							>
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? "active" : undefined
								}
								to="/blog"
							>
								News
							</NavLink>
						</li>
					</>
				)) || (
					<>
						{headerSkeleton("Safe")}
						{headerSkeleton("Water")}
						{headerSkeleton("Optimization")}
						{headerSkeleton("space")}
						{headerSkeletonCircle()}
						{headerSkeletonCircle()}
					</>
				)}
			</>
		);
	}

	return (
		<>
			<nav role="navigation">
				<NavLink to={"/"} className="menu-brand">
					<SWOTLogo className="large" />
					<SWOTLogoCompact className="compact" />
				</NavLink>

				{/* open mobile nav */}
				<button
					onClick={() => setMobileNavOpen(true)}
					className="menu-open"
					aria-controls="menu"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					{(mobileNavOpen && <IconNavClose />) || <IconNavOpen />}
				</button>

				<div id="menu-actions">
					<ul className="menu-actions-ul">
						{isLoggedIn ? (
							<>
								<li>
									<UserDetailsModal />
								</li>
								<li>
									<UserNotificationsPopover />
								</li>
								{user.isAdmin && (
									<li>
										<IconButton href="/admin" tabIndex={-1}>
											<span>Field Admin</span>
											<i>
												<IconAdmin />
											</i>
										</IconButton>
									</li>
								)}
							</>
						) : (
							<>
								<li className="sign-in">
									<NavLink
										to="/signin"
										tabIndex={-1}
										className={({ isActive }) =>
											isActive
												? "active signin"
												: "signin"
										}
									>
										<span>Sign in</span>
										<i>
											<IconProfile />
										</i>
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>

				<div id="menu-main">
					<ul className="menu-mainmenu-open-ul">
						{headerMenuItems()}
					</ul>
				</div>

				<Drawer
					className="test"
					component={"div"}
					anchor="left"
					open={mobileNavOpen}
					onClose={() => setMobileNavOpen(false)}
				>
					<Box
						component={"ul"}
						className="menu-main-ul"
						role="presentation"
						onClick={() => setMobileNavOpen(false)}
						onKeyUp={() => setMobileNavOpen(false)}
					>
						{headerMenuItems()}
					</Box>
				</Drawer>
			</nav>
		</>
	);
}

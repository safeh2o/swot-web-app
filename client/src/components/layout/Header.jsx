import { Link } from "react-router-dom";
import UserDetailsModal from "../elements/UserDetailsModal";
import { userSelectors } from "../../reducers/user";
import { useDispatch, useSelector } from "react-redux";

import {
	IconButton,
	Badge,
	Skeleton,
	Stack,
	Box,
	Popover,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	Drawer,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import SideBar from "../layout/SideBar";
import SignOutIcon from "@mui/icons-material/Logout";
import { useEffect, useRef, useState } from "react";
import {
	markAllRead,
	notificationsSelectors,
	setLoading,
} from "../../reducers/notifications";
import _ from "lodash";

export default function Header(props) {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const user = useSelector(userSelectors.user);
	const userLoadingStatus = useSelector(userSelectors.loadingStatus);
	const [showNotifications, setShowNotifications] = useState(false);
	const notificationsRef = useRef(null);
	const notifications = useSelector(notificationsSelectors.notifications);
	const [unreadCount, setUnreadCount] = useState(0);
	const [waitingForSignout, setWaitingForSignout] = useState(false);
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setUnreadCount(
			_.sumBy(notifications, (message) => (message.read === true ? 0 : 1))
		);
	}, [notifications]);

	useEffect(() => {
		if (waitingForSignout && isLoggedIn) {
			dispatch(setLoading(true));
		} else {
			setWaitingForSignout(false);
			dispatch(setLoading(false));
		}
	}, [waitingForSignout]);

	const handleSignout = () => {
		setWaitingForSignout(true);
	};

	const popNotifications = () => {
		setShowNotifications(true);
	};

	const closeNotifications = () => {
		setShowNotifications(false);
		dispatch(markAllRead());
	};

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

					<Stack direction="row">
						<UserDetailsModal />
						{user.isAdmin === true && (
							<IconButton
								href="/admin"
								style={{ color: "inherit" }}
							>
								<SettingsIcon />
							</IconButton>
						)}
						<IconButton
							color="inherit"
							onClick={popNotifications}
							ref={notificationsRef}
						>
							<Badge color="secondary" badgeContent={unreadCount}>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							href="/admin/signout"
							style={{ color: "inherit" }}
							onClick={handleSignout}
						>
							<SignOutIcon />
						</IconButton>
					</Stack>
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

	// function toggleMobileNav() {
	// 	const body = document.querySelector("body");
	// 	if (body.classList.contains("nav-active")) {
	// 		body.classList.remove("nav-active");
	// 	} else {
	// 		body.classList.add("nav-active");
	// 	}
	// }

	function headerSkeleton(text) {
		return (
			<Skeleton
				variant="text"
				animation="wave"
				style={{ marginRight: 15 }}
			>
				<h2>{text}</h2>
			</Skeleton>
		);
	}

	function headerSkeletonCircle(radius) {
		return (
			<Skeleton
				variant="circular"
				width={`${radius}px`}
				height={`${radius}px`}
				animation="wave"
				style={{ marginRight: 5 }}
			/>
		);
	}

	function headerContent() {
		return (
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

				{renderRightButtons()}

				<Popover
					open={showNotifications}
					anchorEl={notificationsRef.current}
					onClose={closeNotifications}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
				>
					<List sx={{ overflow: "auto", maxHeight: "500px" }}>
						{notifications.map((message, i) => (
							<ListItem
								key={i}
								sx={{
									backgroundColor: message.read
										? "inherit"
										: "lightgray",
									maxWidth: "400px",
								}}
							>
								<ListItemIcon>
									{(message.type === "error" && (
										<ErrorOutlineIcon color={"error"} />
									)) || (
										<CheckCircleOutlineIcon
											color={"success"}
										/>
									)}
								</ListItemIcon>
								<Typography sx={{ p: 1 }}>
									{message.content}
								</Typography>
							</ListItem>
						))}
					</List>
				</Popover>

				<li className="nav-item nav-mobile">
					<button
						className="button"
						onClick={() => setMobileNavOpen(true)}
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
		);
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
				{userLoadingStatus === "success" ? (
					headerContent()
				) : (
					<div
						style={{
							display: "flex",
							width: "50%",
							height: "100%",
							alignItems: "center",
							justifyContent: "end",
						}}
					>
						{headerSkeleton("Started")}
						{headerSkeleton("About")}
						{headerSkeleton("News")}
						{headerSkeleton("Conta")}
						<span style={{ width: "40px" }}></span>
						{headerSkeletonCircle(34)}
						{headerSkeletonCircle(34)}
						{headerSkeletonCircle(34)}
						{headerSkeletonCircle(34)}
					</div>
				)}

				<Drawer
					anchor="left"
					open={mobileNavOpen}
					onClose={() => {
						setMobileNavOpen(false);
					}}
				>
					<Box
						sx={{
							width: 250,
						}}
						role="presentation"
						onClick={() => {
							setMobileNavOpen(false);
						}}
						onKeyDown={() => {
							setMobileNavOpen(false);
						}}
					>
						<SideBar />
					</Box>
				</Drawer>
			</nav>
		</header>
	);
}

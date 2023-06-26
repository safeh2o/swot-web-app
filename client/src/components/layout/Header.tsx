import { Box, Drawer, IconButton, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useHashParams from "../../hooks/useHashParams";
import { markAllRead, setLoading } from "../../reducers/notifications";
import { getUser, userSelectors } from "../../reducers/user";
import UserDetailsModal from "../elements/UserDetailsModal";
import UserNotificationsPopover from "../elements/UserNotificationsPopover";
import {
	IconAdmin,
	IconNavClose,
	IconNavOpen,
	IconProfile,
	IconSelect,
	IconSignOut,
	IconToolAnalyze,
	IconToolCollect,
	IconToolResult,
	IconToolUpload,
	SWOTLogo,
	SWOTLogoCompact,
} from "../icons";

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
	}, [waitingForSignout, dispatch, isLoggedIn]);

	const handleSignout = () => {
		dispatch(markAllRead());
		setWaitingForSignout(true);
		fetch("/api/signout").then(() => {
			dispatch(getUser());
		});
	};

	function headerSkeleton(text: string) {
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

	const [hashParams] = useHashParams();
	const locationSuffix = hashParams.get("country")
		? "#" + hashParams.toString()
		: "";

	function headerMenuItems() {
		return (
			<>
				{(userLoadingStatus === "success" && (
					<>
						<li className="dropdown" tabIndex={0}>
							<span>
								<span>About</span>
								<i className="select">
									<IconSelect />
								</i>
							</span>
							<div className="children">
								<ul>
									<li>
										<a
											href="https://safeh2o.app/how-it-works.html"
											target="_blank"
											rel="noreferrer"
										>
											How it Works
										</a>
									</li>
									<li>
										<a
											href="https://safeh2o.app/research.html"
											target="_blank"
											rel="noreferrer"
										>
											Research
										</a>
									</li>
									<li>
										<a
											href="https://safeh2o.app/our-story.html"
											target="_blank"
											rel="noreferrer"
										>
											Our Story
										</a>
									</li>
									<li>
										<a
											href="https://safeh2o.app/team.html"
											target="_blank"
											rel="noreferrer"
										>
											Team
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li className="dropdown">
							<NavLink to={"/"}>
								<span>Get Started</span>
							</NavLink>
							<div className="children mobile">
								<ul>
									{[
										{
											class: "",
											to: "/collect",
											label: "Collect Data",
											icon: <IconToolCollect />,
										},
										{
											class: "",
											to: `/upload${locationSuffix}`,
											label: "Upload Data",
											icon: <IconToolUpload />,
										},
										{
											class: "",
											to: `/analyze${locationSuffix}`,
											label: "Send for Analysis",
											icon: <IconToolAnalyze />,
										},
										{
											class: "",
											to: `/results${locationSuffix}`,
											label: "View Results",
											icon: <IconToolResult />,
										},
									].map((listitem, i) => (
										<li key={"" + i}>
											<NavLink
												className={listitem.class}
												to={listitem.to}
												key={listitem.label}
												end
											>
												{listitem.label}
												{listitem.icon && (
													<i>{listitem.icon}</i>
												)}
											</NavLink>
										</li>
									))}
								</ul>
							</div>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? "active" : undefined
								}
								to={"/contact"}
							>
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? "active" : undefined
								}
								to={"/blog?category=Announcements"}
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
											<span className="label">
												Field Admin
											</span>
											<i>
												<IconAdmin />
											</i>
										</IconButton>
									</li>
								)}
								<li className="sign-out">
									<IconButton
										tabIndex={-1}
										onClick={handleSignout}
										className="signout"
									>
										<span className="label">Sign Out</span>
										<i>
											<IconSignOut />
										</i>
									</IconButton>
								</li>
							</>
						) : (
							<>
								<li className="sign-in">
									<NavLink
										to="/signin"
										tabIndex={-1}
										className={({ isActive }) =>
											isActive ? "active" : undefined
										}
									>
										<span className="label">Sign in</span>
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
					<ul className="menu-main-ul">{headerMenuItems()}</ul>
				</div>

				<Drawer
					className="sidebar-drawer"
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

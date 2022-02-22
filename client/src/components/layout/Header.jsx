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
// import _ from 'lodash';
import { NavLink } from "react-router-dom";
import { markAllRead, setLoading } from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";
import UserDetailsModal from "../elements/UserDetailsModal";
import UserNotificationsPopover from "../elements/UserNotificationsPopover";
import {
	IconAdmin,
	IconNavClose,
	IconNavOpen,
	IconSignIn,
	IconSignOut,
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

	const css = {
		nav: {
			display: "flex",
			justifyContent: "space-between",
			color: "#fff",
			px: {
				xs: 4,
				md: 2,
			},
			mt: {
				xs: 2,
				md: 3,
			},
			mb: {
				xs: 1,
				md: 2,
			},
			"& .logo": {
				flexGrow: 0,
				alignSelf: "flex-end",
				display: "block",
				lineHeight: 0,
				color: "white",
				m: 0,
				p: 0,
				"& svg ": {
					fill: "currentColor",
					height: "auto",
				},
				"& svg.large": {
					display: { xs: "none", md: "block" },
					width: 211,
				},
				"& svg.compact": {
					display: { xs: "block", md: "none" },
					width: 154,
				},
			},
		},
		ul: {
			flexGrow: 0,
			display: "flex",
			flexWrap: { md: "wrap" },
			alignItems: "center",
			justifyContent: "end",
			listStyle: "none",
			p: 0,
			pl: 4,
			m: 0,
			//
			"& a, & button": {
				"&:hover": {
					color: "currentColor",
				},
			},
			//
			"& .nav-content": {
				display: { xs: "none", md: "flex" },
				"& a": {
					typography: "subtitle2",
					textTransform: "capitalize",
					margin: "3px 6px",
				},
				"& .signout": {
					textDecoration: "underline dotted",
				},
			},
			"& .nav-profile": {
				display: "flex",
				gridTemplateColumns: "1fr 1fr",
				order: { md: "-1" },
				flexBasis: { md: "100%" },
				flexWrap: { xs: "wrap", md: "nowrap" },
				justifyContent: "end",
				"& a, & button": {
					padding: { xs: "0px", md: "3px" },
					margin: { xs: "4px", md: "3px 4px" },
					borderRadius: "3px",
					svg: {
						width: { xs: "1em", md: ".9em" },
						height: { xs: "1em", md: ".9em" },
					},
				},
				"& .signin": {
					textTransform: "none",
					p: 0,
					m: "3px 6px",
					"&.active": {
						textDecoration: "underline solid 1px",
					},
				},
				"& .openDrawer": {
					svg: {
						width: "1.3em",
						height: "1.3em",
					},
				},
			},
		},
		list: {},
		setMobileNavOpen: {
			display: { md: "none" },
			padding: "6px",
			margin: "0px 1px",
		},
		drawerElement: {
			"& .MuiPaper-root": {
				width: 200,
				minHeight: "100%",
				backgroundColor: "#E3E4E6",
				p: "20px 20px 10px",
				maxWidth: "100%",
			},
			"& .signout, & .signin": {
				position: "relative",
				textAlign: "left",
				marginBottom: "16px",
				color: "#fff",
				backgroundColor: "primary.main",
				border: "1px solid #bbb",
				borderRadius: "3px",
				display: { xs: "block", sm: "inline" },
				p: { xs: "4px 8px", sm: 0 },
				mb: 2,
				"& svg": {
					position: "absolute",
					top: "50%",
					right: "8px",
					transform: "translateY(-50%)",
					width: ".9em",
					height: ".9em",
				},
			},
			"& .signout": {
				color: "#4c5054",
				backgroundColor: "#EAC1AE",
			},
			"& .signin": {
				color: "#4c5054",
				backgroundColor: "#C2D4D0",
			},
			"& .nav-profile": {
				justifyContent: "center",
				mb: 2,
			},
		},
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

	return (
		<>
			<Box component="nav" sx={{ ...css.nav }}>
				<Box to={"/"} component={NavLink} className="logo">
					<SWOTLogo className="large" />
					<SWOTLogoCompact className="compact" />
				</Box>

				{/* Large Screens */}
				<Box component="ul" sx={{ ...css.ul }}>
					{(userLoadingStatus === "success" && (
						<>
							{/* content based nav */}
							<Stack
								className="nav-content"
								direction="row"
								alignItems="center"
								component="li"
							>
								<NavContent />
								{/* User signout */}
								{isLoggedIn && (
									<Button
										href="/admin/signout"
										tabIndex={-1}
										onClick={handleSignout}
										className="signout"
									>
										Logout
									</Button>
								)}
							</Stack>

							{/* profile based nav */}
							<Stack
								className="nav-profile large"
								direction="row"
								alignItems="center"
								component="li"
							>
								{isLoggedIn ? (
									<>
										{/* User Settings */}
										<UserDetailsModal />

										{/* User Notifications */}
										<UserNotificationsPopover />

										{/* Administration */}
										{user.isAdmin && (
											<IconButton
												href="/admin"
												tabIndex={-1}
											>
												<IconAdmin />
											</IconButton>
										)}
									</>
								) : (
									<>
										{/* User signin */}
										<NavLink
											to="/signin"
											tabIndex={-1}
											className={({ isActive }) =>
												isActive
													? "active signin"
													: "signin"
											}
										>
											Log in
										</NavLink>
									</>
								)}

								{/* open mobile nav */}
								<IconButton
									component="a"
									onClick={() => setMobileNavOpen(true)}
									sx={{ ...css.setMobileNavOpen }}
									className={"openDrawer"}
								>
									{(mobileNavOpen && <IconNavClose />) || (
										<IconNavOpen />
									)}
								</IconButton>
							</Stack>
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
				</Box>

				{/* Compact Screens */}
				<Drawer
					anchor="left"
					open={mobileNavOpen}
					onClose={() => setMobileNavOpen(false)}
					sx={{ ...css.drawerElement }}
				>
					<Box
						role="presentation"
						onClick={() => setMobileNavOpen(false)}
						onKeyUp={() => setMobileNavOpen(false)}
					>
						{/* User signout */}
						{isLoggedIn ? (
							<>
								<Button
									href="/admin/signout"
									tabIndex={-1}
									onClick={handleSignout}
									className="signout"
								>
									Logout
									<IconSignOut />
								</Button>
								<NavTools />
							</>
						) : (
							<NavLink
								to="/signin"
								tabIndex={-1}
								className="signin"
							>
								Log in
								<IconSignIn />
							</NavLink>
						)}
						<NavContent />
					</Box>
				</Drawer>
			</Box>
		</>
	);
}

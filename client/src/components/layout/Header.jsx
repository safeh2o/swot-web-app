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
	IconProfile,
	IconSignIn,
	IconSignOut,
	SWOTLogo,
	SWOTLogoCompact,
} from "../icons";
import NavContent from "./NavContent";
import NavTools from "./NavTools";

import { Header as css } from "../../styles/styles";

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
											Log in <IconProfile />
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
						{isLoggedIn && (
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
						)}
						<NavContent className={isLoggedIn ? "user" : "guest"} />
					</Box>
				</Drawer>
			</Box>
		</>
	);
}

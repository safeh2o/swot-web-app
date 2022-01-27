import {
	SWOTLogo,
	IconSignIn,
	IconSignOut,
	IconAdmin,
	IconNavOpen,
	IconNavClose,
} from "../icons";

import {
	Box,
	Drawer,
	Button,
	IconButton,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
// import _ from 'lodash';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setLoading } from "../../reducers/notifications";

import { userSelectors } from "../../reducers/user";
import UserDetailsModal from "../elements/UserDetailsModal";
import UserNotificationsPopover from "../elements/UserNotificationsPopover";
import NavTools from "./NavTools";
import NavContent from "./NavContent";

export default function Header(props) {
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
		console.log("");
	};

	const css = {
		nav: {
			display: "flex",
			justifyContent: "space-between",
			color: "#fff",
			px: 2,
			mt: {
				xs: 1,
				md: 3,
			},
			mb: {
				xs: 1,
				md: 2,
			},
		},
		logo: {
			flexGrow: 0,
			alignSelf: "flex-end",
			display: "block",
			lineHeight: 0,
			color: "white",
			m: 0,
			p: 0,
			"& svg ": {
				fill: "currentColor",
				width: {
					xs: 191,
					md: 231,
				},
				height: "auto",
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
			"& .nav-content": {
				display: { xs: "none", md: "flex" },
				marginTop: { md: 1 },
				"& a, & button": {
					typography: "subtitle2",
					textTransform: "capitalize",
					padding: "3px 5px",
					margin: "3px",
					backgroundColor: "rgba(0,0,0,0.05)",
				},
			},
			"& .nav-profile": {
				order: { md: "-1" },
				flexBasis: { md: "100%" },
				flexWrap: { xs: "wrap", md: "nowrap" },
				justifyContent: "end",
				"& a, & button": {
					color: "primary.main",
					backgroundColor: "white",
					padding: "3px",
					margin: "3px 4px",
					borderRadius: "3px",
				},
			},
		},
		list: {},
		action: {
			textTransform: "none",
			backgroundColor: "#4c7fd8",
			paddingLeft: "10px!important",
			"& svg": {
				marginLeft: "10px",
			},
		},
		setMobileNavOpen: {
			display: { md: "none" },
			padding: "6px",
			margin: "0px 1px",
		},
		drawerElement: {
			"": {},
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
				<Box to={"/"} component={NavLink} sx={{ ...css.logo }}>
					<SWOTLogo />
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
							</Stack>

							{/* profile based nav */}
							<Stack
								className="nav-profile"
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
										<IconButton href="/admin" tabIndex={-1}>
											<IconAdmin />
										</IconButton>

										{/* User signout */}
										<IconButton
											href="/admin/signout"
											tabIndex={-1}
											onClick={handleSignout}
										>
											<IconSignOut />
										</IconButton>
									</>
								) : (
									<>
										{/* User signin */}
										<Button
											to="/signin"
											component={NavLink}
											tabIndex={-1}
											sx={{ ...css.action }}
										>
											Log in
											<IconSignIn />
										</Button>
									</>
								)}
							</Stack>

							{/* open mobile nav */}
							<IconButton
								component="li"
								onClick={() => setMobileNavOpen(true)}
								sx={{ ...css.setMobileNavOpen }}
							>
								{(mobileNavOpen && <IconNavClose />) || (
									<IconNavOpen />
								)}
							</IconButton>
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
				>
					<Box
						sx={{
							width: 250,
						}}
						role="presentation"
						onClick={() => setMobileNavOpen(false)}
						onKeyUp={() => setMobileNavOpen(false)}
					>
						<NavTools />
						<NavContent />
					</Box>
				</Drawer>
			</Box>
		</>
	);
}

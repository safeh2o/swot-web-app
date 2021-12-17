import { Popover, List, ListItem, ListItemIcon } from "@mui/material";
import { Typography, IconButton, Badge } from "@mui/material";

import { IconBell, IconImportant } from "../icons";

import { useState, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';

import {
	markAllRead,
	notificationsSelectors,
} from "../../reducers/notifications";

export default function UserNotificationsPopover() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [showNotifications, setShowNotifications] = useState(false);
	const notificationsRef = useRef(null);
	const notifications = useSelector(notificationsSelectors.notifications);
	const [unreadCount, setUnreadCount] = useState(0);
	const [unreadCount] = [3];

	const dispatch = useDispatch();

	useEffect(() => {
		setUnreadCount(
			_.sumBy(notifications, (message) => (message.read === true ? 0 : 1))
		);
	}, [notifications]);

	const open = Boolean(anchorEl);
	const id = open ? "user-notifications" : undefined;

	function toggleNotifications(bool) {
		if (bool) {
			setAnchorEl(notificationsRef.current);
			setShowNotifications(true);
		} else {
			setAnchorEl(null);
			setShowNotifications(false);
			dispatch(markAllRead());
		}
	}

	// styles
	const css = {
		badge: {
			"& .MuiBadge-badge": {
				fontSize: "0.75rem",
				transform: "translate(25%, -60%)",
				filter: "drop-shadow(0px 3px 2px rgba(0,0,0,0.3))",
			},
		},
		list: {
			overflow: "auto",
			maxHeight: "500px",
			maxWidth: "400px",
			p: 0,
		},
	};

	return (
		<>
			<IconButton
				aria-describedby={id}
				variant="contained"
				onClick={() => toggleNotifications(true)}
				ref={notificationsRef}
			>
				<Badge
					badgeContent={unreadCount}
					color="warning"
					sx={{ ...css.badge }}
				>
					<IconBell />
				</Badge>
			</IconButton>

			<Popover
				id={id}
				open={showNotifications}
				anchorEl={anchorEl}
				onClose={() => toggleNotifications(false)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<List sx={{ ...css.list }}>
					{(notifications?.length &&
						notifications?.map((message, i) => (
							<ListItem
								key={i}
								sx={{
									backgroundColor: message.read
										? "inherit"
										: "#eee",
								}}
							>
								<ListItemIcon
									sx={{
										color:
											(message.type === "error" &&
												"#fc9170") ||
											"#34d379",
									}}
								>
									<IconImportant />
								</ListItemIcon>
								<Typography variant="body2" px={1}>
									{message.content}
								</Typography>
							</ListItem>
						))) || (
						<Typography variant="body2" px={1}>
							You have no notifications at this time
						</Typography>
					)}
				</List>
			</Popover>
		</>
	);
}

import {
	Badge,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	Popover,
	Typography,
} from "@mui/material";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	markAllRead,
	notificationsSelectors,
} from "../../reducers/notifications";
import { UserNotificationsPopover as css } from "../../styles/styles";
import { IconBell, IconImportant } from "../icons";

export default function UserNotificationsPopover() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [showNotifications, setShowNotifications] = useState(false);
	const notificationsRef = useRef(null);
	const notifications = useSelector(notificationsSelectors.notifications);
	const [unreadCount, setUnreadCount] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {
		setUnreadCount(
			_.sumBy(notifications, (message) => (message.read === true ? 0 : 1))
		);
	}, [notifications]);

	const open = Boolean(anchorEl);
	const id = open ? "user-notifications" : undefined;

	function setNotifications(show: boolean) {
		if (show) {
			setAnchorEl(notificationsRef.current);
			setShowNotifications(true);
		} else {
			setAnchorEl(null);
			setShowNotifications(false);
			dispatch(markAllRead());
		}
	}

	return (
		<>
			<IconButton
				aria-describedby={id}
				onClick={() => setNotifications(true)}
				ref={notificationsRef}
			>
				<span className="label">Notifications</span>
				<Badge
					className="badge"
					badgeContent={unreadCount}
					component={"i"}
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
				onClose={() => setNotifications(false)}
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
						<Typography variant="body2" p={1}>
							You have no notifications at this time
						</Typography>
					)}
				</List>
			</Popover>
		</>
	);
}

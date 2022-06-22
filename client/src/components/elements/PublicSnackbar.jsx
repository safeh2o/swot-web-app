import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearNotifications,
	notificationsSelectors,
	shiftNotification,
} from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";

export default function PublicSnackbar() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const [alertOpen, setAlertOpen] = useState(false);
	const [notificationSeverity, setNotificationSeverity] = useState("success");
	const [notificationContent, setNotificationContent] = useState("");
	const notifications = useSelector(
		notificationsSelectors.unreadNotifications
	);

	const handleAlertClose = (_, reason) => {
		if (!isLoggedIn) {
			dispatch(clearNotifications());
		} else if (!reason) {
			dispatch(shiftNotification());
		}
		setAlertOpen(false);
	};

	useEffect(() => {
		if (notifications.length) {
			const notification = notifications[0];
			const severity =
				notification?.type === "notice" ? "success" : "error";
			setNotificationContent(notification.content);
			setNotificationSeverity(severity);

			// checks if the last notification happened within the last 5 seconds; if so, show it
			const FIVE_SECONDS = 5000;
			const isNotificationRecent =
				new Date() - new Date(notification.timestamp) < FIVE_SECONDS;
			setAlertOpen(isNotificationRecent);
		}
	}, [notifications]);

	return (
		<Snackbar
			open={alertOpen}
			autoHideDuration={3000}
			onClose={handleAlertClose}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			className="tool-alerts"
		>
			<Alert
				onClose={handleAlertClose}
				severity={notificationSeverity}
				elevation={6}
				variant="filled"
			>
				{notificationContent}
			</Alert>
		</Snackbar>
	);
}

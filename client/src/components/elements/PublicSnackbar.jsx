import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	notificationsSelectors,
	shiftNotification,
} from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";

export default function PublicSnackbar(props) {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const [alertOpen, setAlertOpen] = useState(false);
	const [notificationSeverity, setNotificationSeverity] = useState("success");
	const [notificationContent, setNotificationContent] = useState("");
	const notifications = useSelector(
		notificationsSelectors.unreadNotifications
	);

	const handleAlertClose = () => {
		setAlertOpen(false);
		dispatch(shiftNotification());
	};

	useEffect(() => {
		if (notifications.length && isLoggedIn === false) {
			const notification = notifications[0];
			const severity =
				notification?.type === "notice" ? "success" : "error";
			setNotificationContent(notification.content);
			setNotificationSeverity(severity);
			setAlertOpen(true);
		}
	}, [notifications]);

	return (
		<Snackbar
			open={alertOpen}
			autoHideDuration={3000}
			onClose={handleAlertClose}
		>
			<Alert
				onClose={handleAlertClose}
				severity={notificationSeverity}
				sx={{ width: "100%" }}
				elevation={6}
				variant="filled"
			>
				{notificationContent}
			</Alert>
		</Snackbar>
	);
}

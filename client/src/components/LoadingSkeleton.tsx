import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../reducers/notifications";

export default function LoadingSkeleton({
	children,
	isLoading,
}: {
	children: React.ReactNode;
	isLoading?: boolean;
}) {
	const isAppLoading = useSelector(notificationsSelectors.loading);
	isLoading ??= isAppLoading;

	return isLoading ? <Skeleton variant="rectangular" animation="wave" /> : children;
}

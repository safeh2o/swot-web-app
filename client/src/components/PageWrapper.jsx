import Header from "./layout/Header";
import SideBar from "./layout/SideBar";
import Footer from "./layout/Footer";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../reducers/notifications";
import AppBreadcrumbs from "./elements/AppBreadcrumbs";
import { Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default function PageWrapper(props) {
	const classes = useStyles();

	const isLoading = useSelector(notificationsSelectors.loading);

	return (
		<>
			<Header />
			<Backdrop open={isLoading} className={classes.backdrop}>
				<CircularProgress />
			</Backdrop>
			<main>
				<AppBreadcrumbs />
				<SideBar />
				<section id="content">{props.children}</section>
			</main>
			<Footer />
		</>
	);
}

import {
	Button,
	Container,
	IconButton,
	makeStyles,
	Toolbar,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import {
	notificationsSelectors,
	clearNotifications,
} from "../../reducers/notifications";

const useStyles = makeStyles((theme) => ({
	toolbar: {
		"flex-direction": "row-reverse",
	},
}));

export default function FlashMessages() {
	const classes = useStyles();
	const { notices, errors, errorHeaderText } = useSelector(
		notificationsSelectors.notifications
	);

	const dispatch = useDispatch();

	const handleDismiss = () => {
		dispatch(clearNotifications());
	};

	function renderNotices() {
		if (!Object.keys(notices).length) {
			return null;
		}

		const noticeKeys = Object.keys(notices);

		return (
			<div className="container">
				<div className="alert alert-success">
					<ul>
						{noticeKeys.map((key) => (
							<li key={key}>{notices[key]}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	function renderErrors() {
		if (!errors.length) {
			return null;
		}

		return (
			<div className="container">
				<div className="alert alert-danger">
					<h5>{errorHeaderText}</h5>

					<ul>
						{errors.map((err) => (
							<li key={err}>{err}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	if (!errors.length && !Object.keys(notices).length) return null;
	else
		return (
			<>
				<Container>
					<Toolbar className={classes.toolbar}>
						<IconButton aria-label="close" onClick={handleDismiss}>
							<CloseIcon />
						</IconButton>
					</Toolbar>
					{renderNotices()}
					{renderErrors()}
				</Container>
			</>
		);
}

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import AppContext from "../contexts/AppContext";
import NoteLine from "./elements/NoteLine";
import useForm from "../hooks/useForm";
import {
	Button,
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
	addError,
	addNotice,
	handleServerMessages,
	setLoading,
} from "../reducers/notifications";
import { pushView } from "../reducers/view";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	form: {
		flexDirection: "column",
		display: "flex",
		width: "50%",
	},
}));

export default function ContactPage(props) {
	const { grecaptchaSiteKey } = useContext(AppContext);
	const [contactReasons, setContactReasons] = useState([]);
	const [disabled, setDisabled] = useState(true);
	const classes = useStyles();
	const { state, reset, getTextChangeHandler } = useForm({
		name: "",
		email: "",
		phone: "",
		reason: "",
		message: "",
		captcha: null,
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "Contact", path: "/contact" }));
		axios("/api/contactreasons").then(({ data }) => {
			setContactReasons(data);
		});
	}, []);

	useEffect(() => {
		const { name, email, reason, message } = state;
		setDisabled(!name || !email || !reason || !message);
	}, [state]);

	function handleSubmit() {
		dispatch(setLoading(true));
		grecaptcha.ready(function () {
			grecaptcha
				.execute(grecaptchaSiteKey, { action: "submit" })
				.then(function (token) {
					axios
						.post("/api/contact", {
							...state,
							"g-recaptcha-response": token,
						})
						.then(({ data }) => {
							dispatch(handleServerMessages(data.messages));
						})
						.finally(() => {
							dispatch(setLoading(false));
						});
				});
		});
	}

	return (
		<>
			<form>
				<section className="content-window">
					<section>
						<Typography variant="h3">Contact Us</Typography>
						<div className={classes.form}>
							<FormControl className={classes.formControl}>
								<TextField
									required
									label="Name"
									value={state.name}
									id="name"
									onChange={getTextChangeHandler("name")}
								/>
								<FormHelperText>
									So we can address you
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.formControl}>
								<TextField
									id="email"
									type="email"
									label="Email"
									value={state.email}
									required
									onChange={getTextChangeHandler("email")}
								/>
								<FormHelperText>
									We promise not to spam you
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.formControl}>
								<TextField
									id="phone"
									type="phone"
									label="Phone"
									value={state.phone}
									onChange={getTextChangeHandler("phone")}
								/>
								<FormHelperText>
									Please include your country code
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.formControl}>
								<Select
									value={state.reason}
									onChange={getTextChangeHandler("reason")}
									displayEmpty
									required
								>
									<MenuItem value="" disabled>
										(select reason)
									</MenuItem>
									{contactReasons.map((reason) => (
										<MenuItem
											key={reason.value}
											value={reason.value}
										>
											{reason.label}
										</MenuItem>
									))}
								</Select>
								<FormHelperText>
									How can we help you?
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.formControl}>
								<TextField
									label="Message"
									multiline
									value={state.message}
									id="message"
									required
									onChange={getTextChangeHandler("message")}
								/>
								<FormHelperText>
									Please tell us more about why you are
									contacting us
								</FormHelperText>
							</FormControl>
						</div>
						<div className={"submission-wrap " + classes.root}>
							<Button
								variant="contained"
								color="primary"
								disabled={disabled}
								onClick={handleSubmit}
							>
								Submit
							</Button>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => {
									reset();
								}}
							>
								Reset
							</Button>
						</div>

						<NoteLine>
							By clicking Submit, you agree to our{" "}
							<Link to="pages/terms-of-use">Terms of Use</Link>
							&nbsp; and our{" "}
							<Link to="pages/privacy-policy">
								Privacy Policy
							</Link>
						</NoteLine>
						<small>
							This site is also protected by reCAPTCHA and the
							Google{" "}
							<a href="https://policies.google.com/privacy">
								Privacy Policy
							</a>{" "}
							and{" "}
							<a href="https://policies.google.com/terms">
								Terms of Service
							</a>{" "}
							apply.
						</small>
					</section>
				</section>
			</form>
		</>
	);
}

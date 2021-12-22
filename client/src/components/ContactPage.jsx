import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import {
	Grid,
	Box,
	Card,
	CardHeader,
	Divider,
	CardContent,
} from "@mui/material";

// import _ from 'lodash';
import axios from "axios";

import AppContext from "../contexts/AppContext";
import useForm from "../hooks/useForm";
import {
	// addError,
	// addNotice,
	handleServerMessages,
	setLoading,
} from "../reducers/notifications";
import { pushView } from "../reducers/view";

import NotificationLine from "./elements/NotificationLine";

export default function ContactPage(props) {
	const { grecaptchaSiteKey } = useContext(AppContext);
	const [contactReasons, setContactReasons] = useState([]);
	const [disabled, setDisabled] = useState(true);
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

	// Styles
	const css = {
		form: {
			'& [type="text"], & [type="email"], & [type="phone"], & [type="text"], & .MuiTextField-root':
				{
					backgroundColor: "#f9f9f9",
				},
			"& button": { textTransform: "capitalize" },
			"& #btnSubmit": {
				color: "white",
				mb: 1,
			},
		},
	};

	return (
		<>
			<Card elevation={1}>
				<CardHeader
					title={"Get in Touch"}
					titleTypographyProps={{ variant: "h2", fontWeight: "400" }}
				/>

				<Divider />

				<CardContent>
					<Box component="form" sx={{ ...css.form }}>
						<Grid container direction="row" spacing={2}>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<TextField
										required
										label="Name"
										id="name"
										value={state.name}
										onChange={getTextChangeHandler("name")}
									/>
									<FormHelperText>
										So we can address you
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<TextField
										id="email"
										type="email"
										label="Email"
										required
										value={state.email}
										onChange={getTextChangeHandler("email")}
									/>
									<FormHelperText>
										We respect your privacy
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<TextField
										id="phone"
										type="phone"
										label="Phone"
										value={state.phone}
										onChange={getTextChangeHandler("phone")}
									/>
									<FormHelperText>
										(Optional) Please include your country
										code
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={7} sx={{ mt: 4 }}>
								<FormControl fullWidth>
									<InputLabel id="SelectReasonLabel">
										Type of Inquiry
									</InputLabel>
									<Select
										required
										displayEmpty
										labelId="SelectReasonLabel"
										label="Type of Inquiry"
										value={state.reason}
										onChange={getTextChangeHandler(
											"reason"
										)}
									>
										{(contactReasons &&
											contactReasons.map((reason) => (
												<MenuItem
													key={reason.value}
													value={reason.value}
												>
													{reason.label}
												</MenuItem>
											))) || (
											<>
												<MenuItem value={1}>
													General
												</MenuItem>
												<MenuItem value={2}>
													Request a demo
												</MenuItem>
												<MenuItem value={3}>
													Register an Account
												</MenuItem>
												<MenuItem value={4}>
													Get Support
												</MenuItem>
												<MenuItem value={5}>
													Report a Problem
												</MenuItem>
											</>
										)}
									</Select>
									<FormHelperText>
										How can we help you?
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={9}>
								<FormControl fullWidth>
									<TextField
										required
										multiline
										id="message"
										label="Message"
										rows={4}
										value={state.message}
										onChange={getTextChangeHandler(
											"message"
										)}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Divider sx={{ my: 3 }} />
							</Grid>
							<Grid item xs={6}>
								<Button
									fullWidth
									id="btnSubmit"
									variant="contained"
									disabled={disabled}
									onClick={handleSubmit}
								>
									Submit
								</Button>
							</Grid>
							<Grid item xs={"auto"}>
								<Button
									fullWidth
									variant="text"
									type="reset"
									onClick={() => {
										reset();
									}}
								>
									Reset Fields
								</Button>
							</Grid>
							<Grid item xs={12}>
								<NotificationLine type="notice">
									<p>
										By clicking Submit, you agree to our{" "}
										<Link to="pages/terms-of-use">
											Terms of Use
										</Link>
										&nbsp; and our{" "}
										<Link to="pages/privacy-policy">
											Privacy Policy
										</Link>
									</p>
								</NotificationLine>
								<NotificationLine type="footnote">
									<p>
										This site is also protected by{" "}
										<a href="https://www.google.com/recaptcha/">
											reCAPTCHA
										</a>{" "}
										and the Google{" "}
										<a href="https://policies.google.com/privacy">
											Privacy Policy
										</a>{" "}
										and{" "}
										<a href="https://policies.google.com/terms">
											Terms of Service
										</a>{" "}
										apply.
									</p>
								</NotificationLine>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}

import {
	Box, Button, Card, CardContent, CardHeader,
	Divider, FormControl,
	FormHelperText, Grid, InputLabel,
	MenuItem,
	Select,
	TextField
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { handleServerMessages, setLoading } from "../reducers/notifications";
import { pushView } from "../reducers/view";
import NotificationLine from "./elements/NotificationLine";






export default function ContactPage(props) {
	const [contactReasons, setContactReasons] = useState([]);
	const [disabled, setDisabled] = useState(true);
	const { state, reset, getTextChangeHandler } = useForm({
		name: "",
		email: "",
		phone: "",
		reason: "",
		message: "",
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
		axios
			.post("/api/contact", state)
			.then(({ data }) => {
				dispatch(handleServerMessages(data.messages));
			})
			.finally(() => {
				dispatch(setLoading(false));
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
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}

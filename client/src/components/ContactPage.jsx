import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { handleServerMessages, setLoading } from "../reducers/notifications";
import { pushView } from "../reducers/view";
import NotificationLine from "./elements/NotificationLine";

export default function ContactPage() {
	const [contactReasons, setContactReasons] = useState([]);
	const [disabled, setDisabled] = useState(true);
	const { state, reset, getTextChangeHandler } = useForm({
		name: "",
		email: "",
		phone: "",
		reason: "",
		message: "",
		organisation: "",
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "Contact", path: "/contact" }));
		axios("/api/contactreasons").then(({ data }) => {
			setContactReasons(data);
		});
	}, []);

	useEffect(() => {
		const { name, email, reason, organisation } = state;
		setDisabled(!name || !email || !reason, !organisation);
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
			<Typography
				component={"h1"}
				variant="body1"
				sx={{
					mb: 2,
					fontSize: "1.55rem",
					fontWeight: "400",
					fontFamily: '"Roboto Condensed", sans-serif',
					lineHeight: "1.2",
					letterSpacing: "-0.02em",
					color: "#747e87",
					margin: "5px 0 10px 8px",
				}}
			>
				Get In Touch
			</Typography>
			<Card elevation={1}>
				<CardContent>
					<Box component="form" sx={{ ...css.form }}>
						<Grid container direction="row" spacing={2}>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<TextField
										required
										label="Full Name"
										id="name"
										value={state.name}
										onChange={getTextChangeHandler("name")}
									/>
									<FormHelperText>
										Please add your first and last name here
										(required)
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
										Please add email to associate with your
										account if registering (required)
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<TextField
										id="organisation"
										type="text"
										label="Organisation"
										required
										value={state.organisation}
										onChange={getTextChangeHandler(
											"organisation"
										)}
									/>
									<FormHelperText>
										Which organisation do you work with?
										(required)
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth>
									<TextField
										id="phone"
										type="phone"
										label="Phone Number"
										value={state.phone}
										onChange={getTextChangeHandler("phone")}
									/>
									<FormHelperText>
										Please include you country and area code
										(Optional)
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={7} sx={{ mt: 4 }}>
								<FormControl fullWidth>
									<InputLabel id="SelectReasonLabel">
										Reason for contacting us today*
									</InputLabel>
									<Select
										required
										displayEmpty
										labelId="SelectReasonLabel"
										label="Reason for contacting us today*"
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
										Please select reason from the dropdown
										menu (required)
									</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={9}>
								<FormControl fullWidth>
									<TextField
										multiline
										id="message"
										label="Leave us a short message (optional)"
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
										<Link to="/pages/terms-of-use">
											Terms of Use
										</Link>
										&nbsp; and our{" "}
										<Link to="/pages/privacy-policy">
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

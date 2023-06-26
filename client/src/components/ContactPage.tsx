import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { handleServerMessages, setLoading } from "../reducers/notifications";
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
		axios("/api/contactreasons").then(({ data }) => {
			setContactReasons(data);
		});
	}, []);

	useEffect(() => {
		const { name, email, reason, organisation } = state;
		setDisabled(!name || !email || !reason || !organisation);
	}, [state]);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
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

	return (
		<>
			<section>
				<div className="section-wrap compact">
					<h1 className="section-subtitle">Get in Touch</h1>

					<Box component="form">
						<Box className="app-card">
							<Box className="form-content">
								<FormControl className="col-2">
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

								<FormControl className="col-2">
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

								<FormControl>
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
							</Box>

							<hr />

							<Box className="form-content">
								<FormControl>
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
							</Box>

							<hr />

							<Box className="form-content">
								<FormControl>
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
											contactReasons.map(
												(reason: any) => (
													<MenuItem
														key={reason.value}
														value={reason.value}
													>
														{reason.label}
													</MenuItem>
												)
											)) || (
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

								<FormControl>
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
							</Box>
						</Box>

						<Box
							component="hr"
							sx={{
								my: 2,
							}}
						></Box>

						<Box className="app-card">
							<Box className="form-submit">
								<Button
									id="btnSubmit"
									className="btn"
									type="submit"
									disabled={disabled}
									onClick={handleSubmit}
									disableRipple={true}
								>
									Submit
								</Button>
								<Button
									className="btn reset"
									variant="text"
									type="reset"
									onClick={() => {
										reset();
									}}
								>
									Reset Fields
								</Button>
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
							</Box>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

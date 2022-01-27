import { useState } from "react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import {
	Grid,
	Box,
	Card,
	CardHeader,
	Divider,
	CardContent,
} from "@mui/material";

import { Button, FormControl, TextField } from "@mui/material";

import NotificationLine from "../elements/NotificationLine";

export default function ProfileForgotPassword() {
	const form = useRef(null);
	const [messages, setMessages] = useState({});

	const handleSubmitResponse = (data) => {
		setMessages(data.messages);
	};

	const handleChange = () => {
		// setMessages({});
	};

	useEffect(() => {
		$(form.current).ajaxForm((data) => {
			handleSubmitResponse(data);
		});
		return () => {
			$(form.current).off();
		};
	}, []);

	// Styles
	const css = {
		cardElement: {},
		form: {
			"& button": { textTransform: "capitalize" },
			"& #btnReset": {
				color: "white",
				mb: 1,
			},
		},
	};

	return (
		<>
			<Card elevation={1}>
				<CardHeader title={"Forgot Password"} />

				<Divider />

				<CardContent>
					<Box
						ref={form}
						role="form"
						action="/forgotpassword"
						method="post"
						component="form"
						sx={{ ...css.form }}
					>
						<Grid container direction="row" spacing={2}>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<TextField
										margin="dense"
										id="email"
										label="Email Address"
										type="email"
										variant="outlined"
										onChange={handleChange()}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<NotificationLine
									type="notice"
									sx={{
										paddingTop: "0px",
										paddingBottom: "0px",
									}}
								>
									Enter the email you're to recieve
									instructions to reset your password.
								</NotificationLine>
							</Grid>
							<Grid item xs={12}>
								<Button
									id="btnReset"
									variant="contained"
									fullWidth
								>
									Reset
								</Button>
								or,&nbsp;<Link to="/signin">Sign in</Link>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}

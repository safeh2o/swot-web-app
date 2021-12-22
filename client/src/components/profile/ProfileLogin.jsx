import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Divider, CardContent } from "@mui/material";

import {
	Grid,
	Box,
	Button,
	FormControl,
	TextField,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import useForm from "../../hooks/useForm";
import {
	addError,
	handleServerMessages,
	setLoading,
} from "../../reducers/notifications";
import { getUser } from "../../reducers/user";

export default function ProfileLogin() {
	const { state, getTextChangeHandler } = useForm({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmitResponse = () => {
		dispatch(setLoading(true));
		fetch("/api/auth", {
			method: "POST",
			body: JSON.stringify(state),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success === true) {
					navigate("/");
					dispatch(getUser());
				} else {
					dispatch(handleServerMessages(data.messages));
				}
			})
			.catch((err) => {
				dispatch(addError(err));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};

	// Password input field
	const [values, setValues] = useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	// Styles
	const css = {
		cardElement: {},
		form: {
			"& button": { textTransform: "capitalize" },
			"& #btnLogIn": {
				color: "white",
				mb: 1,
			},
		},
	};

	return (
		<>
			<Card elevation={1}>
				<CardHeader title={"Log in"} />

				<Divider />

				<CardContent>
					<Box component="div" sx={{ ...css.form }}>
						<Grid container direction="row" spacing={2}>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<TextField
										margin="dense"
										id="email"
										label="Email Address"
										type="email"
										variant="outlined"
										value={state.email}
										onChange={getTextChangeHandler("email")}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel htmlFor="password">
										Password
									</InputLabel>
									<OutlinedInput
										id="password"
										name="password"
										type={
											values.showPassword
												? "text"
												: "password"
										}
										minLength="6"
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={
														handleClickShowPassword
													}
													onMouseDown={
														handleMouseDownPassword
													}
													edge="end"
												>
													{values.showPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										}
										autoComplete="password"
										label="Password"
										value={state.password}
										onChange={
											(handleChange("password"),
											getTextChangeHandler("password"))
										}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Button
									id="btnLogIn"
									variant="contained"
									fullWidth
									onClick={handleSubmitResponse}
								>
									Log In
								</Button>
								<Link to="/forgotpassword">
									Forgot password?
								</Link>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}

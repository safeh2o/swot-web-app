import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
	addError,
	handleServerMessages,
	setLoading,
} from "../../reducers/notifications";
import { getUser } from "../../reducers/user";
import { ProfileLogin as css } from "../../styles/styles";

export default function ProfileLogin() {
	const { state, getTextChangeHandler } = useForm({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoading(true));
		axios
			.post("/api/auth", {
				email: state.email,
				password: state.password,
			})
			.then((res) => {
				if (res.status === 200) {
					navigate("/");
					dispatch(getUser());
				}
				dispatch(handleServerMessages(res.data?.messages));
			})
			.catch((err) => {
				let message =
					"An unknown error occurred, please try again or contact support";
				if (err?.response?.status === 401) {
					message =
						"Invalid credentials, please try again or reset your password";
				} else {
					console.error(err);
				}
				dispatch(addError(message));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};

	// Password input field
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword((showPassword) => !showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				Log in
			</Typography>
			<Card elevation={1}>
				<CardContent>
					<Box
						component="form"
						sx={{ ...css.form }}
						onSubmit={handleSubmit}
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
											showPassword ? "text" : "password"
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
													{showPassword ? (
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
										onChange={getTextChangeHandler(
											"password"
										)}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Button
									id="btnLogIn"
									variant="contained"
									fullWidth
									type="submit"
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

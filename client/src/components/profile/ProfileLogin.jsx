import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	FormControl,
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
			<section>
				<div className="section-wrap compact">
					<h1 className="section-subtitle">Sign in</h1>
					<Box
						component="form"
						className="app-card"
						onSubmit={handleSubmit}
					>
						<Box className="form-content">
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
							<FormControl fullWidth>
								<InputLabel htmlFor="password">
									Password
								</InputLabel>
								<OutlinedInput
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
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
									onChange={getTextChangeHandler("password")}
								/>
							</FormControl>
						</Box>
						<Box className="form-submit">
							<Button
								id="btnSubmit"
								className="btn"
								type="submit"
							>
								Log In
							</Button>
							<Link className="small" to="/forgotpassword">
								Forgot password?
							</Link>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

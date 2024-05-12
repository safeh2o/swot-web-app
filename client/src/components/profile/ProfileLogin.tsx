import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Skeleton,
	TextField,
} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { addError, handleServerMessages, setLoading } from "../../reducers/notifications";
import { userSelectors } from "../../reducers/user";
import { ServerMessages } from "../../types";

export default function ProfileLogin() {
	const { state, getTextChangeHandler } = useForm({
		email: "",
		password: "",
	});
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const from = searchParams.get("from") ?? "/";
	const userLoadingStatus = useSelector(userSelectors.loadingStatus);
	const userLoading = userLoadingStatus === "loading";

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(setLoading(true));
		axios
			.post("/api/auth", {
				email: state.email,
				password: state.password,
			})
			.then((res: AxiosResponse<{ messages: ServerMessages }>) => {
				if (res.status === 200) {
					window.location.href = from;
				}
				dispatch(handleServerMessages(res.data?.messages));
			})
			.catch((err: AxiosError) => {
				let message = "An unknown error occurred, please try again or contact support";
				if (err?.response?.status === 401) {
					message = "Invalid credentials, please try again or reset your password";
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

	const handleMouseDownPassword = (event: FormEvent) => {
		event.preventDefault();
	};

	return (
		<>
			<section>
				<div className="section-wrap compact">
					<h1 className="section-subtitle user">
						{userLoading ? <Skeleton width="30%" /> : "Sign in"}
					</h1>
					<Box component="form" className="app-card" onSubmit={handleSubmit}>
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
								<InputLabel htmlFor="password">Password</InputLabel>
								<OutlinedInput
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
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
								disableRipple={true}
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

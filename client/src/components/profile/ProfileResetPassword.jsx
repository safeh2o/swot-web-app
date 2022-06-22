import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Button,
	TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { handleServerMessages } from "../../reducers/notifications";

export default function ProfileResetPassword() {
	const { key } = useParams();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { state, getTextChangeHandler } = useForm({
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		axios.get("/api/user/resetkey", { params: { key } }).then((res) => {
			dispatch(handleServerMessages(res.data?.messages));
		});
	}, [key]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("/api/resetpassword", {
				password: state.password,
				confirmPassword: state.confirmPassword,
				resetKey: key,
			})
			.then((res) => {
				dispatch(handleServerMessages(res.data?.messages));
				if (!res.data?.messages?.errors?.length) {
					navigate("/signin");
				}
			});
	};

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
					<h1 className="section-subtitle">Reset Password</h1>
					<Box
						component="form"
						className="app-card"
						onSubmit={handleSubmit}
					>
						<Box className="form-content">
							<FormControl fullWidth sx={{ mb: 1 }}>
								<InputLabel htmlFor="password">
									Password
								</InputLabel>
								<OutlinedInput
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
									autoComplete="new-password"
									label="New Password"
									onChange={getTextChangeHandler("password")}
									required
								/>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									label="Confirm Password"
									type={showPassword ? "text" : "password"}
									variant="outlined"
									onChange={getTextChangeHandler(
										"confirmPassword"
									)}
									required
								/>
							</FormControl>
						</Box>
						<Box className="form-submit">
							<Button
								type="submit"
								id="btnSubmit"
								className="btn"
								disableRipple={true}
							>
								Submit
							</Button>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

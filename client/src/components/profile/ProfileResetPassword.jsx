import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
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

	// Styles
	const css = {
		cardElement: {},
		form: {
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
				<CardHeader title={"Password Reset"} />

				<Divider />

				<CardContent>
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{ ...css.form }}
					>
						<Grid container direction="row" spacing={2}>
							<Grid item xs={12}>
								<FormControl fullWidth sx={{ mb: 1 }}>
									<InputLabel htmlFor="password">
										Password
									</InputLabel>
									<OutlinedInput
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
										autoComplete="new-password"
										label="New Password"
										onChange={getTextChangeHandler(
											"password"
										)}
										required
									/>
								</FormControl>
								<FormControl fullWidth>
									<TextField
										label="Confirm Password"
										type={
											showPassword ? "text" : "password"
										}
										variant="outlined"
										onChange={getTextChangeHandler(
											"confirmPassword"
										)}
										required
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Button
									id="btnSubmit"
									variant="contained"
									fullWidth
									type="submit"
								>
									Submit
								</Button>
								<Button fullWidth type="reset">
									Reset
								</Button>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}

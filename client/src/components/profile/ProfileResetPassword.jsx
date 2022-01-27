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
import { useState } from "react";

export default function ProfileResetPassword() {
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
			"& #btnReset": {
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
						action="/resetpassword"
						method="post"
						sx={{ ...css.form }}
					>
						<Grid container direction="row" spacing={2}>
							<Grid item xs={12}>
								<input
									type="hidden"
									name="resetkey"
									value={""}
								/>
								<FormControl fullWidth sx={{ mb: 1 }}>
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
										label="New Password"
										onChange={handleChange("password")}
									/>
								</FormControl>
								<FormControl fullWidth>
									<TextField
										id="password_confirm"
										name="password_confirm"
										label="Confirm Password"
										type={
											values.showPassword
												? "text"
												: "password"
										}
										variant="outlined"
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Button
									id="btnReset"
									variant="contained"
									fullWidth
									type="submit"
								>
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

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleServerMessages } from "../../reducers/notifications";
import useForm from "../../hooks/useForm";
import {
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";

export default function ProfileResetPassword() {
	const { key } = useParams();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { state, getTextChangeHandler } = useForm({
		password: "",
		confirmPassword: "",
	});

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

	return (
		<>
			<Box component="form" onSubmit={handleSubmit}>
				<Grid container direction="column" spacing={3}>
					<Grid item>
						<Typography variant="h3" color="darkgrey">
							Reset Password
						</Typography>
					</Grid>
					<Grid item>
						<Paper sx={(theme) => ({ padding: theme.spacing(4) })}>
							<Grid container direction="column" spacing={2}>
								<Grid item>
									<Typography variant="body1">
										Please fill the following fields to
										reset your password
									</Typography>
								</Grid>
								<Grid item>
									<Divider />
								</Grid>
								<Grid item>
									<TextField
										type="password"
										autoComplete="new-password"
										required
										label="Password"
										value={state.password}
										onChange={getTextChangeHandler(
											"password"
										)}
									/>
								</Grid>
								<Grid item>
									<TextField
										type="password"
										autoComplete="new-password"
										required
										label="Confirm Password"
										value={state.confirmPassword}
										onChange={getTextChangeHandler(
											"confirmPassword"
										)}
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item>
						<Paper sx={(theme) => ({ padding: theme.spacing(2) })}>
							<Grid
								container
								spacing={3}
								alignItems="center"
								mx={0}
							>
								<Grid item>
									<Button type="submit" variant="contained">
										Submit
									</Button>
								</Grid>
								<Grid item>
									<Link to="/signin">LOG IN</Link>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

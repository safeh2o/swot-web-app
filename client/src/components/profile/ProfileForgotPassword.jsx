import {
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { handleServerMessages } from "../../reducers/notifications";

export default function ProfileForgotPassword() {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post("/api/forgotpassword", state).then((res) => {
			console.log(res.data);
			dispatch(handleServerMessages(res.data?.messages));
		});
	};

	const { state, getTextChangeHandler } = useForm({ email: "" });

	return (
		<>
			<Box component="form" onSubmit={handleSubmit}>
				<Grid container direction="column" spacing={3}>
					<Grid item>
						<Typography variant="h3" color="darkgrey">
							Forgot Password
						</Typography>
					</Grid>
					<Grid item>
						<Paper sx={(theme) => ({ padding: theme.spacing(4) })}>
							<Typography variant="body1">
								Enter the email you are using for next steps
							</Typography>
							<Divider sx={{ my: 2 }} />
							<TextField
								type="email"
								autoComplete="email"
								required
								label="Email"
								value={state.email}
								onChange={getTextChangeHandler("email")}
							/>
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

import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { handleServerMessages } from "../../reducers/notifications";
import { ProfileForgotPassword as css } from "../../styles/styles";
import NotificationLine from "../elements/NotificationLine";

export default function ProfileForgotPassword() {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post("/api/forgotpassword", state).then((res) => {
			dispatch(handleServerMessages(res.data?.messages));
		});
	};

	const { state, getTextChangeHandler } = useForm({ email: "" });

	return (
		<>
			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				Forgot Password
			</Typography>
			<Card elevation={1}>
				<CardContent>
					<Box
						role="form"
						onSubmit={handleSubmit}
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
										onChange={getTextChangeHandler("email")}
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
									Enter the email you registered with.
								</NotificationLine>
							</Grid>
							<Grid item xs={12}>
								<Button
									type="submit"
									variant="contained"
									fullWidth
									id="btnSubmit"
								>
									Submit
								</Button>
								<Button fullWidth type="reset" id="btnReset">
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

import {
	Box,
	Button,
	Card,
	CardContent,
	Typography,
	FormControl,
	Grid,
	TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationLine from "../elements/NotificationLine";
import useForm from "../../hooks/useForm";
import { handleServerMessages } from "../../reducers/notifications";
import { useDispatch } from "react-redux";
import axios from "axios";

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

	// Styles
	const css = {
		cardElement: {},
		form: {
			"& button": { textTransform: "capitalize" },
			"& #btnSubmit": {
				color: "white",
				mb: 1,
			},
			"& #btnReset": {
				backgroundColor: "#f1f4f7",
				mb: 1,
			},
		},
	};

	return (
		<>
			<Typography
				component={"h1"}
				variant="body1"
				sx={{
					mb: 2,
					fontSize: "1.55rem",
					fontWeight: "400",
					fontFamily: '"Roboto Condensed", sans-serif',
					lineHeight: "1.2",
					letterSpacing: "-0.02em",
					color: "#747e87",
					margin: "5px 0 10px 8px",
				}}
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

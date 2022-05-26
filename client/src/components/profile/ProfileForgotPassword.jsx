import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { handleServerMessages } from "../../reducers/notifications";
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
			<section>
				<div className="section-wrap compact">
					<h1 className="section-subtitle">Forgot Password</h1>
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
									onChange={getTextChangeHandler("email")}
								/>
							</FormControl>
							<NotificationLine
								type="notice"
								sx={{
									paddingTop: "0px",
									paddingBottom: "0px",
								}}
							>
								Enter the email you registered with.
							</NotificationLine>
						</Box>
						<Box className="form-submit">
							<Button
								type="submit"
								id="btnSubmit"
								className="btn"
							>
								Submit
							</Button>
							<Box>
								or,&nbsp;<Link to="/signin">Sign in</Link>
							</Box>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

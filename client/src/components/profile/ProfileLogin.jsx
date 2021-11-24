import { Button, TextField } from "@mui/material";
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

	const handleSubmitResponse = () => {
		dispatch(setLoading(true));
		fetch("/api/auth", {
			method: "POST",
			body: JSON.stringify(state),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success === true) {
					navigate("/");
					dispatch(getUser());
				} else {
					dispatch(handleServerMessages(data.messages));
				}
			})
			.catch((err) => {
				dispatch(addError(err));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};

	return (
		<>
			<h1 className="content-title">Log In</h1>
			<section className="content-window">
				<section>
					<div className="flex-group input">
						<div className="flex-group-item line">
							<TextField
								margin="dense"
								id="email"
								label="Email Address"
								type="email"
								fullWidth
								variant="standard"
								value={state.email}
								onChange={getTextChangeHandler("email")}
							/>
						</div>
						<div className="flex-group-item line">
							<TextField
								margin="dense"
								id="password"
								label="Password"
								type="password"
								fullWidth
								variant="standard"
								value={state.password}
								onChange={getTextChangeHandler("password")}
								autoComplete="password"
							/>
						</div>
					</div>
				</section>
			</section>
			<section className="content-window">
				<section>
					<div className="submission-wrap">
						<Button
							className="button blue"
							onClick={handleSubmitResponse}
						>
							Log In
						</Button>
						<Link to="/forgotpassword" className="button reset">
							<span>Forgot Password</span>
						</Link>
					</div>
				</section>
			</section>
		</>
	);
}

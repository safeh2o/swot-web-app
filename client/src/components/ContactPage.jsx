import {
	Button,
	FormControl,
	FormHelperText,
	Grid,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { handleServerMessages, setLoading } from "../reducers/notifications";
import { pushView } from "../reducers/view";
import NoteLine from "./elements/NoteLine";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	form: {
		flexDirection: "column",
		display: "flex",
		width: "50%",
	},
}));

export default function ContactPage(props) {
	const [contactReasons, setContactReasons] = useState([]);
	const [disabled, setDisabled] = useState(true);
	const classes = useStyles();
	const { state, reset, getTextChangeHandler } = useForm({
		name: "",
		email: "",
		phone: "",
		reason: "",
		message: "",
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "Contact", path: "/contact" }));
		axios("/api/contactreasons").then(({ data }) => {
			setContactReasons(data);
		});
	}, []);

	useEffect(() => {
		const { name, email, reason, message } = state;
		setDisabled(!name || !email || !reason || !message);
	}, [state]);

	function handleSubmit() {
		dispatch(setLoading(true));
		axios
			.post("/api/contact", state)
			.then(({ data }) => {
				dispatch(handleServerMessages(data.messages));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	}

	return (
		<>
			<form>
				<section className="content-window rich-text">
					<header>
						<div className="content-window-title txt-condensed">
							Contact Us
						</div>
					</header>
					<section>
						<div className={classes.form}>
							<FormControl className={classes.formControl}>
								<TextField
									required
									label="Name"
									value={state.name}
									id="name"
									onChange={getTextChangeHandler("name")}
								/>
								<FormHelperText>
									So we can address you
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.formControl}>
								<TextField
									id="email"
									type="email"
									label="Email"
									value={state.email}
									required
									onChange={getTextChangeHandler("email")}
								/>
								<FormHelperText>
									We respect your privacy
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.formControl}>
								<TextField
									id="phone"
									type="phone"
									label="Phone"
									value={state.phone}
									onChange={getTextChangeHandler("phone")}
								/>
								<FormHelperText>
									Please include your country code
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.formControl}>
								<Select
									value={state.reason}
									onChange={getTextChangeHandler("reason")}
									displayEmpty
									required
								>
									<MenuItem value="" disabled>
										(select reason)
									</MenuItem>
									{contactReasons.map((reason) => (
										<MenuItem
											key={reason.value}
											value={reason.value}
										>
											{reason.label}
										</MenuItem>
									))}
								</Select>
								<FormHelperText>
									How can we help you?
								</FormHelperText>
							</FormControl>
							<FormControl className={classes.formControl}>
								<TextField
									label="Message"
									multiline
									value={state.message}
									id="message"
									required
									onChange={getTextChangeHandler("message")}
								/>
								<FormHelperText>
									Please tell us more about why you are
									contacting us
								</FormHelperText>
							</FormControl>
						</div>
						<Grid container direction="row" spacing={3}>
							<Grid item xs="auto">
								<Button
									variant="contained"
									color="primary"
									disabled={disabled}
									onClick={handleSubmit}
								>
									Submit
								</Button>
							</Grid>
							<Grid item xs="auto">
								<Button
									variant="contained"
									color="secondary"
									onClick={() => {
										reset();
									}}
								>
									Reset
								</Button>
							</Grid>
						</Grid>

						<NoteLine>
							By clicking Submit, you agree to our{" "}
							<Link to="/pages/terms-of-use">Terms of Use</Link>
							&nbsp; and our{" "}
							<Link to="/pages/privacy-policy">
								Privacy Policy
							</Link>
						</NoteLine>
					</section>
				</section>
			</form>
		</>
	);
}

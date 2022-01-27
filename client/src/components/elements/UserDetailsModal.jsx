import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import useForm from "../../hooks/useForm";
import { getUser } from "../../reducers/user";
import { userSelectors } from "../../reducers/user";
import { handleServerMessages } from "../../reducers/notifications";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	AccordionSummary,
	Collapse,
	Divider,
} from "@mui/material";
import {
	Grid,
	Button,
	FormControl,
	TextField,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Typography,
} from "@mui/material";

import { IconProfile } from "../icons";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function UserDetailsModal() {
	const [open, setOpen] = useState(false);
	const user = useSelector(userSelectors.user);
	const dispatch = useDispatch();
	const [changingPassword, setChangingPassword] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { state, reset, getTextChangeHandler } = useForm({
		firstName: user.name.first,
		lastName: user.name.last,
		email: user.email,
		password1: "",
		password2: "",
	});

	const handleSubmit = () => {
		fetch("/api/user/update", {
			method: "POST",
			body: JSON.stringify(state),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch(handleServerMessages(data.messages));
			})
			.finally(() => {
				dispatch(getUser());
			});
		handleClose();
	};

	// START Form Password
	const [values, setValues] = useState({
		amount: "",
		password: "",
		weight: "",
		weightRange: "",
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
	// END Form Password

	// Styles
	const css = {
		dialogueElement: {
			width: "45ch",
			maxWidth: "calc(100% - 4rem)",
			margin: "auto",
			submissionWrap: {
				px: 2,
				pb: 2,
				"& button": {
					mr: 1,
					textTransform: "capitalize",
				},
				"& #btnSaveUserDetails": {
					color: "white",
				},
				"& #btnCancelUserDetails": {
					color: "coral",
					textDecoration: "underline 1px",
				},
				"& #btnResetUserDetails": {
					marginLeft: "auto",
				},
			},
		},
	};

	return (
		<>
			<IconButton onClick={handleOpen} tabIndex={-1}>
				<IconProfile />
			</IconButton>

			<Dialog
				aria-labelledby="dialog-title"
				aria-describedby="Edit and Update"
				open={open}
				onClose={handleClose}
				sx={{ ...css.dialogueElement }}
			>
				<DialogTitle>Edit Profile</DialogTitle>

				<DialogContent sx={{ pb: 0 }}>
					<Divider sx={{ mb: 2 }} />
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography
								component="h4"
								variant="body2"
								sx={{ fontWeight: 500 }}
							>
								General
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<FormControl>
								<TextField
									id="firstName"
									label="First Name"
									variant="outlined"
									size="small"
									value={state.firstName}
									onChange={getTextChangeHandler("firstName")}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl>
								<TextField
									id="lastName"
									label="Last Name"
									variant="outlined"
									size="small"
									value={state.lastName}
									onChange={getTextChangeHandler("lastName")}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl>
								<TextField
									id="email"
									label="Email Address"
									variant="outlined"
									size="small"
									value={state.email}
									onChange={getTextChangeHandler("email")}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Divider sx={{ mt: 3 }} />
							<AccordionSummary
								sx={{ px: 0 }}
								expandIcon={
									<ExpandMoreIcon
										sx={{
											transform:
												(changingPassword &&
													"rotate(180deg)") ||
												"none",
										}}
									/>
								}
								onClick={() =>
									setChangingPassword(!changingPassword)
								}
							>
								<Typography
									component="h4"
									variant="body2"
									sx={{ fontWeight: 500 }}
								>
									Change Password
								</Typography>
							</AccordionSummary>
							<Collapse in={changingPassword}>
								<Grid
									container
									spacing={2}
									sx={{ pt: 1, pb: 3 }}
								>
									<Grid item xs={12}>
										<FormControl fullWidth>
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
												value={values.password}
												onChange={handleChange(
													"password"
												)}
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
												label="Password"
												size="small"
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12}>
										<FormControl fullWidth>
											<TextField
												id="password2"
												name="password2"
												label="Confirm Password"
												variant="outlined"
												type={
													values.showPassword
														? "text"
														: "password"
												}
												size="small"
											/>
										</FormControl>
									</Grid>
								</Grid>
							</Collapse>
						</Grid>
					</Grid>
				</DialogContent>

				<Divider sx={{ mb: 1 }} />

				<DialogActions sx={{ ...css.dialogueElement.submissionWrap }}>
					<Button
						id="btnSaveUserDetails"
						variant="contained"
						onClick={() => {
							// handleSubmit();
							console.log("");
						}}
					>
						Save
					</Button>
					<Button
						id="btnCancelUserDetails"
						onClick={() => {
							handleClose();
						}}
					>
						Cancel
					</Button>
					<Button
						id="btnResetUserDetails"
						onClick={() => {
							reset();
						}}
					>
						Reset
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

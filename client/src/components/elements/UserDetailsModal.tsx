import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	AccordionSummary,
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { handleServerMessages } from "../../reducers/notifications";
import { getUser, userSelectors } from "../../reducers/user";
import { UserDetailsModal as css } from "../../styles/styles";
import { ServerMessages } from "../../types";
import { IconProfile } from "../icons";

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
		firstName: user?.name.first,
		lastName: user?.name.last,
		email: user?.email,
		password1: "",
		password2: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = () => {
		void axios
			.post<typeof state, { messages: ServerMessages }>("/api/user/update", state)
			.then((data) => {
				dispatch(handleServerMessages(data.messages));
			})
			.finally(() => {
				dispatch(getUser());
			});
		handleClose();
	};
	const handleShowPassword = () => {
		setShowPassword((showPassword) => !showPassword);
	};
	const showPasswordIcon = showPassword ? <VisibilityOff /> : <Visibility />;

	return (
		<>
			<IconButton onClick={handleOpen} tabIndex={-1}>
				<span className="label">Profile</span>
				<i>
					<IconProfile />
				</i>
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
							<Typography component="h4" variant="body2" sx={{ fontWeight: 500 }}>
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
												(changingPassword && "rotate(180deg)") || "none",
										}}
									/>
								}
								onClick={() => setChangingPassword(!changingPassword)}
							>
								<Typography component="h4" variant="body2" sx={{ fontWeight: 500 }}>
									Change Password
								</Typography>
							</AccordionSummary>
							<Collapse in={changingPassword}>
								<Grid container spacing={2} sx={{ pt: 1, pb: 3 }}>
									<Grid item xs={12}>
										<FormControl fullWidth>
											<TextField
												id="password1"
												name="password1"
												type={showPassword ? "text" : "password"}
												value={state.password1}
												onChange={getTextChangeHandler("password1")}
												autoComplete="new-password"
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={handleShowPassword}
																edge="end"
															>
																{showPasswordIcon}
															</IconButton>
														</InputAdornment>
													),
												}}
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
												value={state.password2}
												onChange={getTextChangeHandler("password2")}
												type={showPassword ? "text" : "password"}
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
					<Button id="btnSaveUserDetails" variant="contained" onClick={handleSubmit}>
						Save
					</Button>
					<Button id="btnCancelUserDetails" onClick={handleClose}>
						Cancel
					</Button>
					<Button id="btnResetUserDetails" onClick={reset}>
						Reset
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

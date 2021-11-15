import { AccordionSummary, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { handleServerMessages } from "../../reducers/notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelectors } from "../../reducers/user";
import PaperComponent from "./PaperComponent";

export default function UserDetailsModal() {
	const [open, setOpen] = useState(false);
	const user = useSelector(userSelectors.user);
	const dispatch = useDispatch();
	const [changingPassword, setChangingPassword] = useState(false);

	const handleClickOpen = () => {
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

	return (
		<div>
			<IconButton color="inherit" onClick={handleClickOpen}>
				<AccountCircleIcon />
			</IconButton>

			<Dialog
				open={open}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
			>
				<DialogTitle
					id="draggable-dialog-title"
					style={{ cursor: "move" }}
				>
					Edit Profile
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="firstname"
						label="First Name"
						type="text"
						fullWidth
						variant="standard"
						value={state.firstName}
						onChange={getTextChangeHandler("firstName")}
					/>
					<TextField
						margin="dense"
						id="lastname"
						label="Last Name"
						type="text"
						fullWidth
						variant="standard"
						value={state.lastName}
						onChange={getTextChangeHandler("lastName")}
					/>
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
					<br />
					<br />
					<AccordionSummary
						expandIcon={
							(changingPassword && <ExpandLessIcon />) || (
								<ExpandMoreIcon />
							)
						}
						onClick={() => setChangingPassword(!changingPassword)}
					>
						Change Password
					</AccordionSummary>
					<Collapse in={changingPassword}>
						<TextField
							margin="dense"
							id="password1"
							label="New Password"
							type="password"
							fullWidth
							variant="standard"
							value={state.password1}
							onChange={getTextChangeHandler("password1")}
							autoComplete="new-password"
						/>
						<TextField
							margin="dense"
							id="password2"
							label="Confirm Password"
							type="password"
							fullWidth
							variant="standard"
							value={state.password2}
							onChange={getTextChangeHandler("password2")}
						/>
					</Collapse>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={reset}>Reset</Button>
					<Button onClick={handleSubmit}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

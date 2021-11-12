// import { useState, useRef } from "react";
// import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { userSelectors } from "../../reducers/user";
// import { handleServerMessages } from "../../reducers/notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		backgroundColor: "rgba(255,255,255,0.1)",
// 	},
// 	modal: {
// 		backgroundColor: "rgba(255,255,255,0.1)",
// 	},
// 	paper: {
// 		boxShadow: theme.shadows[5],
// 		backgroundColor: "rgba(255,255,255,0.1)",
// 	},
// }));

// export default function UserDetailsModal() {
// 	const user = useSelector(userSelectors.user);
// 	const classes = useStyles();
// 	const userForm = useRef(null);
// 	const [open, setOpen] = useState(false);
// 	const dispatch = useDispatch();

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const data = new FormData(userForm.current);
// 		fetch("/api/user/update", {
// 			method: "POST",
// 			body: data,
// 		})
// 			.then((r) => r.json())
// 			.then((res) => {
// 				dispatch(handleServerMessages(res.messages));
// 			});
// 	};

// 	const handleOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 	};

// 	return (
// 		<>
// 			<IconButton
// 				color="inherit"
// 				// className="nav-item nav-profile profile"
// 				onClick={handleOpen}
// 				tabIndex="-1"
// 				title="User Profile"
// 			>
// 				<AccountCircleIcon />
// 			</IconButton>
// 			<Modal
// 				aria-labelledby="modal-title"
// 				className={classes.modal}
// 				open={open}
// 				onClose={handleClose}
// 				closeAfterTransition
// 				BackdropComponent={Backdrop}
// 				BackdropProps={{
// 					timeout: 500,
// 				}}
// 			>
// 				<Fade in={open}>
// 					<div className="modal-content">
// 						<div className="modal-header">
// 							<span className="modal-title" id="modal-title">
// 								User Details
// 							</span>
// 							<button
// 								type="button"
// 								className="close"
// 								data-dismiss="modal"
// 							>
// 								&times;
// 							</button>
// 						</div>

// 						<div className="modal-body">
// 							<form
// 								ref={userForm}
// 								className="form"
// 								role="form"
// 								autoComplete="off"
// 								id="formUser"
// 								onSubmit={handleSubmit}
// 								noValidate
// 							>
// 								<div className="form-group">
// 									<label htmlFor="firstName">
// 										First Name
// 									</label>
// 									<input
// 										type="text"
// 										autoComplete="given-name"
// 										className="form-control form-control-lg"
// 										name="firstName"
// 										id="firstName"
// 										required=""
// 										defaultValue={user.name.first}
// 									/>
// 								</div>

// 								<div className="form-group">
// 									<label htmlFor="lastName">Last Name</label>
// 									<input
// 										type="text"
// 										autoComplete="family-name"
// 										className="form-control form-control-lg"
// 										name="lastName"
// 										id="lastName"
// 										defaultValue={user.name.last}
// 										required=""
// 									/>
// 								</div>

// 								<div className="form-group">
// 									<label htmlFor="email">Email</label>
// 									<input
// 										type="text"
// 										autoComplete="email"
// 										className="form-control form-control-lg"
// 										name="email"
// 										id="email"
// 										defaultValue={user.email}
// 										required=""
// 									/>
// 								</div>

// 								<h6>Change Password</h6>
// 								<div className="form-group">
// 									<label htmlFor="password1">Password</label>
// 									<input
// 										type="password"
// 										autoComplete="new-password"
// 										className="form-control form-control-lg"
// 										name="password1"
// 										id="password1"
// 										minLength="6"
// 									/>
// 								</div>

// 								<div className="form-group">
// 									<label htmlFor="password2">
// 										Confirm Password
// 									</label>
// 									<input
// 										type="password"
// 										autoComplete="new-password"
// 										className="form-control form-control-lg"
// 										name="password2"
// 										id="password2"
// 										minLength="6"
// 									/>
// 								</div>

// 								<div className="form-group pt-4">
// 									<button
// 										className="btn btn-danger btn-lg"
// 										data-dismiss="modal"
// 										aria-hidden="true"
// 										type="reset"
// 										onClick={handleClose}
// 									>
// 										Cancel
// 									</button>
// 									<button
// 										className="btn btn-primary btn-lg float-right"
// 										id="btnSaveUserDetails"
// 										type="submit"
// 										onClick={handleClose}
// 									>
// 										Save
// 									</button>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				</Fade>
// 			</Modal>
// 		</>
// 	);
// }

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UserDetailsModal() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		console.log("saved");
		handleClose();
	};

	return (
		<div>
			<IconButton color="inherit" onClick={handleClickOpen}>
				<AccountCircleIcon />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Profile</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

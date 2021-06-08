import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "../../reducers/user";
import { handleServerMessages } from "../../reducers/notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "rgba(255,255,255,0.1)",
	},
	modal: {
		backgroundColor: "rgba(255,255,255,0.1)",
	},
	paper: {
		boxShadow: theme.shadows[5],
		backgroundColor: "rgba(255,255,255,0.1)",
	},
}));

export default function UserDetailsModal() {
	const user = useSelector(userSelectors.user);
	const classes = useStyles();
	const userForm = useRef(null);
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(userForm.current);
		fetch("/api/user/update", {
			method: "POST",
			body: data,
		})
			.then((r) => r.json())
			.then((res) => {
				dispatch(handleServerMessages(res.messages));
			});
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<IconButton
				color="inherit"
				onClick={handleOpen}
				title="User Profile"
			>
				<AccountCircleIcon />
			</IconButton>
			<Modal
				aria-labelledby="modal-title"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className="modal-content">
						<div className="modal-header">
							<span className="modal-title" id="modal-title">
								User Details
							</span>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
							>
								&times;
							</button>
						</div>

						<div className="modal-body">
							<form
								ref={userForm}
								className="form"
								role="form"
								autoComplete="off"
								id="formUser"
								onSubmit={handleSubmit}
								noValidate
							>
								<div className="form-group">
									<label htmlFor="firstName">
										First Name
									</label>
									<input
										type="text"
										autoComplete="given-name"
										className="form-control form-control-lg"
										name="firstName"
										id="firstName"
										required=""
										defaultValue={user.name.first}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="lastName">Last Name</label>
									<input
										type="text"
										autoComplete="family-name"
										className="form-control form-control-lg"
										name="lastName"
										id="lastName"
										defaultValue={user.name.last}
										required=""
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="text"
										autoComplete="email"
										className="form-control form-control-lg"
										name="email"
										id="email"
										defaultValue={user.email}
										required=""
									/>
								</div>

								<h6>Change Password</h6>
								<div className="form-group">
									<label htmlFor="password1">Password</label>
									<input
										type="password"
										autoComplete="new-password"
										className="form-control form-control-lg"
										name="password1"
										id="password1"
										minLength="6"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password2">
										Confirm Password
									</label>
									<input
										type="password"
										autoComplete="new-password"
										className="form-control form-control-lg"
										name="password2"
										id="password2"
										minLength="6"
									/>
								</div>

								<div className="form-group pt-4">
									<button
										className="btn btn-danger btn-lg"
										data-dismiss="modal"
										aria-hidden="true"
										type="reset"
										onClick={handleClose}
									>
										Cancel
									</button>
									<button
										className="btn btn-primary btn-lg float-right"
										id="btnSaveUserDetails"
										type="submit"
										onClick={handleClose}
									>
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</Fade>
			</Modal>
		</>
	);
}

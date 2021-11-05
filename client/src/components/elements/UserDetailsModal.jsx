import React from "react";
import { makeStyles } from "@mui/styles";
import { Modal, Backdrop, Fade } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "../../reducers/user";
import { handleServerMessages } from "../../reducers/notifications";

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
			<li
				className="nav-item nav-profile profile"
				onClick={handleOpen}
				tabIndex="-1"
				title="User Profile"
			>
				<span className="button">
					<i>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 40 40"
						>
							<path
								fill="currentColor"
								d="M20,5C11.8,5,5,11.8,5,20s6.8,15,15,15s15-6.8,15-15S28.3,5,20,5z M19.7,10.4c2.7,0,4.8,2.2,4.8,4.8 c0.1,2.7-2.2,4.8-4.8,4.8c-2.7,0-4.8-2.2-4.8-4.8S17,10.4,19.7,10.4z M29.1,28.8c-2.4,2-5.7,3.3-9.1,3.3c-3.9,0-6.5-1.6-9-4.2 c1.5-2.7,3.4-4.4,6.6-4.4h4.9c2.8-0.2,5.2,1.2,6.8,3.2C29.8,27.4,29.7,28.4,29.1,28.8z"
							/>
						</svg>
					</i>
				</span>
			</li>
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

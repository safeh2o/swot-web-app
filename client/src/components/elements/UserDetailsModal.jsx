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
			<li
				className="nav-item nav-profile admin"
				onClick={handleOpen}
				tabIndex="-1"
				title="SWOT Admin Panel">
				<a href="/admin" className="button">
					<i>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
							<path fill="none" stroke="currentColor" strokeWidth="2.8" strokeMiterlimit="10" d="M20,34c-7.7,0-14-6.3-14-14S12.3,6,20,6 s14,6.3,14,14S27.7,34,20,34z" />
							<path fill="currentColor" d="M19.6,22.2L19.6,22.2c-2.5,0-4.5-2-4.5-4.5l0,0c0-2.5,2-4.5,4.5-4.5l0,0c2.5,0,4.5,2,4.5,4.5l0,0 C24.2,20.2,22.1,22.2,19.6,22.2z M30,29.4c0.5,0.7,0.4,1.7-0.2,2.2c-2.6,2.2-6.1,3.6-9.8,3.6c-4.2,0-8.1-1.7-10.8-4.5l0,0 c1.6-2.9,4.7-4.8,8.2-4.8h5.3C25.7,25.7,28.3,27.2,30,29.4z" />
						</svg>
					</i>
				</a>
			</li>
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

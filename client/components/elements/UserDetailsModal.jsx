import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AppContext from "../../contexts/AppContext";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
	},
}));

export default function UserDetailsModal() {
	const context = useContext(AppContext);
	const classes = useStyles();
	const userForm = useRef(null);
	const [open, setOpen] = React.useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(userForm.current);
		fetch("/api/user/update", {
			method: "POST",
			body: data,
		})
			.then((r) => r.json())
			.then((res) => {
				context.setMessages(res.messages);
			});
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<a onClick={handleOpen} href="#" className="panel-link">
				<img src="/assets/user.svg" alt="Account Details" />
			</a>
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
					<div className={`${classes.paper}`}>
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title" id="modal-title">
									USER DETAILS
								</h4>
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
											defaultValue={
												context.user.name.first
											}
										/>
									</div>

									<div className="form-group">
										<label htmlFor="lastName">
											Last Name
										</label>
										<input
											type="text"
											autoComplete="family-name"
											className="form-control form-control-lg"
											name="lastName"
											id="lastName"
											defaultValue={
												context.user.name.last
											}
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
											defaultValue={context.user.email}
											required=""
										/>
									</div>

									<h6>Change Password</h6>
									<div className="form-group">
										<label htmlFor="password1">
											Password
										</label>
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
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

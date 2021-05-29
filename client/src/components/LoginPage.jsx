import React from "react";
import { useRef, useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../contexts/AppContext";

import FlashMessages from "./elements/FlashMessages";

export default function LoginPage(props) {
	const form = useRef(null);
	const history = useHistory();
	const context = useContext(AppContext);
	const [messages, setMessages] = useState({});

	const handleSubmitResponse = (data) => {
		hideSpinner();
		if (data.success === true) {
			// history wouldnt work well because NavBar doesnt rerender
			history.push("/");
			// window.location.reload();
			context.logInUser(data.user);
		}
		setMessages(data.messages);
	};

	const handleChange = () => {
		setMessages({});
	};

	useEffect(() => {
		$(form.current).ajaxForm((data) => {
			handleSubmitResponse(data);
		});

		// return cleanup method
		return () => {
			$(form.current).off();
		};
	}, []);

	return (
		<>
			<div className="container">
				<div className="panel panel-primary">
					<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
						<h1 className="display-4" id="headerText">
							Sign In
						</h1>
					</div>
					<br />
					<FlashMessages messages={messages} />
					<div className="panel-body">
						<div className="col-md-4">
							<form
								ref={form}
								role="form"
								action="/api/auth"
								method="post"
							>
								<div className="form-group">
									<label
										htmlFor="sender-email"
										className="control-label"
									>
										Email:
									</label>
									<div className="input-icon">
										<input
											className="form-control email"
											id="signin-email"
											placeholder="you@mail.com"
											name="email"
											type="email"
											onChange={() => {
												handleChange();
											}}
										/>
									</div>
								</div>
								<div className="form-group">
									<label
										htmlFor="user-pass"
										className="control-label"
									>
										Password:
									</label>
									<div className="input-icon">
										<input
											type="password"
											className="form-control"
											placeholder="Password"
											name="password"
											id="password"
											onChange={() => {
												handleChange();
											}}
										/>
									</div>
								</div>
								<div className="form-group">
									<input
										type="submit"
										className="btn btn-primary "
										value="Login"
										onClick={() => {
											showSpinner();
										}}
									/>
									<br />
									<br />
									<Link to="/forgotpassword">
										Forgot Password
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

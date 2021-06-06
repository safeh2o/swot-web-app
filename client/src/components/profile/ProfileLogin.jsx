import React from "react";
import { useRef, useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

import FlashMessages from "../elements/FlashMessages";

export default function ProfileLogin(props) {
	const form = useRef(null);
	const history = useHistory();
	const context = useContext(AppContext);
	const [messages, setMessages] = useState({});

	const handleSubmitResponse = (data) => {
		if (data.success === true) {
			// history wouldnt work well because SideBar doesnt rerender
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
			<FlashMessages messages={messages} />
			<form
				ref={form}
				role="form"
				action="/api/auth"
				method="post"
			>
				<h1 className="content-title">Log In</h1>

				<section className="content-window">
					<header>
						<div>Enter your credentials to log in.</div>
					</header>
					<section>
						<div className="flex-group">
							<div className="flex-group-item space">
								<div className="flex-group-wrapper">
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
								<label
									htmlFor="sender-email"
									className="control-label">
									Email:
								</label>
							</div>
							<div className="flex-group-item">
								<div className="flex-group-wrapper">
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
								<label
									htmlFor="user-pass"
									className="control-label">
									Password:
							</label>
							</div>
						</div>
					</section>
				</section>

				<section className="content-window">
					<section>
						<div className="submission-wrap">
							<input
								type="submit"
								className="button blue"
								value="Log In"
							/>
							<Link
								to="/forgotpassword"
								className="button reset">
								<span>Forgot Password</span>
							</Link>
						</div>
					</section>
				</section>
			</form>
		</>
	);
}

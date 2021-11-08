import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUser } from "../../reducers/user";
import { handleServerMessages } from "../../reducers/notifications";

export default function ProfileLogin(props) {
	const form = useRef(null);
	const history = useHistory();
	const [messages, setMessages] = useState({});
	const dispatch = useDispatch();

	const handleSubmitResponse = (data) => {
		if (data.success === true) {
			// history wouldnt work well because SideBar doesnt rerender
			history.push("/");
			// window.location.reload();
			dispatch(getUser());
		}
		// setMessages(data.messages);
		dispatch(handleServerMessages(data.messages));
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
			<h1 className="content-title">Log In</h1>

			<form ref={form} role="form" action="/api/auth" method="post">
				<section className="content-window">
					<section>
						<div className="flex-group">
							<div className="flex-group-item line">
								<div className="flex-group-wrapper">
									<label
										htmlFor="sender-email"
										className="control-label"
									>
										Email:
									</label>
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
							<div className="flex-group-item line">
								<div className="flex-group-wrapper">
									<label
										htmlFor="user-pass"
										className="control-label"
									>
										Password:
									</label>
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
							<Link to="/forgotpassword" className="button reset">
								<span>Forgot Password</span>
							</Link>
						</div>
					</section>
				</section>
			</form>
		</>
	);
}

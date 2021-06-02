import React from "react";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FlashMessages from "../elements/FlashMessages";

export default function ProfileResetPassword(props) {
	const { key } = useParams();
	const [messages, setMessages] = useState({});
	const form = useRef(null);

	useEffect(() => {
		fetch("/api/user/resetkey?key=" + key)
			.then((r) => r.json())
			.then((data) => {
				setMessages(data.messages);
			});
	}, [key]);

	const handleSubmitResponse = (data) => {
		setMessages(data.messages);
	};

	const handleChange = () => {
		setMessages({});
	};

	useEffect(() => {
		$(form.current).ajaxForm((data) => {
			handleSubmitResponse(data);
		});

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
							Password Reset
						</h1>
					</div>
					<br />
					<FlashMessages messages={messages} />
					<div className="panel-body">
						<div className="col-md-4">
							<form
								ref={form}
								role="form"
								action="/resetpassword"
								method="post"
							>
								<input
									type="hidden"
									name="resetkey"
									value={key}
								/>

								<div className="form-group">
									<label
										htmlFor="password"
										className="control-label"
									>
										Password:
									</label>
									<div className="input-icon">
										<input
											onChange={() => {
												handleChange();
											}}
											className="form-control email"
											id="password"
											name="password"
											type="password"
										/>
									</div>
								</div>
								<div className="form-group">
									<label
										htmlFor="password_confirm"
										className="control-label"
									>
										Confirm Password:
									</label>
									<div className="input-icon">
										<input
											onChange={() => {
												handleChange();
											}}
											className="form-control"
											id="password_confirm"
											name="password_confirm"
											type="password"
										/>
									</div>
								</div>

								<div className="form-group">
									<input
										type="submit"
										className="btn btn-primary "
										value="Reset"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

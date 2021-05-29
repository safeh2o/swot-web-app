import React, { Component } from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";
import FlashMessages from "./elements/FlashMessages";

export default function ForgotPasswordPage(props) {
	const form = useRef(null);
	const [messages, setMessages] = useState({});

	const handleSubmitResponse = (data) => {
		setMessages(data.messages);
	};

	const handleChange = () => {
		setMessages({});
	};

	useEffect(() => {
		$(form.current).ajaxForm((data) => {
			hideSpinner();
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
						<h1 className="display-4">Forgot Password</h1>
					</div>
					<br />
					<FlashMessages messages={messages} />
					<div className="panel-body">
						<div className="col-md-4">
							<form
								ref={form}
								role="form"
								action="/api/forgotpassword"
								method="post"
							>
								<div className="form-group">
									<label
										htmlFor="email"
										className="control-label"
									>
										Email:
									</label>
									<div className="input-icon">
										<input
											onChange={() => {
												handleChange();
											}}
											className="form-control email"
											id="email"
											placeholder="mail@example.com"
											name="email"
											type="email"
										/>
									</div>
								</div>

								<div className="form-group">
									<input
										type="submit"
										className="btn btn-primary "
										value="Reset Password"
										onClick={() => {
											showSpinner();
										}}
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

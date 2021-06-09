import React, { Component, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import _ from "lodash";
import AppContext from "../contexts/AppContext";
import FlashMessages from "./elements/FlashMessages";
import NoteLine from "./elements/NoteLine";
import ReCAPTCHA from "react-google-recaptcha";
import useForm from "../hooks/useForm";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNotice } from "../reducers/notifications";

export default function ContactPage(props) {
	const { grecaptcha } = useContext(AppContext);
	const [contactReasons, setContactReasons] = useState([]);
	const { state, update, reset } = useForm({
		name: "",
		email: "",
		phone: "",
		reason: null,
		message: "",
		captcha: null,
	});
	const dispatch = useDispatch();

	useEffect(() => {
		fetch("/api/contactreasons")
			.then((res) => res.json())
			.then((data) => {
				// setState({ contactReasons: data });
				setContactReasons(data);
			});
	}, []);

	function handleRecaptcha(e) {
		console.log(e);
	}

	function handleSubmit() {
		axios.post("/api/contact", state).then((res) => {
			dispatch(
				addNotice({
					label: "success",
					notice: "Thank you, we will get back to you shortly!",
				})
			);
		});
	}

	function renderSimpleInput(type, name, extraProps = {}) {
		return (
			<input
				type={type}
				name={name}
				className="form-control"
				{...extraProps}
			/>
		);
	}

	return (
		<>
			<form>
				<section className="content-window">
					<section>
						<div className="content-description">
							<p>
								To set up an account to use the SWOT; <br />
								Or if you have any questions; <br />
								Please contact us:
							</p>
						</div>
						<div className="flex-group">
							<div className="flex-group-item line">
								<div
									className={"form-group flex-group-wrapper"}
								>
									{renderSimpleInput("text", "name")}
								</div>
								<label>Name</label>
							</div>

							<div className="flex-group-item line">
								<div
									className={"form-group flex-group-wrapper"}
								>
									{renderSimpleInput("text", "email")}
								</div>
								<label>Email</label>
							</div>

							<div className="flex-group-item line">
								<div
									className={"form-group flex-group-wrapper"}
								>
									{renderSimpleInput("text", "phone")}
								</div>
								<label>Phone&nbsp; (Optional)</label>
							</div>

							<div className="flex-group-item line">
								<div
									className={"form-group flex-group-wrapper"}
								>
									<select
										name="reason"
										className="form-control"
										defaultValue="select reason"
									>
										<option disabled>select reason</option>
										{contactReasons.map((reason) => (
											<option
												key={reason.value}
												value={reason.value}
											>
												{reason.label}
											</option>
										))}
									</select>
								</div>
								<label>What are you contacting us about?</label>
							</div>

							<div className="flex-group-item line">
								<div
									className={"form-group flex-group-wrapper"}
								>
									<textarea
										name="message"
										placeholder=""
										rows="4"
										className="form-control"
									></textarea>
								</div>
								<label>Message</label>
							</div>
						</div>
					</section>
				</section>

				<section className="content-window">
					<section>
						<ReCAPTCHA
							sitekey={grecaptcha}
							onChange={handleRecaptcha}
						/>
						<div className="submission-wrap">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
							>
								Submit
							</Button>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => {
									reset();
								}}
							>
								Reset
							</Button>
						</div>

						<NoteLine>
							By clicking Submit, you agree to our{" "}
							<Link to="pages/terms-of-use">Terms of Use</Link>
							&nbsp; and our{" "}
							<Link to="pages/privacy-policy">
								Privacy Policy
							</Link>
						</NoteLine>
					</section>
				</section>
			</form>
		</>
	);
}

import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import _ from "lodash";
import AppContext from "../contexts/AppContext";
import FlashMessages from "./elements/FlashMessages";
import NoteLine from "./elements/NoteLine";
import ReCAPTCHA from "react-google-recaptcha";

class ContactPage extends Component {
	static contextType = AppContext;
	constructor(props) {
		super(props);
		this.requiredFields = ["name", "email", "reason", "message"];
		this.optionalFields = ["phone"];
		this.state = {
			submitted: false,
			contactReasons: [],
			validationErrors: {},
		};
		window.handleCaptchaResponse = this.handleCaptchaResponse;
	}

	componentDidMount() {
		fetch("/api/contactreasons")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ contactReasons: data });
			});
	}

	handleSubmitResponse(data) {
		this.context.setMessages({ errors: data.validationErrors });
		this.setState({
			validationErrors: data.validationErrors,
			submitted: data.success,
		});
	}

	renderSimpleInput(type, name, extraProps = {}) {
		return (
			<input
				type={type}
				name={name}
				className="form-control"
				{...extraProps}
			/>
		);
	}

	render() {
		return (
			<>
				<form method="post" id="contactForm" action="/api/contact">
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
										className={
											"form-group flex-group-wrapper"
										}
									>
										{this.renderSimpleInput("text", "name")}
									</div>
									<label>Name</label>
								</div>

								<div className="flex-group-item line">
									<div
										className={
											"form-group flex-group-wrapper"
										}
									>
										{this.renderSimpleInput(
											"text",
											"email"
										)}
									</div>
									<label>Email</label>
								</div>

								<div className="flex-group-item line">
									<div
										className={
											"form-group flex-group-wrapper"
										}
									>
										{this.renderSimpleInput(
											"text",
											"phone"
										)}
									</div>
									<label>Phone&nbsp; (Optional)</label>
								</div>

								<div className="flex-group-item line">
									<div
										className={
											"form-group flex-group-wrapper"
										}
									>
										<select
											name="reason"
											className="form-control"
											defaultValue="select reason"
										>
											<option disabled>
												select reason
											</option>
											{this.state.contactReasons.map(
												(reason) => (
													<option
														key={reason.value}
														value={reason.value}
													>
														{reason.label}
													</option>
												)
											)}
										</select>
									</div>
									<label>
										What are you contacting us about?
									</label>
								</div>

								<div className="flex-group-item line">
									<div
										className={
											"form-group flex-group-wrapper"
										}
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
							{/* <div
								className="g-recaptcha"
								data-sitekey={this.context.grecaptcha}
							></div> */}
							<ReCAPTCHA sitekey={this.context.grecaptcha} />
							<div className="submission-wrap">
								<input
									type="submit"
									className="button blue"
									value="Submit"
								/>
								<input
									type="reset"
									className="button reset"
									value="Reset Fields"
								/>
							</div>

							<NoteLine>
								By clicking Submit, you agree to our{" "}
								<Link to="pages/terms-of-use">
									Terms of Use
								</Link>
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
}

export default ContactPage;

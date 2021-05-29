import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import _ from "lodash";
import AppContext from "../contexts/AppContext";
import FlashMessages from "./elements/FlashMessages";

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
		this.form = React.createRef();
		window.handleCaptchaResponse = this.handleCaptchaResponse;
	}

	componentDidMount() {
		fetch("/api/contactreasons")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ contactReasons: data });
			});

		$(this.form.current).ajaxForm((data) => {
			this.handleSubmitResponse(data);
		});
	}

	handleSubmitResponse(data) {
		this.setState({
			validationErrors: data.validationErrors,
			submitted: data.success,
		});
	}

	renderSubmittedMessage() {
		return (
			<p>Thanks for getting in touch. We will respond to you shortly.</p>
		);
	}

	getFormClasses(fieldName) {
		const hasError =
			this.state.validationErrors[fieldName] != null &&
			this.requiredFields.indexOf(fieldName) !== -1;

		return `form-group ${hasError ? "has-error" : ""}`;
	}

	handleChange = (e) => {
		const validationErrors = Object.assign({}, this.state.validationErrors);
		delete validationErrors[e.target.name];
		this.setState({
			validationErrors,
		});
	};

	handleCaptchaResponse = () => {
		const validationErrors = Object.assign({}, this.state.validationErrors);
		delete validationErrors.captcha;
		this.setState({
			validationErrors,
		});
	};

	renderSimpleInput(type, name, extraProps = {}) {
		return (
			<input
				type={type}
				name={name}
				className="form-control"
				onChange={this.handleChange}
				{...extraProps}
			/>
		);
	}

	isButtonDisabled() {
		switch (Object.keys(this.state.validationErrors).length) {
			case 0:
				return false;
			case 1:
				return this.state.validationErrors === undefined;
			default:
				return true;
		}
	}

	renderForm() {
		return (
			<>
				<FlashMessages
					messages={{ errors: this.state.validationErrors }}
					errorHeaderText="The following fields have errors:"
				/>
				<div className="row contact-us">
					<div className="col-sm-8 col-md-8">
						<form
							method="post"
							ref={this.form}
							id="contactForm"
							action="/api/contact"
						>
							<div className={this.getFormClasses("name")}>
								<label>
									<span>Name</span>
									{this.renderSimpleInput("text", "name")}
								</label>
							</div>
							<div className={this.getFormClasses("email")}>
								<label>
									<span>Email</span>
									{this.renderSimpleInput("email", "email")}
								</label>
							</div>
							<div className={this.getFormClasses("phone")}>
								<label>
									<span>Phone</span>
									{this.renderSimpleInput("text", "phone", {
										placeholder: "(optional)",
									})}
								</label>
							</div>
							<div className={this.getFormClasses("reason")}>
								<label>
									<span>
										What are you contacting us about?
									</span>
									<select
										name="reason"
										className="form-control"
										defaultValue="(select reason)"
										onChange={this.handleChange}
									>
										<option disabled>
											(select reason)
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
								</label>
							</div>
							<div className={this.getFormClasses("message")}>
								<label>
									<span>Message</span>
									<textarea
										name="message"
										placeholder="Leave us a message..."
										rows="4"
										className="form-control"
										onChange={this.handleChange}
									></textarea>
								</label>
							</div>
							<div className="form-actions">
								<p>
									By clicking Submit below, you agree to our{" "}
									<Link to="pages/terms-of-use">
										Terms of Use
									</Link>{" "}
									and our{" "}
									<Link to="pages/privacy-policy">
										Privacy Policy
									</Link>
									.
								</p>
								<div
									className="g-recaptcha"
									data-sitekey={this.context.grecaptcha}
									data-callback="handleCaptchaResponse"
								></div>
								<button
									type="submit"
									className="btn btn-primary"
									disabled={this.isButtonDisabled()}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}

	render() {
		return (
			<>
				<Helmet>
					<script
						src="https://www.google.com/recaptcha/api.js"
						async
						defer
					></script>
				</Helmet>
				<div className="container">
					<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
						<h4 className="display-4" id="headerText">
							Test To set up an account to use the SWOT or if you
							have any questions, please contact us:
						</h4>
					</div>
				</div>
				<div className="container">
					{(this.state.submitted && this.renderSubmittedMessage()) ||
						this.renderForm()}
				</div>
			</>
		);
	}
}

export default ContactPage;

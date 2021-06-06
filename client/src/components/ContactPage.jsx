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
				<form method="post" ref={this.form} id="contactForm">
					<h1 className="content-title">Contact us</h1>
					<section className="content-window">
						<section>
							<FlashMessages
								messages={{ errors: this.state.validationErrors }}
								errorHeaderText="The following fields have errors:"
							/>
							<div className="content-description"><p>To set up an account to use the SWOT; <br />Or if you have any questions; <br />Please contact us:</p></div>
							<div className="flex-group">
								<div className="flex-group-item space">
									<div className={this.getFormClasses("name") + ' flex-group-wrapper'}>
										{this.renderSimpleInput("text", "name")}
									</div>
									<label>Name</label>
								</div>

								<div className="flex-group-item">
									<div className={this.getFormClasses("email") + ' flex-group-wrapper'}>
										{this.renderSimpleInput("text", "email")}
									</div>
									<label>Email</label>
								</div>

								<div className="flex-group-item line">
									<div className={this.getFormClasses("email") + ' flex-group-wrapper'}>
										{this.renderSimpleInput("text", "phone")}
									</div>
									<label>Phone&nbsp; (Optional)</label>
								</div>

								<div className="flex-group-item line">
									<div className={this.getFormClasses("reason") + ' flex-group-wrapper'}>
										<select
											name="reason"
											className="form-control"
											defaultValue="select reason"
											onChange={this.handleChange}
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
									<label>What are you contacting us about?</label>
								</div>

								<div className="flex-group-item line">
									<div className={this.getFormClasses("message") + ' flex-group-wrapper'}>
										<textarea
											name="message"
											placeholder=""
											rows="4"
											className="form-control"
											onChange={this.handleChange}
										></textarea>
									</div>
									<label>Message</label>
								</div>

							</div>
						</section>
					</section>

					<section className="content-window">
						<section>
							<div
								className="g-recaptcha"
								data-sitekey={this.context.grecaptcha}
								data-callback="handleCaptchaResponse"
							></div>
							<hr />
							<div className="submission-wrap">
								<input
									type="submit"
									className="button blue"
									value="Submit"
									disabled={this.isButtonDisabled()}
								/>
								<input
									type="reset"
									className="button reset"
									value="Reset Fields"
								/>
							</div>
							<div className="txt-icon notice txt-sm">
								<i><img src="assets/icons/notice.svg" alt="" /></i>
								<span>By clicking Submit, you agree to our <Link to="pages/terms-of-use">Terms of Use</Link>&nbsp;
								and our <Link to="pages/privacy-policy">Privacy Policy</Link>.</span>
							</div>
						</section>
					</section>

				</form>
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
				{(this.state.submitted && this.renderSubmittedMessage()) ||
					this.renderForm()}
			</>
		);
	}
}

export default ContactPage;

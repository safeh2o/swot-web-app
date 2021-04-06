import React, { Component } from "react";

class FlashMessages extends Component {
	constructor(props) {
		super(props);
	}

	numErrors() {
		if (!this.props.messages || !this.props.messages.errors) return 0;
		return Object.keys(this.props.messages.errors).length;
	}

	numNotices() {
		if (!this.props.messages || !this.props.messages.notices) return 0;
		return Object.keys(this.props.messages.notices).length;
	}

	renderNotices() {
		if (!this.numNotices()) {
			return null;
		}

		const notices = this.props.messages.notices;
		const noticeKeys = Object.keys(notices);

		return (
			<div className="container">
				<div className="alert alert-success">
					<ul>
						{noticeKeys.map((key) => (
							<li key={key}>{notices[key]}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	renderErrors() {
		if (!this.numErrors()) {
			return null;
		}

		const errors = _.chain(this.props.messages.errors)
			.mapValues("error")
			.values()
			.value();

		return (
			<div className="container">
				<div className="alert alert-danger">
					<h5>{this.props.errorHeaderText}</h5>

					<ul>
						{errors.map((err) => (
							<li key={err}>{err}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	render() {
		return (
			<>
				{this.renderNotices()}
				{this.renderErrors()}
			</>
		);
	}
}

FlashMessages.defaultProps = {
	errorHeaderText: "An error occurred while submitting this form:",
	messages: { errors: {}, notices: {} },
};

export default FlashMessages;

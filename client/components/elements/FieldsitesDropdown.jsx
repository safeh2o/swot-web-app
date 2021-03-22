import _ from "lodash";
import React, { Component } from "react";

class FieldsitesDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = { fieldsites: [], currentFieldsite: null };
		// TODO uncomment the following and its complements when a better error modal is implemented so user doesnt constantly get spammed
		// this.controller = new AbortController();
	}

	handleChange = (e) => {
		const { value } = e.target;
		const selection = _.find(
			this.state.fieldsites,
			(site) => site._id === value
		);
		const newFieldsite = this.parseMongoToIdName(selection);
		this.setState({ currentFieldsite: newFieldsite });
	};

	parseMongoToIdName = (modelObj) => ({
		id: modelObj._id,
		name: modelObj.name,
	});

	updateFieldsites = () => {
		fetch(
			"/api/user/fieldsites"
			// { signal: this.controller.signal }
		)
			.then((res) => res.json())
			.then((data) => {
				const { fieldsites } = data;
				this.setState({
					fieldsites,
					currentFieldsite: this.parseMongoToIdName(fieldsites[0]),
				});
				hideSpinner();
			})
			.catch((err) => {
				logError(err);
			});
	};

	componentDidMount() {
		this.updateFieldsites();
	}

	componentWillUnmount() {
		// this.controller.abort();
	}

	componentDidUpdate() {
		if (this.props.object) {
			this.props.object.fieldsite = this.state.currentFieldsite;
		}
	}

	render() {
		return (
			<select
				className="form-control"
				name={this.props.name || "fieldsite"}
				onChange={(e) => {
					this.handleChange(e);
				}}
			>
				{this.state.fieldsites.map((fieldsite) => (
					<option key={fieldsite._id} value={fieldsite._id}>
						{fieldsite.name}
					</option>
				))}
			</select>
		);
	}
}

export default FieldsitesDropdown;

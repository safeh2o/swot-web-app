import { Button } from "react-bootstrap";
import React, { Component } from "react";

class ManageBox extends Component {
	constructor() {
		super();
		this.state = {
			projects: [],
		};
	}

	componentDidMount() {
		// get projects by user
		fetch("/api/user/projects")
			.then((res) => res.json())
			.then((result) => {
				this.setState({ projects: result.projects });
			});
	}

	renderProjects() {
		if (this.state.projects.length === 0) return <p>No projects</p>;

		return (
			<ul>
				{this.state.projects.map((p) => (
					<li key={p._id}>{p.name}</li>
				))}
			</ul>
		);
	}

	render() {
		console.log(this.state.projects);
		return (
			<>
				<div>
					<h1>Projects</h1>
					{this.renderProjects()}
				</div>
			</>
		);
	}
}

export default ManageBox;

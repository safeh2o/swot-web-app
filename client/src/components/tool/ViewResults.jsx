import React, { Component } from "react";
import DataGrid from "../elements/DataGrid";

import { Helmet } from "react-helmet";

class ViewResults extends Component {
	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		hideSpinner();
	}

	render() {
		return (
			<>
				<Helmet>
					<link
						rel="stylesheet"
						href="//unpkg.com/bootstrap-table@1.15.3/dist/bootstrap-table.min.css"
					/>
				</Helmet>

				<h1 className="content-title">
					<span>Results</span>
				</h1>

				<section className="content-window">
					<header></header>
					<section
						style={{ height: 400, width: "100%", margin: 0 }}
					></section>
					<footer></footer>
				</section>
			</>
		);
	}
}

export default ViewResults;

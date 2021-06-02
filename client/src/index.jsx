import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

if (typeof window !== "undefined") {
	ReactDOM.render(
		<Router>
			<App />
		</Router>,
		document.getElementById("app")
	);
}

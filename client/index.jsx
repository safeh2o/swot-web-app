import React from "react";
import ReactDOM from "react-dom";
import AppContext from "./contexts/AppContext";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

if (typeof window !== "undefined") {
	const initialState = window.__INITIAL_STATE;
	ReactDOM.render(
		<AppContext.Provider value={initialState}>
			<Router>
				<App />
			</Router>
		</AppContext.Provider>,
		document.getElementById("app-container")
	);
}

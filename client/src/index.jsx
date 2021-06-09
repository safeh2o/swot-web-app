import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import AppContext from "./contexts/AppContext";

if (typeof window !== "undefined") {
	ReactDOM.render(
		<AppContext.Provider value={window.__INITIAL_STATE}>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</AppContext.Provider>,
		document.getElementById("app")
	);
}

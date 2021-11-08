import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store, persistor } from "./store";
import AppContext from "./contexts/AppContext";
import { PersistGate } from "redux-persist/integration/react";

if (typeof window !== "undefined") {
	ReactDOM.render(
		<AppContext.Provider value={window.__INITIAL_STATE}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<Router>
						<App />
					</Router>
				</PersistGate>
			</Provider>
		</AppContext.Provider>,
		document.getElementById("app")
	);
}

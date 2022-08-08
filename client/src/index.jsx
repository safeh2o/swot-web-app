import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./components/App";
import AppContext from "./contexts/AppContext";
import { persistor, store } from "./store";

if (typeof window !== "undefined") {
	const appContextInitialValue = window.__INITIAL_STATE;

	ReactDOM.render(
		<AppContext.Provider value={appContextInitialValue}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</AppContext.Provider>,
		document.getElementById("app")
	);
}

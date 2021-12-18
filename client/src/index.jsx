import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store";
import AppContext from "./contexts/AppContext";
import { PersistGate } from "redux-persist/integration/react";

// App Root Component
import App from "./components/App";

if (typeof window !== "undefined") {
	ReactDOM.render(
		<AppContext.Provider value={window.__INITIAL_STATE}>
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

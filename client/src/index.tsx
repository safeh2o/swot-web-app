import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import App from "./components/App";
import ScrollToTop from "./components/ScrollToTop";
import AppContext from "./contexts/AppContext";
import { persistor, store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

const appContextInitialValue = window.__INITIAL_STATE;

root.render(
	<AppContext.Provider value={appContextInitialValue}>
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<BrowserRouter>
					<ScrollToTop />
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</AppContext.Provider>
);

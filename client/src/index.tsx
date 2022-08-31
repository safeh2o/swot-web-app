import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./components/App";
import AppContext from "./contexts/AppContext";
// import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

const appContextInitialValue = (window as any).__INITIAL_STATE;

root.render(
	<AppContext.Provider value={appContextInitialValue}>
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</AppContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

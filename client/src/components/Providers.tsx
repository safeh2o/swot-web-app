import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppContext from "../contexts/AppContext.tsx";
import { persistor, store } from "../store.ts";
import theme from "../theme.ts";
import { ThemeProvider } from "@mui/material";

const appContextInitialValue = window.__INITIAL_STATE;

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AppContext.Provider value={appContextInitialValue}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<BrowserRouter>
						<ThemeProvider theme={theme}>{children}</ThemeProvider>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</AppContext.Provider>
	);
}

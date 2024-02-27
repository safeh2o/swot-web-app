import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import Providers from "./components/Providers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Providers>
			<App />
		</Providers>
	</React.StrictMode>
);

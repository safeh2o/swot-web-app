import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import DownloadPage from "./DownloadPage";
import LoginPage from "./LoginPage";
import UploadPage from "./UploadPage";
import AnalyzePage from "./AnalyzePage";
import ResultsPage from "./ResultsPage";
import CMSPage from "./CMSPage";
import ContactPage from "./ContactPage";
import PageWrapper from "./PageWrapper";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";
import AppContext from "../contexts/AppContext";
import { useEffect } from "react";

// import BlogDashboard from "./BlogDashboard";
// import BlogPage from "./BlogPage";

export default function App(props) {
	const [user, setUser] = useState(null);
	const [messages, setMessages] = useState({ errors: {}, notices: {} });
	const initialState = window.__INITIAL_STATE;

	const context = { ...initialState, messages };

	useEffect(() => {
		fetch("/api/user/me")
			.then((r) => r.json())
			.then((data) => {
				if (data !== null) setUser(data.user);
			});
	}, []);

	context.setMessages = (messages) => {
		setMessages(messages);
	};
	context.logoutUser = () => {
		setUser(null);
	};
	context.logInUser = (user) => {
		setUser(user);
	};
	return (
		<AppContext.Provider value={{ ...context, user }}>
			<PageWrapper>
				<Switch>
					<Route path="/download">
						<DownloadPage />
					</Route>
					<Route path="/upload">
						<UploadPage />
					</Route>
					<Route path="/analyze">
						<AnalyzePage />
					</Route>
					{/* 
					<Route path="/manage">
						<ManagePage />
					</Route> */}
					<Route path="/results">
						<ResultsPage />
					</Route>
					<Route path="/signin">
						<LoginPage />
					</Route>
					<Route path="/forgotpassword">
						<ForgotPasswordPage />
					</Route>
					<Route path="/contact">
						<ContactPage />
					</Route>
					<Route path="/pages/:slug">
						<CMSPage />
					</Route>
					<Route path="/resetpassword/:key">
						<ResetPasswordPage />
					</Route>
					{/* <Route exact path="/blog">
					<BlogDashboard />
				</Route>
				<Route path="/blog/:category">
					<BlogPage />
				</Route> */}
					<Route path="*">
						<Dashboard />
					</Route>
				</Switch>
			</PageWrapper>
		</AppContext.Provider>
	);
}

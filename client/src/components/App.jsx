// React Imports
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

// App + Content Pages
import AppContext from "../contexts/AppContext";
import PageWrapper from "./PageWrapper";
import Home from "./Home";
import Dashboard from "./Dashboard";
import ContactPage from "./ContactPage";

// Tool Imports
import CollectData from "./tool/CollectData";
import UploadData from "./tool/UploadData";
import SendForAnalysis from "./tool/SendForAnalysis";
import ViewResults from "./tool/ViewResults";
import Result from "./tool/Result";

// Admin Imports
import CMSPage from "./CMSPage";

// User Profile Imports
import ProfileLogin from "./profile/ProfileLogin";
import ProfileForgotPassword from "./profile/ProfileForgotPassword";
import ProfileResetPassword from "./profile/ProfileResetPassword";


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

	// Router Titles
	function RouteWithTitle({ title, ...props }) {
		return (
			<>
				<Helmet>
					<title>{title} - Safe Water Optimization Tool</title>
				</Helmet>
				<Route {...props} />
			</>
		)
	}

	// User Data
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

					{/* Home/Dashboard */}
					<Route exact={true} path="/"><Dashboard /></Route>

					{/* Tool */}
					<Route path="/collect"><CollectData /></Route>
					<Route path="/upload"><UploadData /></Route>
					<Route path="/analyze"><SendForAnalysis /></Route>
					<Route path="/results"><ViewResults /></Route>
					<Route path="/result/:slug"><Result /></Route>

					{/* Account */}
					<Route path="/signin"><ProfileLogin /></Route>
					<Route path="/forgotpassword"><ProfileForgotPassword /></Route>
					<Route path="/resetpassword/:key"><ProfileResetPassword /></Route>

					{/* Content */}
					{/* <Route path="/contact"><ContactPage /></Route> */}
					<RouteWithTitle
						title="Contact us"
						path="/contact"
						component={ContactPage}
						key={document.location.hostname + '/contact'}
					/>
					<Route path="/pages/:slug"><CMSPage /></Route>

					{/* 
						<Route exact path="/blog"><BlogDashboard /></Route>
						<Route path="/blog/:category"><BlogPage /></Route> 
					*/}

				</Switch>
			</PageWrapper>
		</AppContext.Provider>
	);
}
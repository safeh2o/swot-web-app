// React Imports
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

// App + Content Pages
import PageWrapper from "./PageWrapper";
import Home from "./Home";
import ContactPage from "./ContactPage";

// Tool Imports
import CollectData from "./tool/CollectData";
import UploadPage from "./tool/UploadPage";
import AnalyzePage from "./tool/AnalyzePage";
import ViewResults from "./tool/ViewResults";
import Result from "./tool/Result";

// Manage Imports
import FieldSites from "./manage/FieldSites";
import People from "./manage/People";

// Admin Imports
import CMSPage from "./CMSPage";

// User Profile Imports
import ProfileLogin from "./profile/ProfileLogin";
import ProfileForgotPassword from "./profile/ProfileForgotPassword";
import ProfileResetPassword from "./profile/ProfileResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelectors } from "../reducers/user";

// import BlogDashboard from "./BlogDashboard";
// import BlogPage from "./BlogPage";

export default function App(props) {
	const initialState = window.__INITIAL_STATE;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const context = { ...initialState };

	// Router Titles
	function RouteWithTitle({ title, ...props }) {
		return (
			<>
				<Helmet>
					<title>{title} - Safe Water Optimization Tool</title>
				</Helmet>
				<Route {...props} />
			</>
		);
	}

	// User Data
	return (
		<PageWrapper>
			<Switch>
				<Route exact={true} path="/">
					<Home />
				</Route>
				<Route path="/collect">
					<CollectData />
				</Route>
				<Route path="/upload">
					<UploadPage />
				</Route>
				<Route path="/analyze">
					<AnalyzePage />
				</Route>
				<Route path="/results">
					<ViewResults />
				</Route>
				<Route path="/result/:slug">
					<Result />
				</Route>

				<Route path="/fieldsites">
					<FieldSites />
				</Route>
				<Route path="/people">
					<People />
				</Route>

				<Route path="/signin">
					<ProfileLogin />
				</Route>
				<Route path="/forgotpassword">
					<ProfileForgotPassword />
				</Route>
				<Route path="/resetpassword/:key">
					<ProfileResetPassword />
				</Route>

				<RouteWithTitle
					title="Contact Us"
					path="/contact"
					component={ContactPage}
					key={document.location.hostname + "/contact"}
				/>
				<Route path="/pages/:slug">
					<CMSPage />
				</Route>

				{/* 
						<Route exact path="/blog"><BlogDashboard /></Route>
						<Route path="/blog/:category"><BlogPage /></Route> 
					*/}
			</Switch>
		</PageWrapper>
	);
}

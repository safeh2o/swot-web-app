// React Imports
import React from "react";
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
import Result from "./tool/Result";

// Manage Imports
import FieldSites from "./manage/FieldSites";
import People from "./manage/People";

// Admin Imports
import CMSPage from "./CMSPage";

import ProfileLogin from "./profile/ProfileLogin";
import ProfileForgotPassword from "./profile/ProfileForgotPassword";
import ProfileResetPassword from "./profile/ProfileResetPassword";
import { useDispatch } from "react-redux";
import { getUser } from "../reducers/user";
import ResultsPage from "./tool/ResultsPage";
import BlogPost from "./BlogPost";
import Blog from "./Blog";
import { getSettings } from "../reducers/settings";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

export default function App(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
		dispatch(getSettings());
	}, [dispatch]);

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
		<ThemeProvider theme={theme}>
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
					<Route path="/results/:datasetId">
						<Result />
					</Route>
					<Route path="/results">
						<ResultsPage />
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
					<Route path="/blog/:slug">
						<BlogPost />
					</Route>
					<Route path="/blog">
						<Blog />
					</Route>
				</Switch>
			</PageWrapper>
		</ThemeProvider>
	);
}

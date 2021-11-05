// React Imports
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
import Fieldsites from "./manage/Fieldsites";
import People from "./manage/People";

// Admin Imports
import CMSPage from "./CMSPage";

import ProfileLogin from "./profile/ProfileLogin";
import ProfileForgotPassword from "./profile/ProfileForgotPassword";
import ProfileResetPassword from "./profile/ProfileResetPassword";
import { useDispatch } from "react-redux";
import { getUser, userSelectors } from "../reducers/user";
import ResultsPage from "./tool/ResultsPage";
import BlogPost from "./BlogPost";
import Blog from "./Blog";
import { getSettings } from "../reducers/settings";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { useSelector } from "react-redux";

export default function App(props) {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);

	function PrivateRoute({ component: Component, ...routeProps }) {
		return (
			<Route
				{...routeProps}
				render={(props) => {
					return isLoggedIn === true ? (
						<Component {...props} />
					) : (
						<Redirect
							to={{
								pathname: "/signin",
								state: { from: props.location },
							}}
						/>
					);
				}}
			/>
		);
	}

	useEffect(() => {
		dispatch(getUser());
		dispatch(getSettings());
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<PageWrapper>
				<Switch>
					<Route exact={true} path="/">
						<Home />
					</Route>
					<Route path="/collect" component={CollectData} />
					<PrivateRoute path="/upload" component={UploadPage} />
					<PrivateRoute path="/analyze" component={AnalyzePage} />
					<PrivateRoute
						path="/results/:datasetId"
						component={Result}
					/>
					<PrivateRoute path="/results" component={ResultsPage} />
					<PrivateRoute path="/fieldsites" component={Fieldsites} />
					<PrivateRoute path="/people" component={People} />
					<Route path="/signin">
						<ProfileLogin />
					</Route>
					<Route path="/forgotpassword">
						<ProfileForgotPassword />
					</Route>
					<Route path="/resetpassword/:key">
						<ProfileResetPassword />
					</Route>
					<Route path="/contact">
						<ContactPage />
					</Route>
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

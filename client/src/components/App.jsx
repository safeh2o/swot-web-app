// React Imports
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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

	// function PrivateRoute({ component: Component, routeProps }) {
	// 	return (
	// 		<Route
	// 			{...routeProps}
	// 			render={(props) => {
	// 				return isLoggedIn === true ? (
	// 					<Component {...props} />
	// 				) : (
	// 					<Navigate
	// 						to={{
	// 							pathname: "/signin",
	// 							state: { from: props.location },
	// 						}}
	// 					/>
	// 				);
	// 			}}
	// 		/>
	// 	);
	// }
	function PrivateRoute() {
		return isLoggedIn === true ? <Outlet /> : <Navigate to={"/signin"} />;
	}

	useEffect(() => {
		dispatch(getUser());
		dispatch(getSettings());
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<PageWrapper>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/collect" element={<CollectData />} />
					<Route path="/upload" element={<PrivateRoute />}>
						<Route path="" element={<UploadPage />} />
					</Route>
					<Route path="/analyze" element={<PrivateRoute />}>
						<Route path="" element={<AnalyzePage />} />
					</Route>
					<Route path="/results" element={<PrivateRoute />}>
						<Route path="" element={<ResultsPage />} />
					</Route>
					<Route
						path="/results/:datasetId"
						element={<PrivateRoute />}
					>
						<Route path="" element={<Result />} />
					</Route>
					<Route path="/fieldsites" element={<PrivateRoute />}>
						<Route path="" element={<Fieldsites />} />
					</Route>
					<Route path="/people" element={<PrivateRoute />}>
						<Route path="" element={<People />} />
					</Route>
					<Route path="/signin" element={<ProfileLogin />} />
					<Route
						path="/forgotpassword"
						element={<ProfileForgotPassword />}
					/>
					<Route
						path="/resetpassword/:key"
						element={<ProfileResetPassword />}
					/>
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/pages/:slug" element={<CMSPage />} />
					<Route path="/blog/:slug" element={<BlogPost />} />
					<Route path="/blog" element={<Blog />} />
				</Routes>
			</PageWrapper>
		</ThemeProvider>
	);
}

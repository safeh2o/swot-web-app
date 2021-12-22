// React Imports
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// App Theme Styling
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

// App + Content Pages
import PageWrapper from "./PageWrapper";
import Home from "./Home";
import ContactPage from "./ContactPage";

// Management Imports
import Fieldsites from "./manage/Fieldsites";
import People from "./manage/People.jsx";

// Admin Imports
import CMSPage from "./CMSPage";

// Tool Imports
import CollectData from "./tool/CollectData";
import UploadPage from "./tool/UploadPage";
import AnalyzePage from "./tool/AnalyzePage";
import ResultsPage from "./tool/ResultsPage";
import Result from "./tool/Result";

// Admin Imports
import ProfileLogin from "./profile/ProfileLogin";
import ProfileForgotPassword from "./profile/ProfileForgotPassword";
import ProfileResetPassword from "./profile/ProfileResetPassword";

// Archival Imports
import BlogPost from "./BlogPost";
import Blog from "./Blog";

import { getUser } from "../reducers/user";
import { userSelectors } from "../reducers/user";
import { getSettings } from "../reducers/settings";

export default function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);

	function PrivateRoute() {
		return isLoggedIn === true ? <Outlet /> : <Navigate to={"/signin"} />;
	}

	function PublicRoute() {
		return isLoggedIn === false ? <Outlet /> : <Navigate to={"/home"} />;
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

					<Route path="/collect" element={<PrivateRoute />}>
						<Route path="" element={<CollectData />} />
					</Route>
					<Route path="/upload" element={<PrivateRoute />}>
						<Route path="" element={<UploadPage />} />
					</Route>
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

					<Route path="/signin" element={<PublicRoute />}>
						<Route path="" element={<ProfileLogin />} />
					</Route>

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

					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:slug" element={<BlogPost />} />
				</Routes>
			</PageWrapper>
		</ThemeProvider>
	);
}

// React Imports
// App Theme Styling
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { getUser, userSelectors } from "../reducers/user";
import theme from "../theme";
import Blog from "./Blog";
// Archival Imports
import BlogPost from "./BlogPost";
// Admin Imports
import CMSPage from "./CMSPage";
import ContactPage from "./ContactPage";
import Home from "./Home";
// App + Content Pages
import PageWrapper from "./PageWrapper";
import ProfileForgotPassword from "./profile/ProfileForgotPassword";
// Admin Imports
import ProfileLogin from "./profile/ProfileLogin";
import ProfileResetPassword from "./profile/ProfileResetPassword";
import AnalyzePage from "./tool/AnalyzePage";
// Tool Imports
import CollectData from "./tool/CollectData";
import Result from "./tool/Result";
import ResultsPage from "./tool/ResultsPage";
import UploadPage from "./tool/UploadPage";

export default function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);

	function PrivateRoute() {
		return isLoggedIn === true ? <Outlet /> : <Navigate to={"/signin"} />;
	}

	useEffect(() => {
		dispatch(getUser());
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

					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:slug" element={<BlogPost />} />
				</Routes>
			</PageWrapper>
		</ThemeProvider>
	);
}

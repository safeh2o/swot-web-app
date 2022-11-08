// React Imports
// App Theme Styling
import { ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { setLastSeenCommitSha, settingsSelectors } from "../reducers/settings";
import { getUser, userSelectors } from "../reducers/user";
import { persistor } from "../store";
import theme from "../theme";
import Blog from "./Blog";
// Archival Imports
import BlogPost from "./BlogPost";
// Admin Imports
import CMSPage from "./CMSPage";
import ContactPage from "./ContactPage";
import FAQ from "./FAQ";
import Home from "./Home";
import NotFound from "./NotFound";
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
import "../styles/site.scss";

export default function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const currentCommitSha = useContext(AppContext).currentCommitSha;
	const lastSeenCommitSha = useSelector(settingsSelectors.lastSeenCommitSha);
	if (currentCommitSha !== lastSeenCommitSha) {
		console.log("App was recently updated, refreshing state");
		persistor.purge();
		dispatch(setLastSeenCommitSha(currentCommitSha));
	}

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

					<Route path="/faq" element={<FAQ />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:slug" element={<BlogPost />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</PageWrapper>
		</ThemeProvider>
	);
}

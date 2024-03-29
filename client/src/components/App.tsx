import "../styles/site.scss";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { setLastSeenCommitSha, settingsSelectors } from "../reducers/settings";
import { getUser, getUserPermissions, userSelectors } from "../reducers/user";
import { persistor } from "../store";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import CMSPage from "./CMSPage";
import ContactPage from "./ContactPage";
import FAQ from "./FAQ";
import Home from "./Home";
import NotFound from "./NotFound";
import PageWrapper from "./PageWrapper";
import ProfileForgotPassword from "./profile/ProfileForgotPassword";
import ProfileLogin from "./profile/ProfileLogin";
import ProfileResetPassword from "./profile/ProfileResetPassword";
import AnalyzePage from "./tool/AnalyzePage";
import AreaForm from "./manage/AreaForm";
import CountryForm from "./manage/CountryForm";
import FieldsiteForm from "./manage/FieldsiteForm";
import ManageAreas from "./manage/ManageAreas";
import ManageCountries from "./manage/ManageCountries";
import ManageFieldsites from "./manage/ManageFieldsites";
import ManagePage from "./manage/ManagePage";
import CollectData from "./tool/CollectData";
import Result from "./tool/Result";
import ResultsPage from "./tool/ResultsPage";
import UploadPage from "./tool/UploadPage";

export default function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const currentCommitSha = useContext(AppContext).currentCommitSha;
	const lastSeenCommitSha = useSelector(settingsSelectors.lastSeenCommitSha);
	if (currentCommitSha !== lastSeenCommitSha) {
		console.log("App was recently updated, refreshing state");
		persistor
			.purge()
			.then(() => {
				dispatch(setLastSeenCommitSha(currentCommitSha));
			})
			.catch(() => {
				console.error("Failed to purge state");
			});
	}

	function PrivateRoute() {
		return isLoggedIn === true ? <Outlet /> : <Navigate to={"/signin"} />;
	}

	useEffect(() => {
		dispatch(getUser());
		dispatch(getUserPermissions());
	}, [dispatch]);

	return (
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
				<Route path="/manage" element={<PrivateRoute />}>
					<Route path="" element={<ManagePage />} />
				</Route>
				<Route path="/manage/countries" element={<PrivateRoute />}>
					<Route path="" element={<ManageCountries />}>
						<Route path=":countryId" element={<CountryForm />} />
					</Route>
				</Route>
				<Route path="/manage/areas" element={<PrivateRoute />}>
					<Route path="" element={<ManageAreas />}>
						<Route path=":areaId" element={<AreaForm />} />
					</Route>
				</Route>
				<Route path="/manage/fieldsites" element={<PrivateRoute />}>
					<Route path="" element={<ManageFieldsites />}>
						<Route path=":fieldsiteId" element={<FieldsiteForm />} />
					</Route>
				</Route>
				<Route path="/results/:datasetId" element={<PrivateRoute />}>
					<Route path="" element={<Result />} />
				</Route>

				<Route path="/signin" element={<ProfileLogin />} />

				<Route path="/forgotpassword" element={<ProfileForgotPassword />} />
				<Route path="/resetpassword/:key" element={<ProfileResetPassword />} />

				<Route path="/contact" element={<ContactPage />} />
				<Route path="/pages/:slug" element={<CMSPage />} />

				<Route path="/faq" element={<FAQ />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/blog/:slug" element={<BlogPost />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</PageWrapper>
	);
}

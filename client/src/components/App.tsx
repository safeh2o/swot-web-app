import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { setLastSeenCommitSha, settingsSelectors } from "../reducers/settings";
import { getUser, getUserPermissions, userSelectors } from "../reducers/user";
import { persistor } from "../store";
import "../styles/site.scss";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import CMSPage from "./CMSPage";
import ContactPage from "./ContactPage";
import FAQ from "./FAQ";
import Home from "./Home";
import NotFound from "./NotFound";
import PageWrapper from "./PageWrapper";
import AreaForm from "./manage/AreaForm";
import CountryForm from "./manage/CountryForm";
import FieldsiteForm from "./manage/FieldsiteForm";
import ManageAreas from "./manage/ManageAreas";
import ManageCountries from "./manage/ManageCountries";
import ManageFieldsites from "./manage/ManageFieldsites";
import ManagePage from "./manage/ManagePage";
import ProfileForgotPassword from "./profile/ProfileForgotPassword";
import ProfileLogin from "./profile/ProfileLogin";
import ProfileResetPassword from "./profile/ProfileResetPassword";
import AnalyzePage from "./tool/AnalyzePage";
import CollectData from "./tool/CollectData";
import Result from "./tool/Result";
import ResultsPage from "./tool/ResultsPage";
import UploadPage from "./tool/UploadPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	return isLoggedIn === true ? children : <Navigate to={`/signin?from=${location.pathname}`} />;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
	const [searchParams] = useSearchParams();
	const from = searchParams.get("from") ?? "/";

	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	return isLoggedIn === false ? children : <Navigate to={from} />;
}

export default function App() {
	const dispatch = useDispatch();
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

	useEffect(() => {
		dispatch(getUser());
		dispatch(getUserPermissions());
	}, [dispatch]);

	return (
		<PageWrapper>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/pages/:slug" element={<CMSPage />} />

				<Route path="/faq" element={<FAQ />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/blog/:slug" element={<BlogPost />} />

				{/* Private routes */}
				<Route
					path="/collect"
					element={
						<PrivateRoute>
							<CollectData />
						</PrivateRoute>
					}
				/>
				<Route
					path="/upload"
					element={
						<PrivateRoute>
							<UploadPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/analyze"
					element={
						<PrivateRoute>
							<AnalyzePage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/results"
					element={
						<PrivateRoute>
							<ResultsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/results/:datasetId"
					element={
						<PrivateRoute>
							<Result />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage"
					element={
						<PrivateRoute>
							<ManagePage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage/countries"
					element={
						<PrivateRoute>
							<ManageCountries />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage/countries/:countryId"
					element={
						<PrivateRoute>
							<CountryForm />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage/areas"
					element={
						<PrivateRoute>
							<ManageAreas />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage/areas/:areaId"
					element={
						<PrivateRoute>
							<AreaForm />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage/fieldsites"
					element={
						<PrivateRoute>
							<ManageFieldsites />
						</PrivateRoute>
					}
				/>
				<Route
					path="/manage/fieldsites/:fieldsiteId"
					element={
						<PrivateRoute>
							<FieldsiteForm />
						</PrivateRoute>
					}
				/>

				{/* Guest only routes */}
				<Route
					path="/signin"
					element={
						<GuestRoute>
							<ProfileLogin />
						</GuestRoute>
					}
				/>
				<Route
					path="/forgotpassword"
					element={
						<GuestRoute>
							<ProfileForgotPassword />
						</GuestRoute>
					}
				/>
				<Route
					path="/resetpassword/:key"
					element={
						<GuestRoute>
							<ProfileResetPassword />
						</GuestRoute>
					}
				/>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</PageWrapper>
	);
}

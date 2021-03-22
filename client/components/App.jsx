import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import DownloadPage from "./DownloadPage";
import LoginPage from "./LoginPage";
import UploadPage from "./UploadPage";
import AnalyzePage from "./AnalyzePage";
import ResultsPage from "./ResultsPage";
import CMSPage from "./CMSPage";
import ContactPage from "./ContactPage";
import PageWrapper from "./PageWrapper";
// import BlogDashboard from "./BlogDashboard";
// import BlogPage from "./BlogPage";

export default function App(props) {
	return (
		<PageWrapper>
			<Switch>
				<Route path="/download">
					<DownloadPage />
				</Route>
				<Route path="/upload">
					<UploadPage />
				</Route>
				<Route path="/analyze">
					<AnalyzePage />
				</Route>
				{/* 
					<Route path="/manage">
						<ManagePage />
					</Route> */}
				<Route path="/results">
					<ResultsPage />
				</Route>
				<Route path="/signin">
					<LoginPage />
				</Route>
				<Route path="/contact">
					<ContactPage />
				</Route>
				<Route path="/pages/:slug">
					<CMSPage />
				</Route>
				{/* <Route exact path="/blog">
					<BlogDashboard />
				</Route>
				<Route path="/blog/:category">
					<BlogPage />
				</Route> */}
				<Route path="*">
					<Dashboard />
				</Route>
			</Switch>
		</PageWrapper>
	);
}

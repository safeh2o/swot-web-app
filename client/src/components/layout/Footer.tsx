import { Box, Button } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IconGithub, IconTwitter, IconYoutube } from "../icons";
import AppContext from "../../contexts/AppContext";

const COOKIE_NAME = "cookie_consent";
const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

export default function Footer() {
	const cookieBannerRef = useRef<HTMLElement>(null);
	const appContext = useContext(AppContext);

	useEffect(() => {
		if (cookieBannerRef.current) {
			const userHasConsented = getCookie()?.toLowerCase() === "true";
			if (userHasConsented) {
				hideCookieBanner();
			}
		}
	}, [cookieBannerRef]);

	function hideCookieBanner() {
		if (cookieBannerRef.current?.style) {
			cookieBannerRef.current.style.display = "none";
		}
	}

	function acceptCookies() {
		const d = new Date();
		d.setTime(d.getTime() + TWO_WEEKS);
		const expires = "expires=" + d.toUTCString();
		document.cookie = COOKIE_NAME + "=true;" + expires + ";path=/";
		hideCookieBanner();
	}

	function rejectCookies() {
		window[`ga-disable-${appContext.gtag}`] = true;
		hideCookieBanner();
	}

	function getCookie() {
		const allCookies = document.cookie.split("; ");
		for (const cookieString of allCookies) {
			const firstEqual = cookieString.indexOf("=");
			if (cookieString.substring(0, firstEqual) === COOKIE_NAME) {
				return cookieString.substring(firstEqual + 1);
			}
		}

		return null;
	}

	return (
		<>
			<footer className="site-footer">
				<section className="rte">
					<h3 className="title">A free and open-source tool by</h3>
					<div className="logos">
						<a target="_blank" href="http://yorku.ca/" rel="noreferrer">
							<img
								src="/assets/organisations/YorkULogo_Full_Format.png"
								className="wide"
								alt=" logo"
								width="200"
								height="200"
							/>
						</a>
						<a target="_blank" href="http://dighr.yorku.ca/" rel="noreferrer">
							<img
								src="/assets/organisations/dighr_black_on_white.png"
								alt=" logo"
								width="200"
								height="200"
							/>
						</a>
						<a
							target="_blank"
							href="https://www.doctorswithoutborders.ca/"
							rel="noreferrer"
						>
							<img
								src="/assets/organisations/dwb_full.svg"
								alt=" logo"
								width="1600"
								height="466"
								className="wide"
							/>
						</a>
					</div>
				</section>
				<section className="rte">
					<h3 className="title">Follow Us</h3>
					<div className="social-networks">
						<a
							className="twitter"
							target="_blank"
							href="https://twitter.com/safeh2oapp"
							rel="noreferrer"
						>
							<IconTwitter />
						</a>
						<a
							className="youtube"
							target="_blank"
							href="https://youtube.com/@safeh2oapp"
							rel="noreferrer"
						>
							<IconYoutube />
						</a>
						<a
							className="github"
							target="_blank"
							href="https://github.com/safeh2o"
							rel="noreferrer"
						>
							<IconGithub />
						</a>
					</div>
				</section>
				<nav className="nav-legal">
					<span>&copy; {new Date().getFullYear()} Safe Water Optimization Tool</span>
					<span className="divider">|</span>
					<NavLink to="/pages/terms-of-use">Terms of Use</NavLink>
					<span className="divider">|</span>
					<NavLink to="/pages/privacy-notice">Privacy Notice</NavLink>
					<span className="divider">|</span>
					<NavLink to="/pages/cookie-notice">Cookie Notice</NavLink>
				</nav>
			</footer>
			<Box className="site-cookie-notice small" ref={cookieBannerRef}>
				<div className="wrap">
					<p>
						This website uses cookies.
						<br />
						To learn more, visit our{" "}
						<NavLink to="/pages/cookie-notice">Cookie Notice</NavLink>.
					</p>
					<span className="user-input">
						<Button className="needed" onClick={rejectCookies}>
							Accept Necessary
						</Button>
						<Button className="accept btn" onClick={acceptCookies}>
							Accept All
						</Button>
					</span>
				</div>
			</Box>
		</>
	);
}

import { Button } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import { IconYoutube, IconTwitter, IconLinkedin } from "../icons";

const COOKIE_NAME = "cookie_consent";
const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

export default function Footer() {
	const cookieBannerRef = useRef(null);
	const { gtag: gaMeasurementId } = useContext(AppContext);

	useEffect(() => {
		if (cookieBannerRef.current) {
			if (userHasConsented()) {
				hideCookieBanner();
			}
		}
	}, [cookieBannerRef]);

	function hideCookieBanner() {
		cookieBannerRef.current.style.display = "none";
	}

	function acceptCookies() {
		const d = new Date();
		d.setTime(d.getTime() + TWO_WEEKS);
		let expires = "expires=" + d.toUTCString();
		document.cookie = COOKIE_NAME + "=true;" + expires + ";path=/";
		hideCookieBanner();
	}

	function rejectCookies() {
		window[`ga-disable-${gaMeasurementId}`] = true;
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

	function userHasConsented() {
		const consentCookie = getCookie();
		return consentCookie?.toLowerCase() === "true";
	}

	return (
		<>
			<footer component={"section"} className="site-footer">
				<section className="rte">
					<h2>A free and open-source tool by</h2>
					<div className="logos">
						<a
							target="_blank"
							href="http://yorku.ca/"
							rel="noreferrer"
						>
							<img
								src="/assets/organisations/YorkULogo_DIGITAL_Ver_RGB_REV.png"
								alt=" logo"
								width="200"
								height="200"
							/>
						</a>
						<a
							target="_blank"
							href="http://dighr.yorku.ca/"
							rel="noreferrer"
						>
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
								src="/assets/organisations/dwb.svg"
								alt=" logo"
								width="1599.6"
								height="465.8"
								className="wide"
							/>
						</a>
					</div>
				</section>
				<section className="rte">
					<h2>Follow Us</h2>
					<div className="social-networks">
						<a
							className="linkedin"
							target="_blank"
							href="http://linkedin.com/"
							rel="noreferrer"
						>
							<IconLinkedin />
						</a>
						<a
							className="twitter"
							target="_blank"
							href="https://www.twitter.com/"
							rel="noreferrer"
						>
							<IconTwitter />
						</a>
						<a
							className="youtube"
							target="_blank"
							href="https://youtube.com/"
							rel="noreferrer"
						>
							<IconYoutube />
						</a>
					</div>
				</section>
				<section>
					<nav className="nav-legal">
						<span>
							&copy; {new Date().getFullYear()} Safe Water
							Optimization Tool
						</span>
						<span className="divider">|</span>
						<NavLink to="/pages/terms-of-use">Terms of Use</NavLink>
						<span className="divider">|</span>
						<NavLink to="/pages/privacy-policy">
							Privacy Policy
						</NavLink>
						<span className="divider">|</span>
						<NavLink to="/pages/cookie-policy">
							Cookie Policy
						</NavLink>
					</nav>
				</section>
			</footer>
			<div className="site-cookie-policy small" ref={cookieBannerRef}>
				<div className="wrap">
					<p>
						This website uses cookies.
						<br />
						To learn more, visit our{" "}
						<NavLink to="/pages/cookie-policy">
							Cookie Policy
						</NavLink>
						.
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
			</div>
		</>
	);
}

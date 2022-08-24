import { Button } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import { IconTwitter, IconYoutube, IconGithub } from "../icons";

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
					<h2>Follow Us</h2>
					<div className="social-networks">
						{/* <a
							className="linkedin"
							target="_blank"
							href="http://linkedin.com/"
							rel="noreferrer"
						>
							<IconLinkedin />
						</a> */}
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
							href="https://www.youtube.com/channel/UCAoYWw3iKSpFZspbMGhMq7g/videos"
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="192"
								height="192"
								fill="currentColor"
								viewBox="0 0 256 256"
							>
								<rect
									width="256"
									height="256"
									fill="none"
								></rect>
								<path d="M224,224a8,8,0,0,1-8,8,32.1,32.1,0,0,1-32-32v-8a16,16,0,0,0-16-16H156v40a16,16,0,0,0,16,16,8,8,0,0,1,0,16,32.1,32.1,0,0,1-32-32V176H116v40a32.1,32.1,0,0,1-32,32,8,8,0,0,1,0-16,16,16,0,0,0,16-16V176H88a16,16,0,0,0-16,16v8a32.1,32.1,0,0,1-32,32,8,8,0,0,1,0-16,16,16,0,0,0,16-16v-8a32.1,32.1,0,0,1,14.8-27A55.8,55.8,0,0,1,48,120v-8a58,58,0,0,1,7.7-28.3A59.9,59.9,0,0,1,61.1,36,7.8,7.8,0,0,1,68,32a59.7,59.7,0,0,1,48,24h24a59.7,59.7,0,0,1,48-24,7.8,7.8,0,0,1,6.9,4,59.9,59.9,0,0,1,5.4,47.7A58,58,0,0,1,208,112v8a55.8,55.8,0,0,1-22.8,45A32.1,32.1,0,0,1,200,192v8a16,16,0,0,0,16,16A8,8,0,0,1,224,224Z"></path>
							</svg>
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

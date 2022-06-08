import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { IconYoutube, IconTwitter, IconLinkedin } from "../icons";

export default function Footer() {
	return (
		<>
			<footer component={"section"} className="site-footer">
				<section>
					<h3 className="section-subtitle">
						A free and open-source tool by
					</h3>
					<div className="logos">
						<a
							target="_blank"
							href="http://yorku.ca/"
							rel="noreferrer"
						>
							<img
								src="assets/organisations/YorkULogo_DIGITAL_Ver_RGB_REV.png"
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
								src="assets/organisations/dighr_black_on_white.png"
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
								src="assets/organisations/dwb_compact.svg"
								alt=" logo"
								width="1599.6"
								height="465.8"
							/>
						</a>
					</div>
				</section>
				<section>
					<div className="section-subtitle">Follow Us</div>
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
			<div className="site-cookies medium">
				<div className="wrap">
					<p>
						This website uses cookies. To learn more, visit our{" "}
						<NavLink to="/pages/cookie-policy">
							Cookie Policy
						</NavLink>
						.
					</p>
					<span className="user-input">
						<Button className="needed">Accept Nessesary</Button>
						<Button className="accept btn">Accept All</Button>
					</span>
				</div>
			</div>
		</>
	);
}

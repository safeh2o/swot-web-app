import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {
	return (
		<>
			<footer className="mt-auto">
				<div className="container">
					<ul className="footer-links">
						<li>
							<Link to="/contact">Contact Us</Link>
						</li>
						<li>
							<Link to="/pages/how-it-works">How it Works</Link>
						</li>
						<li>
							<Link to="/pages/terms-of-use">Terms of Use</Link>
						</li>
						<li>
							<Link to="/pages/privacy-policy">
								Privacy Policy
							</Link>
						</li>
					</ul>
					<p className="text-right mt-1 mb-0">
						<small>
							Copyright &copy; {new Date().getFullYear()}
						</small>
					</p>
				</div>
			</footer>
		</>
	);
}

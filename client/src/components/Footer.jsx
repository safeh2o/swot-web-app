import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer(props) {
	return (
		<>
			<footer className="mt-auto">
				<div className="container">
					{/* <ul className="footer-links">
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
					</ul> */}
					<nav className="navbar navbar-expand-lg">
						{/* <ul className="footer-links"> */}
						<ul className="navbar-nav footer-links">
							<li>
								<NavLink
									className="nav-link link"
									to="/contact"
								>
									Contact Us
								</NavLink>
							</li>
							<li>
								<NavLink
									className="nav-link link"
									to="/pages/how-it-works"
								>
									How it Works
								</NavLink>
							</li>
							<li>
								<NavLink
									className="nav-link link"
									to="/pages/terms-of-use"
								>
									Terms of Use
								</NavLink>
							</li>
							<li>
								<NavLink
									className="nav-link link"
									to="/pages/privacy-policy"
								>
									Privacy Policy
								</NavLink>
							</li>
						</ul>
					</nav>
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

import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer(props) {
	return (
		<>
			<footer id="footer">
				{/* <nav>
					<NavLink to="/pages/how-it-works">
						<span>
							<h3 className="txt-condensed">How the Tool Works</h3>
							<p>In hac habitasse platea dictumst. Nullam fermentum hendrerit ultrices.</p>
						</span>
					</NavLink>
					<NavLink to="/contact">
						<span>
							<h3 className="txt-condensed">About the Project</h3>
							<p>Etiam id massa et lectus tincidunt accumsan quis nec eros.</p>
						</span>
					</NavLink>
					<NavLink to="/blog">
						<span>
							<h3 className="txt-condensed">News &amp; Updates</h3>
							<p>Integer aliquet augue viverra imperdiet dignissim.</p>
						</span>
					</NavLink>
				</nav> */}
				<div className="legal txt-sm">
					<NavLink to="/pages/terms-of-use"><span>Terms of Use</span></NavLink>
					<NavLink to="/pages/privacy-policy"><span>Privacy Policy</span></NavLink>
					<span className="txt-sm">Copyright &copy; {new Date().getFullYear()}</span>
				</div>
			</footer>
		</>
	);
}

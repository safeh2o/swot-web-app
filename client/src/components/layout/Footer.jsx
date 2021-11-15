import { NavLink } from "react-router-dom";

export default function Footer(props) {
	return (
		<>
			<footer id="footer">
				<div className="page-up"></div>
				<div className="content-window legal txt-sm">
					<NavLink to="/pages/terms-of-use">
						<span>Terms of Use</span>
					</NavLink>
					<NavLink to="/pages/privacy-policy">
						<span>Privacy Policy</span>
					</NavLink>
					<span className="txt-sm">
						Copyright &copy; {new Date().getFullYear()}
					</span>
				</div>
			</footer>
		</>
	);
}

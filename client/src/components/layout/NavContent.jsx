import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { NavContent as css } from "../../styles/styles";

export default function NavTools(props) {
	return (
		<Box sx={{ ...css }} {...props}>
			<a href="https://www.safeh2o.app/" target="_blank" rel="noreferrer">
				About
			</a>
			<NavLink
				className={({ isActive }) => (isActive ? "active" : undefined)}
				to="/blog"
			>
				News
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? "active" : undefined)}
				to="/support"
			>
				Support
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? "active" : undefined)}
				to="/contact"
			>
				Contact
			</NavLink>
		</Box>
	);
}

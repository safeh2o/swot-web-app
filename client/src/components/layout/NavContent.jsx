import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavTools() {
	const css = {
		display: { xs: "block", sm: "inline-block" },
		"& a": {
			display: { xs: "block", sm: "inline" },
			textAlign: "center",
			p: { xs: "4px", sm: 0 },
			"&.active": {
				textDecoration: "underline solid 1px",
			},
		},
	};

	return (
		<Box sx={{ ...css }}>
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

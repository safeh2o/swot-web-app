import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavTools() {
	const css = {
		display: { xs: "block", sm: "inline-block" },
		"& a": {
			display: { xs: "block", sm: "inline" },
			textAlign: "center",
			p: { xs: "4px", sm: 0 },
		},
	};

	return (
		<Box sx={{ ...css }}>
			<a href="https://www.safeh2o.app/" target="_blank" rel="noreferrer">
				About
			</a>
			<Link to="/blog">News</Link>
			<Link to="/support">Support</Link>
			<Link to="/contact">Contact</Link>
		</Box>
	);
}

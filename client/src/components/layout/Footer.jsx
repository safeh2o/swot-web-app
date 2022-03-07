import { Box, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

import { Header as css } from "../../styles/styles";

export default function Footer() {
	return (
		<>
			<Grid
				className="app-footer"
				container
				alignItems="center"
				typography="caption"
				sx={{ ...css }}
			>
				<Grid item xs={12}>
					<Box component="span">
						&copy; {new Date().getFullYear()} Safe Water
						Optimization Tool{" "}
					</Box>
					&nbsp;&mdash;&nbsp;
					<NavLink to="/pages/terms-of-use">
						<span>Terms of Use</span>
					</NavLink>
					&nbsp;&nbsp;/&nbsp;&nbsp;
					<NavLink to="/pages/privacy-policy">
						<span>Privacy Policy</span>
					</NavLink>
					&nbsp;&nbsp;/&nbsp;&nbsp;
					<NavLink to="/pages/cookie-policy">
						<span>Cookie Policy</span>
					</NavLink>
				</Grid>
			</Grid>
		</>
	);
}

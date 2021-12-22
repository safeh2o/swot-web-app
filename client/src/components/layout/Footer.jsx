import { Box, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Footer() {
	return (
		<>
			<Grid
				container
				alignItems="center"
				sx={{ ml: "auto", mr: "auto", mb: 3, maxWidth: 760 }}
			>
				<Grid item xs={12} sx={{ mb: 1 }}>
					<NavLink to="/pages/terms-of-use">
						<span>Terms of Use</span>
					</NavLink>
					&nbsp;&nbsp;
					<NavLink to="/pages/privacy-policy">
						<span>Privacy Policy</span>
					</NavLink>
				</Grid>
				<Grid item xs={12}>
					<Box component="span" className="txt-sm" alignSelf="center">
						&copy; Safe Water Optimization Tool{" "}
						{new Date().getFullYear()}
					</Box>
				</Grid>
			</Grid>
		</>
	);
}

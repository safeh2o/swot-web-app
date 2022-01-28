import { Box, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Footer() {
	return (
		<>
			<Grid
				container
				alignItems="center"
				typography="caption"
				sx={{
					pl: { xs: 2, md: 4 },
					pr: { xs: 2, md: 4 },
					mt: "auto",
					ml: "auto",
					mr: "auto",
					mb: 3,
				}}
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
				</Grid>
			</Grid>
		</>
	);
}

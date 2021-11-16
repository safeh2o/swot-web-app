import { Box, Container, Grid, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Footer(props) {
	return (
		<>
			<Container maxWidth="md">
				<Box className="content-window legal txt-sm">
					<Stack direction="column">
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center"
							spacing={3}
						>
							<Grid item xs="auto">
								<NavLink to="/pages/terms-of-use">
									<span>Terms of Use</span>
								</NavLink>
							</Grid>
							<Grid item xs="auto">
								<NavLink to="/pages/privacy-policy">
									<span>Privacy Policy</span>
								</NavLink>
							</Grid>
						</Grid>
						<Box
							component="span"
							className="txt-sm"
							alignSelf="center"
						>
							&copy; Safe Water Optimization Tool{" "}
							{new Date().getFullYear()}
						</Box>
					</Stack>
				</Box>
			</Container>
		</>
	);
}

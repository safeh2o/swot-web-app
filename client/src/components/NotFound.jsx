import { Grid, Link as MUILink, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<Grid
			container
			spacing={4}
			sx={{ my: { xs: 3, md: 6 }, p: { xs: 3, md: 3 } }}
			direction={"column"}
			textAlign="center"
			justifyContent="space-evenly"
			height="100%"
		>
			<Typography variant="h2" color="text.secondary">
				404 Page Not Found
			</Typography>
			<Grid container justifyContent="space-evenly">
				<Typography variant="h4">
					<MUILink
						color="inherit"
						onClick={() => {
							navigate(-1);
						}}
						href="#"
					>
						Back
					</MUILink>
				</Typography>
				<Typography variant="h4">
					<MUILink color="inherit" to="/" component={Link}>
						Home
					</MUILink>
				</Typography>
			</Grid>
		</Grid>
	);
}

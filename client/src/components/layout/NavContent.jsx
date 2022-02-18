import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userSelectors } from "../../reducers/user";
import { IconQuestionMark } from "../icons";

export default function NavTools() {
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);

	return (
		<>
			<Button href="https://www.safeh2o.app/" target="_blank">
				About
			</Button>
			<Button to="/blog" component={NavLink}>
				News
			</Button>
			<Button to="/support" component={NavLink}>
				Support
			</Button>
			<Button to="/contact" component={NavLink}>
				Contact
			</Button>
		</>
	);
}

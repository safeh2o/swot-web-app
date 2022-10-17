import PropTypes from "prop-types";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function LinkCard(props) {
	return (
		<Link
			component={RouterLink}
			to={props.href || "#"}
			underline="none"
			color="inherit"
		>
			<div className="card rte">
				<h2 className="title">{props.title}</h2>
				<div className="text">{props.children}</div>
			</div>
		</Link>
	);
}

LinkCard.propTypes = {
	title: PropTypes.string.isRequired,
	href: PropTypes.string,
	children: PropTypes.any,
};

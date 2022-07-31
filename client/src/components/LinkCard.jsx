import PropTypes from "prop-types";
import { Link, SvgIcon } from "@mui/material";
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
				<i>
					<SvgIcon
						xmlns="http://www.w3.org/2000/svg"
						width="40px"
						height="40px"
						fill="#000000"
						viewBox="0 0 256 256"
					>
						<path d="M221.7,133.7l-72,72A8.3,8.3,0,0,1,144,208a8.5,8.5,0,0,1-3.1-.6A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,4.9-7.4,8.4,8.4,0,0,1,8.8,1.7l72,72A8.1,8.1,0,0,1,221.7,133.7Z"></path>
					</SvgIcon>
				</i>
			</div>
		</Link>
	);
}

LinkCard.propTypes = {
	title: PropTypes.string.isRequired,
	href: PropTypes.string,
	children: PropTypes.any,
};

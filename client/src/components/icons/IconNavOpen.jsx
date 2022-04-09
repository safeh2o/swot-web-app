import { SvgIcon } from "@mui/material";

function IconNavOpen(props) {
	return (
		<SvgIcon viewBox="0 0 32 32" {...props}>
			<path
				fill="none"
				stroke="currentColor"
				strokeMiterlimit="10"
				strokeWidth="3"
				d="M6 7L26 7"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeMiterlimit="10"
				strokeWidth="3"
				d="M6 25L26 25"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeMiterlimit="10"
				strokeWidth="3"
				d="M6 16L26 16"
			></path>
			<path fill="none" d="M0 0H32V32H0z"></path>
		</SvgIcon>
	);
}

export default IconNavOpen;

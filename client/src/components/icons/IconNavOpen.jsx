import { SvgIcon } from "@mui/material";

function IconNavOpen(props) {
	return (
		<SvgIcon viewBox="0 0 32 32" {...props}>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeMiterlimit="10"
				d="M7 5.7h18M7 26.3h18M7 16h18"
			/>
			<path fill="none" d="M0 0h32v32H0V0z" />
		</SvgIcon>
	);
}

export default IconNavOpen;

import { SvgIcon } from "@mui/material";

function IconSignOut(props) {
	return (
		<SvgIcon viewBox="0 0 32 32" {...props}>
			<path fill="none" d="M0 0h32v32H0z" />
			<path
				fill="none"
				strokeWidth="2"
				stroke="currentColor"
				d="M21.8 10.8 27 16l-5.2 5.3M13 16h14M13 27H6c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h7"
			/>
		</SvgIcon>
	);
}

export default IconSignOut;

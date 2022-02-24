import { SvgIcon } from "@mui/material";

function IconSignIn(props) {
	return (
		<SvgIcon viewBox="0 0 256 256" {...props}>
			<path fill="none" d="M0 0h256v256H0z" />
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="20"
				d="m94 170 42-42-42-42M24 128h112M136 40h56a8 8 0 0 1 8 8v160a8 8 0 0 1-8 8h-56"
			/>
		</SvgIcon>
	);
}

export default IconSignIn;

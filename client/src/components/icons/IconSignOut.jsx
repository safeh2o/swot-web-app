import { SvgIcon } from "@mui/material";

function IconSignOut(props) {
	return (
		<SvgIcon viewBox="0 0 32 32" {...props}>
			<path fill="none" d="M0 0h32v32H0z" />
			<path
				fill="currentColor"
				d="M18.5 27c0 .8-.7 1.5-1.5 1.5H7c-1.4 0-2.5-1.1-2.5-2.5V6c0-1.4 1.1-2.5 2.5-2.5h10c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H7.5v19H17c.8 0 1.5.7 1.5 1.5zm10.2-11.7l-5-5c-.2-.2-.4-.3-.7-.3-.6 0-1 .4-1 1v3.5h-8c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h8V21c0 .3.1.5.3.7.4.4 1 .4 1.4 0l5-5c.4-.4.4-1 0-1.4z"
			></path>
		</SvgIcon>
	);
}

export default IconSignOut;

import { SvgIcon } from "@mui/material";
function IconQuestionMark(props) {
	return (
		<SvgIcon viewBox="0 0 32 32" {...props}>
			<path
				fill="currentColor"
				d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm.2 22.8c-1.1 0-1.9-.8-1.8-1.8 0-1 .8-1.8 1.8-1.8S18 22 18 23s-.8 1.8-1.8 1.8zm2.1-8.2c-.8.5-.8 1.3-.8 1.3l.2 1.5-3.1.3-.2-1.5c-.1-.9.3-2.8 2.1-4.1.5-.3 1.5-1.3 1.5-2.1 0-1-.9-1.8-2-1.8s-2 .8-2 1.8c0 .2.1.3.2.5l.3.4-2.9 1.3-.3-.4c-.3-.6-.3-1.2-.3-1.8 0-2.7 2.3-4.9 5.1-4.9s5.1 2.4 5.1 5c-.1 2.5-2.7 4.3-2.9 4.5z"
			/>
			<path fill="none" d="M0 0h32v32H0z" />
		</SvgIcon>
	);
}

export default IconQuestionMark;

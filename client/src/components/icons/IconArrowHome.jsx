import { SvgIcon } from "@mui/material";

function IconArrowHome(props) {
	return (
		<SvgIcon viewBox="0 0 256 256" {...props}>
			<rect width="256" height="256" fill="none"></rect>
			<line
				x1="216"
				y1="128"
				x2="40"
				y2="128"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="20"
			></line>
			<polyline
				points="112 56 40 128 112 200"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="20"
			></polyline>
		</SvgIcon>
	);
}

export default IconArrowHome;

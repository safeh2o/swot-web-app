import { SvgIcon } from "@mui/material";

function IconArrowBack(props) {
	return (
		<SvgIcon viewBox="0 0 256 256" {...props}>
			<rect width="256" height="256" fill="none"></rect>
			<polyline
				points="160 208 80 128 160 48"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="16"
			></polyline>
		</SvgIcon>
	);
}

export default IconArrowBack;

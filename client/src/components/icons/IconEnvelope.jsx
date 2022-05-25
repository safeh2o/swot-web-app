import { SvgIcon } from "@mui/material";
function IconEnvelope(props) {
	return (
		<SvgIcon viewBox="0 0 256 256" {...props}>
			<path fill="none" d="M0 0h256v256H0z" />
			<path
				d="M32 56h192v136a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V56h0Z"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="18"
			/>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="18"
				d="m224 56-96 88-96-88"
			/>
		</SvgIcon>
	);
}

export default IconEnvelope;

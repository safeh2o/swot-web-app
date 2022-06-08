import { SvgIcon } from "@mui/material";

function IconProfile(props) {
	return (
		<SvgIcon viewBox="0 0 32 32" {...props}>
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeMiterlimit="10"
				d="M16 3C8.8 3 3 8.8 3 16c0 3.1 1.1 6 3 8.3.9 1.1 2.1 2.1 3.4 2.9 2 1.1 4.2 1.6 6.7 1.6 2.4 0 4.6-.5 6.5-1.5 1.3-.8 2.5-1.7 3.5-2.9 1.9-2.3 3.1-5.2 3.1-8.4C29 8.8 23.2 3 16 3z"
			/>
			<path
				fill="currentColor"
				d="M16 3C8.8 3 3 8.8 3 16c0 3.1 1.1 6 3 8.3 1.6-2.5 4.2-4.3 7.4-4.3h5c3.3 0 6 1.8 7.5 4.4 1.9-2.3 3.1-5.2 3.1-8.4 0-7.2-5.8-13-13-13zm-.5 12.7c-2 .2-4-2-4-4.7s1.9-4.7 4-4.7c2.3 0 4 2.2 4 4.7 0 2.7-1.8 4.7-4 4.7z"
			/>
		</SvgIcon>
	);
}

export default IconProfile;

import { SvgIcon } from "@mui/material";
function IconToolUpload(props) {
	return (
		<SvgIcon viewBox="0 0 32 32" {...props}>
			<path
				fill="currentColor"
				d="M25.2 11.6c.1-1-.1-2.1-.4-3.1-.9-3.2-3.7-5.7-7-6.3-4.8-1-9.2 1.9-10.5 6.1-.4 1.1-1.1 2-2.1 2.6C2.1 12.5.6 15.8.3 19.5c-.4 4.3 3.9 8.1 9.5 8.7h.8l12.2-.1h1.5c3.9 0 7.3-3 7.5-6.9.1-3.3-2-6.2-5-7.2-1.1-.2-1.7-1.3-1.6-2.4z"
			/>
			<path
				// fill="#ff89b2"
				className="accent"
				d="m22 25-6-10.4L10 25h4.5v7h3v-7z"
			/>
		</SvgIcon>
	);
}

export default IconToolUpload;

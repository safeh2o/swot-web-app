import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {
	IconAsterisk,
	IconCheck,
	IconImportant,
	IconInformation,
	IconQuestionMark,
} from "../icons";

function NotificationLine(props) {
	const css = {
		display: "flex",
		alignItems: "flex-start",
		color: "#999",
		padding: "8px 4px 24px",
		typography: "caption",
		"& > svg": {
			flex: "0 0 24px",
			fontSize: "inherit",
			color:
				props.type === "guide"
					? "#FFD75C"
					: props.type === "check"
					? "#34d379"
					: "inherit",
			width: "24px",
			height: "24px",
		},
		"& > div": {
			alignSelf: "center",
			fontSize: "inherit",
			padding: "1px 15px 0 10px",
			maxWidth: "55ch",
		},
		//  resets
		"& a": {
			color: "inherit",
		},
		"& p": {
			marginTop: 0,
			marginBottom: ".5em",
		},
	};

	return (
		<Typography
			component="div"
			variant="caption"
			mx={{ ...css }}
			{...props}
			className="notification"
		>
			{props.type === "guide" && <IconQuestionMark />}
			{props.type === "tip" && <IconInformation />}
			{props.type === "notice" && <IconImportant />}
			{props.type === "footnote" && <IconAsterisk />}
			{props.type === "check" && <IconCheck />}
			<Box component="div">{props.children}</Box>
		</Typography>
	);
}

NotificationLine.propTypes = {
	children: PropTypes.any,
	type: PropTypes.string,
};

export default NotificationLine;

import { Box } from "@mui/material";
import PropTypes from "prop-types";
import {
	IconAsterisk,
	IconCheck,
	IconImportant,
	IconInformation,
	IconQuestionMark,
} from "../icons";

function NotificationLine(props) {
	return (
		<Box
			component="div"
			{...props}
			className={"notification small " + props.type}
		>
			{props.type === "guide" && <IconQuestionMark />}
			{props.type === "tip" && <IconInformation />}
			{props.type === "notice" && <IconImportant />}
			{props.type === "footnote" && <IconAsterisk />}
			{props.type === "check" && <IconCheck />}
			<Box component="div">{props.children}</Box>
		</Box>
	);
}

NotificationLine.propTypes = {
	children: PropTypes.any,
	type: PropTypes.string,
};

export default NotificationLine;

import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {
	IconAsterisk,
	IconCheck,
	IconImportant,
	IconInformation,
	IconQuestionMark,
} from "../icons";

import { NotificationLine as css } from "../../styles/styles";

function NotificationLine(props) {
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

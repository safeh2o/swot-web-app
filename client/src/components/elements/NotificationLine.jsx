import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {
	IconAsterisk,
	IconCheck,
	IconImportant,
	IconInformation,
	IconQuestionMark,
} from "../icons";

import { NotificationLineCreator } from "../../styles/styles";

function NotificationLine(props) {
	const css = NotificationLineCreator(props);
	return (
		<Typography
			component="div"
			variant="caption"
			sx={{ ...css }}
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

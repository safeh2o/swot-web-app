import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

function NotificationLineIcons(type) {
	const mapping = {
		guide: "?",
		tip: "i",
		notice: "!",
		footnote: "*",
		check: "✔",
	};

	return mapping[type];
}

function NotificationLine(props) {
	const iconElement = (
		<span className="icon">
			<span>{NotificationLineIcons(props.type)}</span>
		</span>
	);

	return (
		<Box
			component="div"
			{...props}
			className={"notification small " + props?.orientation}
		>
			{props?.tip?.context !== "icon" && iconElement}
			<Tooltip
				title={props.tip?.content || ""}
				arrow
				placement="top"
				leaveDelay={500}
				enterDelay={300}
				leaveTouchDelay={500}
			>
				{props?.tip?.context === "icon" ? (
					iconElement
				) : (
					<span>{props?.children}</span>
				)}
			</Tooltip>
			{props?.tip?.context === "icon" && <span>{props?.children}</span>}
		</Box>
	);
}

NotificationLine.propTypes = {
	children: PropTypes.any,
	type: PropTypes.string,
	orientation: PropTypes.string,
	tip: PropTypes.shape({
		content: PropTypes.element,
		context: PropTypes.string,
	}),
};

export default NotificationLine;

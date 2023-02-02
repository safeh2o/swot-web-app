import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

type NotificationIconType = "guide" | "tip" | "notice" | "footnote" | "check";

function NotificationLineIcons(type: NotificationIconType) {
	const mapping = {
		guide: "?",
		tip: "i",
		notice: "!",
		footnote: "*",
		check: "✔",
	};

	return mapping[type];
}

function NotificationLine(props: {
	type: NotificationIconType;
	orientation?: string;
	tip?: {
		content: React.ReactElement | string;
		context?: "icon" | "children";
	};
	children?: React.ReactElement | string;
}) {
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

export default NotificationLine;

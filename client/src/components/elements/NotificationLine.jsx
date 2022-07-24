import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

function NotificationLineIcons(type) {
	return (
		<>
			{type === "guide" && "?"}
			{type === "tip" && "i"}
			{type === "notice" && "!"}
			{type === "footnote" && "*"}
			{type === "check" && "✔"}
		</>
	);
}

function NotificationLine(props) {
	console.log(props.type, props.tip?.context);
	return (
		<Box
			component="div"
			{...props}
			className={"notification small " + props.orientation}
		>
			{(props.tip?.content && props.tip?.context === "icon" && (
				<>
					<Tooltip
						title={<>{props.tip?.content}</>}
						arrow
						placement="top"
						leaveDelay={500}
						enterDelay={300}
						leaveTouchDelay={500}
					>
						<>
							<span className="icon">
								<span>{NotificationLineIcons(props.type)}</span>
							</span>
						</>
					</Tooltip>
				</>
			)) || (
				<>
					<span className="icon">
						<span>{NotificationLineIcons(props.type)}</span>
					</span>
				</>
			)}

			<Box component="div">
				{(props.tip?.content && (
					<>
						<Tooltip
							title={<>{props.tip?.content}</>}
							arrow
							placement="top"
							leaveDelay={500}
							enterDelay={300}
							leaveTouchDelay={500}
						>
							{props.children}
						</Tooltip>
					</>
				)) || <>{props.children}</>}
			</Box>
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

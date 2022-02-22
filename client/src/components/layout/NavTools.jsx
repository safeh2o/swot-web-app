import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
// Icons
import {
	IconToolAnalyze,
	IconToolCollect,
	IconToolResult,
	IconToolUpload,
} from "../icons";

const css = {
	display: "block",
	textUnderlinePosition: "under",
	backgroundColor: "#fff",
	borderRadius: "3px",
	boxShadow: "none",
	border: {
		xs: "1px solid rgba(0, 0, 0, 0.05)",
		sm: "1px solid transparent",
	},
	p: { xs: 1, sm: 0 },
	m: { xs: "0 0 12px", sm: "0 0 10px 0" },
	transition: "box-shadow 0s ease, background-color 0s ease",
	"&:before": {
		display: { xs: "none", sm: "flex" },
		content: '"step " attr(step)',
		position: "absolute",
		top: "10px",
		left: "10px",
		fontSize: "0.7rem",
		fontWeight: "400",
		textAlign: "center",
		color: "#929EAC",
		lineHeight: "1",
		textTransform: "Capitalize",
	},
	"& *": {
		pointerEvents: "none",
	},
	"& .MuiTouchRipple-child": {
		backgroundColor: "rgba(67, 105, 172, 0.3)",
	},
	//
	"&.active": {
		color: "#fff",
		backgroundColor: "primary.main",
		pointerEvents: "none",
		textDecoration: "underline dotted",
		textUnderlineOffset: 0,
		"& .gray": {
			fill: "#929eac",
		},
		"&:after": {
			color: "#fff",
			backgroundColor: "#4a77c6",
		},
	},
	"&:not(.active):hover": {
		backgroundColor: "#f7f8f9",
		borderColor: "rgba(0, 0, 0, 0.1)",
	},
	//
	wrap: {
		position: "relative",
		display: "block",
		flexBasis: "100%",
	},
	//
	icon: {
		display: { xs: "none", sm: "flex" },
		height: "relative",
		p: 0,
		"& > svg": {
			width: "3rem",
			height: "3rem",
			margin: "20px auto 0px",
		},
	},
	//
	label: {
		display: "block",
		fontFamily: '"Roboto Condensed", sans-serif',
		fontSize: "1.1rem",
		lineHeight: "2",
		letterSpacing: "-0.005em",
		textAlign: "center",
		textTransform: "capitalize",
		textOverflow: "ellipsis",
		color: "inherit",
		overflow: "hidden",
		transition: "color 0.3s ease",
	},
};

export default function NavTools() {
	const list = [
		{
			class: "",
			to: "/collect",
			label: "Collect Data",
			icon: <IconToolCollect />,
		},
		{
			class: "",
			to: "/upload",
			label: "Upload Data",
			icon: <IconToolUpload />,
		},
		{
			class: "",
			to: "/analyze",
			label: "Send for Analysis",
			icon: <IconToolAnalyze />,
		},
		{
			class: "",
			to: "/results",
			label: "View Results",
			icon: <IconToolResult />,
		},
	];

	return (
		<>
			{list.map((listitem, index) => (
				<Button
					component={NavLink}
					className={listitem.class}
					to={listitem.to}
					key={listitem.label}
					LinkComponent={"a"}
					sx={{ ...css }}
					disableRipple={true}
					step={index + 1}
				>
					<Box component="span" sx={{ ...css.wrap }}>
						{listitem.icon && (
							<Box component="span" sx={{ ...css.icon }}>
								{listitem.icon}
							</Box>
						)}
						<Typography component="span" sx={{ ...css.label }}>
							{listitem.label}
						</Typography>
					</Box>
				</Button>
			))}
		</>
	);
}

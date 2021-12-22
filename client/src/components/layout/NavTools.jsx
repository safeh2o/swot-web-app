import { Button, Box, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";

// Icons
import {
	IconToolCollect,
	IconToolUpload,
	IconToolAnalyze,
	IconToolResult,
} from "../icons";

const css = {
	display: "block",
	textUnderlinePosition: "under",
	color: "#17191a",
	backgroundColor: "#fff",
	borderRadius: "4px",
	boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.075)",
	p: 0,
	marginBottom: "10px",
	transition: "box-shadow 0s ease, background-color 0s ease",
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
		boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.5)",
		"& .gray": {
			fill: "#929eac",
		},
	},
	"&:not(.active):hover": {
		backgroundColor: "#dfdfdf",
	},
	//
	wrap: {
		position: "relative",
		display: "block",
		flexBasis: "100%",
	},
	//
	icon: {
		display: "flex",
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
		lineHeight: "50px",
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

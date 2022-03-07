import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
// Icons
import {
	IconToolAnalyze,
	IconToolCollect,
	IconToolResult,
	IconToolUpload,
} from "../icons";

import { NavTools as css } from "../../styles/styles";

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

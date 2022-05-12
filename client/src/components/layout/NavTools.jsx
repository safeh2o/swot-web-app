import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import useHashParams from "../../hooks/useHashParams";
import { NavTools as css } from "../../styles/styles";
// Icons
import {
	IconToolAnalyze,
	IconToolCollect,
	IconToolResult,
	IconToolUpload,
} from "../icons";

export default function NavTools() {
	const [hashParams] = useHashParams();
	const locationSuffix = hashParams.get("country")
		? "#" + hashParams.toString()
		: "";

	const list = [
		{
			class: "",
			to: "/collect",
			label: "Collect Data",
			icon: <IconToolCollect />,
		},
		{
			class: "",
			to: `/upload${locationSuffix}`,
			label: "Upload Data",
			icon: <IconToolUpload />,
		},
		{
			class: "",
			to: `/analyze${locationSuffix}`,
			label: "Send for Analysis",
			icon: <IconToolAnalyze />,
		},
		{
			class: "",
			to: `/results${locationSuffix}`,
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

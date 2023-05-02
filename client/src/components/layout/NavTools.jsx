import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import useHashParams from "../../hooks/useHashParams";
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
				<NavLink
					className={listitem.class}
					to={listitem.to}
					key={listitem.label}
					step={index + 1}
					end
				>
					<Box component="span" className="wrap">
						<Box component="span" className="icon">
							{listitem.icon}
						</Box>
						<Box component="span" className="label">
							{listitem.label}
						</Box>
					</Box>
				</NavLink>
			))}
		</>
	);
}

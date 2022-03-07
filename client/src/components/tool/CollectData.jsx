import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pushView } from "../../reducers/view";
import { CollectData as css } from "../../styles/styles";

export default function CollectData() {
	const urlFieldGuide =
		"https://gitcdn.link/cdn/safeh2o/swot-web-assets/master/SWOT_Field_Data_Protocol_Sep2020.pdf";
	const urlDataInputTemplate =
		"https://github.com/safeh2o/swot-web-assets/blob/master/DataInputTemplate_ver2.0.xlsx?raw=true";
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(pushView({ title: "Collect", path: "/collect" }));
	}, []);

	return (
		<>
			<Card sx={{ ...css.cardElement, ...css.uploadLocation }}>
				<CardHeader
					title={"Guide to Collect Data"}
					titleTypographyProps={{ variant: "h2", fontWeight: "400" }}
				/>

				<Divider />

				<CardContent>
					<Typography>
						We have provided a handy field guide to help set up a
						good data collection process at your campsite, and
						already got a data input template file available for
						download too.
					</Typography>
				</CardContent>
			</Card>

			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				a. Guides
			</Typography>
			<Card sx={{ ...css.cardElement, ...css.uploadLocation }}>
				<CardContent>
					<Typography variant="h3">Get Started Guide</Typography>
				</CardContent>
				<Divider />
				<CardContent>
					<Typography variant="h3">
						Field Data Collection Protocol
					</Typography>
				</CardContent>
				<Divider />
			</Card>

			<Typography
				component={"h1"}
				variant="body1"
				sx={{ ...css.sectionHeader }}
			>
				b. Data Collection Templates
			</Typography>
			<Card sx={{ ...css.cardElement, ...css.uploadLocation }}>
				<CardContent>
					<Typography variant="h3">Pen and Paper</Typography>
				</CardContent>
				<Divider />
				<CardContent>
					<Typography variant="h3">
						Monitoring Forms (KOBO)
					</Typography>
				</CardContent>
				<Divider />
			</Card>
		</>
	);
}

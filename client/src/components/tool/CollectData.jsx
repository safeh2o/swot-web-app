import {
	Box,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CollectData() {
	const urlFieldGuide =
		"https://gitcdn.link/cdn/safeh2o/swot-web-assets/master/SWOT_Field_Data_Protocol_Sep2020.pdf";
	const urlDataInputTemplate =
		"https://github.com/safeh2o/swot-web-assets/blob/master/DataInputTemplate_ver2.0.xlsx?raw=true";

	return (
		<>
			<section>
				<div className="section-wrap">
					<Box component="form" className="app-card rte">
						<Box component={"h1"} className="section-subtitle">
							Collecting Data
						</Box>

						<Divider sx={{ my: 1 }} />

						<Box component={"h2"}>Forms</Box>

						<Box component={"ul"}>
							<Box component={"li"}>
								<Box
									component={"figure"}
									className="image"
								></Box>
								<Box className="content">
									<a href={urlFieldGuide}>Field Protocol</a>
								</Box>
							</Box>
							<Box component={"li"}>
								<Box
									component={"figure"}
									className="image"
								></Box>
								<Box className="content">
									KOBO Monitoring Forms
								</Box>
							</Box>
							<Box component={"li"}>
								<Box
									component={"figure"}
									className="image"
								></Box>
								<Box className="content">
									Pen and Paper Forms
								</Box>
							</Box>
						</Box>

						<Divider sx={{ my: 1 }} />

						<Box component={"h2"}>Guides</Box>

						<Box component={"article"}>
							<Box component={"figure"} className="image"></Box>
							<Box className="content">
								How to Collect Data (Video)
							</Box>
						</Box>

						<Box component={"article"}>
							<Box component={"figure"} className="image"></Box>
							<Box className="content">QuickStart Guide</Box>
						</Box>

						<Divider sx={{ my: 1 }} />

						<Box component={"h2"}>Demo Datasets</Box>

						<Box component={"ul"}>
							<Box component={"li"}>
								<Box
									component={"figure"}
									className="image"
								></Box>
								<Box className="content">
									<a href={urlDataInputTemplate}>
										Microsoft XLS
									</a>
								</Box>
							</Box>
						</Box>

						<Divider sx={{ my: 1 }} />
					</Box>
					{/*  */}
					<Box component="form" className="app-card rte">
						<Box component={"h2"}>Frequently Asked Questions</Box>

						<Box>
							<Accordion className="content">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									What equipment do we need to use in the
									field for data collection?
								</AccordionSummary>
								<Divider />
								<AccordionDetails>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Curabitur et viverra arcu.
									Vestibulum ante ipsum primis in faucibus
									orci luctus et ultrices posuere cubilia
									curae; Sed quis tristique neque. Morbi
									blandit quis massa vitae molestie.
								</AccordionDetails>
							</Accordion>
							<Accordion className="content">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									How many measurements do we need to take to
									get an analysis from the SWOT?
								</AccordionSummary>
								<Divider />
								<AccordionDetails>
									In luctus risus ex, id blandit mi tincidunt
									sed. Donec sollicitudin rutrum nulla id
									ultrices. Suspendisse sollicitudin augue
									nisl, at porta nisl ultrices in.
								</AccordionDetails>
							</Accordion>
							<Accordion className="content">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									What human resources are required for the
									SWOT?
								</AccordionSummary>
								<Divider />
								<AccordionDetails>
									Nullam eleifend tincidunt fringilla.
									Curabitur semper ante sit amet dolor
									efficitur placerat a eget turpis. Proin non
									convallis felis. Etiam mi mauris, imperdiet
									ut nisi non, placerat molestie est.
								</AccordionDetails>
							</Accordion>
							<Accordion className="content">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									Who do we contact if we have a problem with
									data entry?
								</AccordionSummary>
								<Divider />
								<AccordionDetails>
									Nullam eleifend tincidunt fringilla.
									Curabitur semper ante sit amet dolor
									efficitur placerat a eget turpis. Proin non
									convallis felis. Etiam mi mauris, imperdiet
									ut nisi non, placerat molestie est.
								</AccordionDetails>
							</Accordion>
						</Box>
					</Box>
				</div>
			</section>
		</>
	);
}

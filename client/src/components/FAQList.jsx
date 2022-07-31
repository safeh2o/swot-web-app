import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Skeleton,
} from "@mui/material";
import _ from "lodash";
import { useSelector } from "react-redux";
import { blogSelectors } from "../reducers/blog";

export default function FAQList(props) {
	const { FAQs } = props;
	const isLoading = useSelector(blogSelectors.isLoading);

	function FAQSkeleton(numFAQs) {
		const sampleFAQ = {
			title: "Stepping Up: Sanitation specialist develops system",
			content:
				"This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership.",
		};

		return _.times(numFAQs, (i) => (
			<article key={i}>
				<div className="details-FAQ">
					<Skeleton>
						<h1 className="FAQ-title">{sampleFAQ.title}</h1>
					</Skeleton>
					<Skeleton width="100%">
						<div className="FAQ-text">{sampleFAQ.content}</div>
					</Skeleton>
					<hr />
				</div>
			</article>
		));
	}

	return isLoading
		? FAQSkeleton(5)
		: FAQs.map((FAQ, i) => (
				<article key={i}>
					<Box className="details-FAQ">
						<Accordion>
							<AccordionSummary>
								<h1 className="FAQ-title">{FAQ.title}</h1>
							</AccordionSummary>
							<AccordionDetails>
								<div className="FAQ-text">{FAQ.content}</div>
							</AccordionDetails>
						</Accordion>

						<hr />
					</Box>
				</article>
		  ));
}

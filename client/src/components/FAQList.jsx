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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { sanitize } from "dompurify";
export default function FAQList(props) {
	const { FAQs } = props;
	const isLoading = useSelector(blogSelectors.isLoading);

	function FAQSkeleton(numFAQs) {
		const sampleFAQ = {
			title: "Stepping Up: Sanitation specialist develops system",
			content:
				"This is part of Stepping Up, a series introducing Canadians to their country's new sources of inspiration and leadership.",
		};

		return _.times(numFAQs, (i) => (
			<article key={i}>
				<div className="post-details">
					<Skeleton>
						<h1 className="post-title h2">{sampleFAQ.title}</h1>
					</Skeleton>
					<Skeleton width="100%">
						<div className="post-text">{sampleFAQ.content}</div>
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
					<Box className="post-details">
						<Accordion className="faq-accordion">
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<h1 className="post-title h2">{FAQ.title}</h1>
							</AccordionSummary>
							<AccordionDetails>
								<div className="post-text">
									<div
										dangerouslySetInnerHTML={{
											__html: sanitize(FAQ.content),
										}}
									></div>
								</div>
							</AccordionDetails>
						</Accordion>

						<hr />
					</Box>
				</article>
		  ));
}

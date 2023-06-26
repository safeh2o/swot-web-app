import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Skeleton,
} from "@mui/material";
import { sanitize } from "dompurify";
import _ from "lodash";
import { Key } from "react";
import { useSelector } from "react-redux";
import { blogSelectors } from "../reducers/blog";

export default function FAQList(props: { FAQs: any }) {
	const { FAQs } = props;
	const isLoading = useSelector(blogSelectors.isLoading);

	function FAQSkeleton(numFAQs: number) {
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
		: FAQs.map(
				(
					FAQ: {
						title: string;
						content: string;
					},
					i: Key | null | undefined
				) => (
					<article key={i}>
						<Box className="post-details">
							<Accordion className="faq-accordion">
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<h1 className="post-title h2">
										{FAQ.title}
									</h1>
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
				)
		  );
}

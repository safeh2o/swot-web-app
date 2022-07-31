import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { faqSelectors, getFAQs } from "../reducers/faq";
import FAQList from "./FAQList";

const DEFAULT_PAGE_SIZE = 10;

export default function FAQ() {
	const FAQs = useSelector(faqSelectors.FAQs);
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const [FAQRange, setFAQRange] = useState([1, DEFAULT_PAGE_SIZE]);
	const [numPages, setNumPages] = useState(1);
	let [searchParams, setSearchParams] = useSearchParams();
	const currentPageNumber = searchParams.get("page")
		? parseInt(searchParams.get("page"))
		: 1;

	useEffect(() => {
		dispatch(getFAQs());
	}, []);

	useEffect(() => {
		if (!currentPageNumber) {
			setPageNumber(1);
		} else {
			const startRange = (currentPageNumber - 1) * pageSize + 1;
			const endRange = Math.min(
				currentPageNumber * pageSize,
				FAQs?.length || Infinity
			);
			setFAQRange([startRange, endRange]);
		}
	}, [currentPageNumber, FAQs]);

	useEffect(() => {
		if (FAQs?.length) {
			setNumPages(Math.ceil(FAQs.length / pageSize));
		}
	}, [FAQs]);

	function updateSearchParams(items) {
		setSearchParams(
			{
				...Object.fromEntries(searchParams),
				...items,
			},
			{ replace: true }
		);
	}

	function setPageNumber(pageNumber) {
		updateSearchParams({ page: pageNumber });
	}

	return (
		<>
			<section>
				<div className="section-wrap posts">
					<div className="intro">
						<h1 className="section-subtitle">
							Frequently Asked Questions
						</h1>

						<div className="FAQs-count small">
							<span>
								Showing {FAQRange[0]} to {FAQRange[1]} of{" "}
								{FAQs?.length ?? "..."} FAQs.
							</span>
						</div>
					</div>
					<div className="content">
						<FAQList
							FAQs={FAQs.slice(FAQRange[0] - 1, FAQRange[1])}
						/>
					</div>
					<footer className="posts-footer">
						<div className="pages">
							{currentPageNumber > 1 && (
								<a
									onClick={() =>
										setPageNumber(currentPageNumber - 1)
									}
								>
									Previous
								</a>
							)}
							{_.range(1, numPages + 1).map((pageNumber) => (
								<a
									onClick={() => setPageNumber(pageNumber)}
									key={pageNumber}
									className={
										pageNumber == currentPageNumber
											? "active"
											: ""
									}
								>
									{pageNumber}
								</a>
							))}
							{currentPageNumber < numPages && (
								<a
									onClick={() =>
										setPageNumber(currentPageNumber + 1)
									}
								>
									Next
								</a>
							)}
						</div>
					</footer>
				</div>
			</section>
		</>
	);
}

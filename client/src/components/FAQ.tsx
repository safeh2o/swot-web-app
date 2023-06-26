import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { faqSelectors, getFAQs } from "../reducers/faq";
import FAQList from "./FAQList";

const DEFAULT_PAGE_SIZE = 10;

export default function FAQ() {
	const FAQs = useSelector(faqSelectors.FAQs);
	const dispatch = useDispatch();
	const [pageSize] = useState(DEFAULT_PAGE_SIZE);
	const [FAQRange, setFAQRange] = useState([1, DEFAULT_PAGE_SIZE]);
	const [numPages, setNumPages] = useState(1);
	let [searchParams, setSearchParams] = useSearchParams();
	const currentPage = searchParams.get("page");
	const currentPageNumber = currentPage ? parseInt(currentPage) : 1;

	const updateSearchParams = useCallback(
		(items: Record<string, string>) => {
			setSearchParams(
				{
					...Object.fromEntries(searchParams),
					...items,
				},
				{ replace: true }
			);
		},
		[searchParams, setSearchParams]
	);

	const setPageNumber = useCallback(
		(pageNumber: number) => {
			updateSearchParams({ page: pageNumber.toString() });
		},
		[updateSearchParams]
	);

	useEffect(() => {
		dispatch(getFAQs());
	}, [dispatch]);

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
	}, [currentPageNumber, FAQs, pageSize, setPageNumber]);

	useEffect(() => {
		if (FAQs?.length) {
			setNumPages(Math.ceil(FAQs.length / pageSize));
		}
	}, [FAQs, pageSize]);

	return (
		<>
			<div className="blog-header">
				<div className="blog-header-wrap">
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
			</div>
			<section>
				<div className="section-wrap posts faq">
					<div className="content">
						<FAQList
							FAQs={FAQs.slice(FAQRange[0] - 1, FAQRange[1])}
						/>
					</div>
					<footer className="posts-footer">
						<div className="pages">
							{currentPageNumber > 1 && (
								<span
									onClick={() =>
										setPageNumber(currentPageNumber - 1)
									}
								>
									Previous
								</span>
							)}
							{_.range(1, numPages + 1).map((pageNumber) => (
								<span
									onClick={() => setPageNumber(pageNumber)}
									key={pageNumber}
									className={
										pageNumber === currentPageNumber
											? "active"
											: ""
									}
								>
									{pageNumber}
								</span>
							))}
							{currentPageNumber < numPages && (
								<span
									onClick={() =>
										setPageNumber(currentPageNumber + 1)
									}
								>
									Next
								</span>
							)}
						</div>
					</footer>
				</div>
			</section>
		</>
	);
}

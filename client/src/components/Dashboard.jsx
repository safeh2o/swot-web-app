import React from "react";

import { Link } from "react-router-dom";
import Posts from "./Posts";

function Dashboard(props) {
	return (
		<>
			<Posts
				type={'news'}
				data={
					[
						{
							link: "",
							title: "Global WASH Cluster (GWC) Annual Meeting Satellite",
							date: "May 2, 2021",
							content: "Check out a recent presentation made during one of the events.",
						},
						{
							link: "https://www.theglobeandmail.com/canada/article-sanitation-specialist-develops-system-to-ensure-refugee-camps-anywhere/",
							title: "Stepping Up: Sanitation specialist develops system to ensure refugee camps anywhere can have healthy drinking water",
							date: "November 25, 2020",
							content: "This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership.",
						}
					]
				}
			/>
		</>
	);
}

export default Dashboard;

import React, { Component } from "react";

export default function GuideLine(props) {
	return (
		<div className="txt-icon help guide txt-sm">
			<i>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					x="0"
					y="0"
					version="1.1"
					viewBox="0 0 40 40"
					xmlSpace="preserve"
				>
					<ellipse
						cx="20"
						cy="20"
						fill="#F3C22B"
						rx="19.9"
						ry="19.9"
					></ellipse>
					<circle cx="20" cy="29.7" r="2.2" fill="#FCFCFC"></circle>
					<path
						fill="#FCFCFC"
						d="M20 24.2c-.7 0-1.2-.6-1.2-1.2v-1.5c0-.7.6-1.2 1.2-1.2 2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4c0 .7-.6 1.2-1.2 1.2s-1.2-.6-1.2-1.2c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5c0 3.1-2.3 5.8-5.2 6.4v.3c-.2.7-.7 1.2-1.4 1.2z"
					></path>
				</svg>
			</i>
			<span>{props.text || props.children}</span>
		</div>
	);
}

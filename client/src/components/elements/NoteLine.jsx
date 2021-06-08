import React, { Component } from "react";

export default function NoteLine(props) {
	return (
		<div className="txt-icon notice txt-sm">
			<i>
				<img src="assets/icons/notice.svg" alt="" />
			</i>
			<span>{props.text || props.children}</span>
		</div>
	);
}

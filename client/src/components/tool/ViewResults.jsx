import React, { Component } from "react";
import NoteLine from "../elements/NoteLine";
import FormSelectSearch from "../elements/FormSelectSearch";
import { Link } from "react-router-dom";

// icons
import ReactCountryFlag from "react-country-flag";
import DetectEmoji from "../HelperDetectEmoji";
import { IconTrash, IconAdd } from "../icons";

export default function ViewResults(props) {
	return (
		<>
			<section className="content-window rich-text">
				<header>
					<div className="content-window-title">
						Step 4. Your Results
					</div>
					<div className="content-window-title-description">
						<p>View, and Manage all of your Analyzed Results</p>
					</div>
				</header>
			</section>
			<section className="content-window bleed-edges">
				<header>
					<div className="content-window-title">Results</div>
					<div className="content-window-options">
						<button className="txt-icon button yellow">
							<i>
								<IconAdd />
							</i>
							<span>New Analysis</span>
						</button>
					</div>
				</header>
				<section className="table fieldsites">
					<section className="table-header">
						<div className="table-col">
							<span className="txt-icon">Fieldsite</span>
						</div>
						<div className="table-col">Total Samples</div>
						<div className="table-col">Latest Analysis</div>
						<div className="table-col">Safety Level</div>
						<div className="table-col"></div>
					</section>
					<section className="table-body">
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Arbat IDP</Link>
							</div>
							<div className="table-col">305</div>
							<div className="table-col">Feb 27 2021</div>
							<div className="table-col">
								<span className="safe-level not-safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Bardarash</Link>
							</div>
							<div className="table-col">15</div>
							<div className="table-col">Jan 11 2021</div>
							<div className="table-col">
								<span className="safe-level check"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Essian</Link>
							</div>
							<div className="table-col">105</div>
							<div className="table-col">Nov 21 2020</div>
							<div className="table-col">
								<span className="safe-level none"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Garmawa</Link>
							</div>
							<div className="table-col">0</div>
							<div className="table-col">- - -</div>
							<div className="table-col">
								<span className="safe-level safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Mimillian</Link>
							</div>
							<div className="table-col">305</div>
							<div className="table-col">Aug 17 2020</div>
							<div className="table-col">
								<span className="safe-level not-safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Mamrashan</Link>
							</div>
							<div className="table-col">234</div>
							<div className="table-col">Aug 8 2021</div>
							<div className="table-col">
								<span className="safe-level not-safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Sheikhan</Link>
							</div>
							<div className="table-col">312</div>
							<div className="table-col">Jul 26 2020</div>
							<div className="table-col">
								<span className="safe-level not-safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="result/garwama">Camp FJ2</Link>
							</div>
							<div className="table-col">Nigeria | Essian</div>
							<div className="table-col">0</div>
							<div className="table-col">- - -</div>
							<div className="table-col">
								<span className="safe-level none"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="result/garwama">Camp 21</Link>
							</div>
							<div className="table-col">Iraq | Garmawa</div>
							<div className="table-col">0</div>
							<div className="table-col">- - -</div>
							<div className="table-col">
								<span className="safe-level none"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="result/garwama">Garmawa</Link>
							</div>
							<div className="table-col">Iraq | Mamrashan</div>
							<div className="table-col">0</div>
							<div className="table-col">- - -</div>
							<div className="table-col">
								<span className="safe-level none"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="result/garwama">Rusape</Link>
							</div>
							<div className="table-col">0</div>
							<div className="table-col">- - -</div>
							<div className="table-col">
								<span className="safe-level safe"></span>
							</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
					</section>
					<section className="table-footer"></section>
				</section>
			</section>
		</>
	);
}

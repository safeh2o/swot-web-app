import React from "react";
import Notice from "../elements/Notice";
import FormSelectSearch from "../elements/FormSelectSearch";
import { Link } from "react-router-dom";

// icons
import ReactCountryFlag from "react-country-flag";
import DetectEmoji from "../HelperDetectEmoji";
import { IconTrash } from "../icons";

export default function FieldSites(props) {
	console.log(DetectEmoji());

	return (
		<>
			<section className="content-window">
				<header>
					<div className="content-window-title">Location</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="flex-group">
						<label className="space">
							<FormSelectSearch
								options={OptionsResponse}
								default={[
									{
										name: "Nigeria",
										value: "NG",
									},
								]}
								icon={true}
							/>
							<span className="label">Response</span>
						</label>
						<label className="space">
							<FormSelectSearch options={OptionsArea} />
							<span className="label">Area</span>
						</label>
					</div>
				</section>
				<footer>
					<Link to="/contact">
						<NoteLine
							text={[
								"Cant find your Area or Fieldsite? ... Contact Us",
							]}
						/>
					</Link>
				</footer>
			</section>
			<section className="content-window bleed-edges">
				<header>
					<div className="content-window-title">
						Manage Fieldsites
					</div>
					<div className="content-window-options">
						<button className="button yellow">
							<span>New Fieldsite</span>
						</button>
					</div>
				</header>
				<section className="table fieldsites">
					<section className="table-header">
						<div className="table-col">
							<span class="txt-icon">Fieldsite</span>
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
								<Link to="fieldsite/garwama">Tazade</Link>
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
				<footer></footer>
			</section>
		</>
	);
}

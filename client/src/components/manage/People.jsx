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

	// Demo Data
	const OptionsOrganisations = [
		{
			name: "MSF Doctors Without Borders",
			value: "MSF",
		},
		{
			name: "The UN Refugee Agency",
			value: "UNHCR",
		},
		{
			name: "Elrha",
			value: "elrha",
		},
		{
			name: "Water Safety USA",
			value: "WSUSA",
		},
	];
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
								options={OptionsOrganisations}
								default={[
									{
										name: "MSF Doctors Without Borders",
										value: "MSF",
									},
								]}
								icon={true}
							/>
							<span className="label">Organisation</span>
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
					<div className="content-window-title">Manage People</div>
					<div className="content-window-options">
						<button className="txt-icon button yellow">
							<i></i>
							<span>New Person</span>
						</button>
					</div>
				</header>
				<section className="table people">
					<section className="table-header">
						<div className="table-col">
							<span class="txt-icon">Name</span>
						</div>
						<div className="table-col">Datasets</div>
						<div className="table-col">Latest Analysis</div>
						<div className="table-col"></div>
					</section>
					<section className="table-body">
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">
									Syed Imran Ali
								</Link>
							</div>
							<div className="table-col">923</div>
							<div className="table-col">Feb 27 2021</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">James Brown</Link>
							</div>
							<div className="table-col">527</div>
							<div className="table-col">Feb 19 2021</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">
									Michael DeSanti
								</Link>
							</div>
							<div className="table-col">1739</div>
							<div className="table-col">Nov 21 2020</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">
									Mohamed Moselhy
								</Link>
							</div>
							<div className="table-col">1263</div>
							<div className="table-col">Nov 21 2020</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">Danny Salman</Link>
							</div>
							<div className="table-col">4</div>
							<div className="table-col">Feb 02 2021</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">
									Ngqabutho Zondo
								</Link>
							</div>
							<div className="table-col">222</div>
							<div className="table-col">May 22 2020</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">
									Anthony Myers
								</Link>
							</div>
							<div className="table-col">411</div>
							<div className="table-col">Jan 06 2020</div>
							<div className="table-col">
								<IconTrash />
							</div>
						</div>
						<div className="table-row">
							<div className="table-col">
								<Link to="fieldsite/garwama">
									Kudzanai Chimombe
								</Link>
							</div>
							<div className="table-col">2</div>
							<div className="table-col">Sept 13 2018</div>
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

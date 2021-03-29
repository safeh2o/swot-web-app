import React from "react";
import FieldsitesDropdown from "./elements/FieldsitesDropdown";

const dateFormat = "YYYY-MM-DD";
const POSSIBLE_HOURS = [6, 9, 12, 15, 18, 21, 24];

export default class AnalyzePage extends React.Component {
	constructor(props) {
		super(props);
		this.analyzeForm = React.createRef();
		this.formPayload = {};
	}

	componentDidMount() {
		this.populateDates();
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		const formObj = this.analyzeForm.current;
		const jqFormObj = $(formObj);
		const { fieldsite } = this.formPayload;
		const fieldsiteName = fieldsite.name;
		const startDate = formObj.startDate.value;
		const endDate = formObj.endDate.value;

		formData.append("fieldsite", fieldsite.id);
		formData.append("datasetName", formObj.datasetName.value);
		formData.append("datasetDescription", formObj.datasetDescription.value);
		formData.append("maxDurationHours", formObj.maxDurationHours.value);
		formData.append("confidenceLevel", formObj.confidenceLevel.value);
		formData.append("startDate", startDate);
		formData.append("endDate", endDate);

		let err = false;

		const iter = formData.keys();
		let fieldKey = null;
		while ((fieldKey = iter.next())) {
			if (fieldKey.done) {
				break;
			}
			let fieldValue = formData.get(fieldKey.value);
			if (!fieldValue) {
				this.fieldError(jqFormObj, fieldKey.value);
				err = true;
			}
		}
		if (new Date(startDate) > new Date(endDate)) {
			this.fieldError(jqFormObj, "startDate");
		}
		if (err) {
			return;
		}

		showSpinner();

		fetch("/api/upload/analyze", { method: "POST", body: formData })
			.then((res) =>
				res.json().then((data) => {
					if (res.ok) {
						showConfirmModal(
							`Analyzing ${fieldsiteName} from ${startDate} to ${endDate}.`
						);
					} else {
						logError({ status: data.status, message: data.error });
					}
				})
			)
			.catch((err) => {
				logError(err);
			})
			.finally(() => {
				hideSpinner();
			});
	}

	populateDates() {
		// get current time
		const currTime = new Date();
		// round to second
		// currTime.setTime(Math.floor(currTime / 60000) * 60000);
		$("#startDate")[0].valueAsNumber = $("#endDate")[0].valueAsNumber =
			currTime - currTime.getTimezoneOffset() * 60000;
	}

	fieldError(formElement, name) {
		const input = formElement.find(`[name=${name}][id=${name}]`);
		let label = formElement.find(`label[for=${input.attr("id")}]`);
		if (!label.length) {
			label = input.closest("label");
		}

		shakeElement(input);
		shakeElement(label);

		input.one("input", () => {
			label.removeClass("text-danger");
		});
		label.addClass("text-danger");
	}
	render() {
		return (
			<>
				<main role="main" className="flex-shrink-0">
					<div className="container">
						<div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
							<h1 className="display-4">
								Request Data Analysis:
							</h1>
						</div>
					</div>

					<div className="upload container">
						<div className="card-deck mb-3">
							<div className="card mb-4 shadow-sm">
								<div className="card-body">
									<form
										className="form"
										role="form"
										autoComplete="off"
										ref={this.analyzeForm}
										onSubmit={(e) => {
											this.handleSubmit(e);
										}}
									>
										<div className="container w-50">
											<div className="card-header mb-2 text-center">
												<h4>Dataset Information</h4>
											</div>
											<div className="form-group">
												<label htmlFor="fieldsite">
													Fieldsite:
												</label>
												<FieldsitesDropdown
													object={this.formPayload}
												/>
											</div>
											<br />

											<div className="form-group">
												<label htmlFor="datasetName">
													Dataset Name:
												</label>
												<input
													type="text"
													name="datasetName"
													id="datasetName"
													className="form-control"
												/>
											</div>
											<br />

											<div className="form-group">
												<label htmlFor="datasetDescription">
													Dataset Description:
												</label>
												<textarea
													name="datasetDescription"
													id="datasetDescription"
													className="form-control"
												></textarea>
											</div>
											<br />

											<div className="card-header mb-2 text-center">
												<h4>Date Range</h4>
											</div>

											<div className="form-group">
												<label htmlFor="startDate">
													From:
												</label>
												<input
													type="date"
													name="startDate"
													id="startDate"
												/>
												<br />
												<small>
													Format: {dateFormat}
												</small>
											</div>
											<br />

											<div className="form-group">
												<label htmlFor="endDate">
													To:
												</label>
												<input
													type="date"
													name="endDate"
													id="endDate"
												/>
												<br />
												<small>
													Format: {dateFormat}
												</small>
											</div>
											<br />

											<div className="card-header mb-2 text-center">
												<h4>Analysis Parameters</h4>
											</div>

											<div className="form-group">
												<label
													htmlFor="maxDurationHours"
													className="form-elemenet-inline"
													title="Select the number of hours that you want to protect water in the household. This should be the typical maximum length of time people are storing and using water in their households at your site."
												>
													Duration of Household
													Storage and Use (Hours)
												</label>
												<select
													id="maxDurationHours"
													name="maxDurationHours"
													className="form-control form-control-lg form-element-inline maxDurationSelect"
												>
													{POSSIBLE_HOURS.map(
														(hour) => (
															<option
																key={`duration_${hour}`}
																value={hour}
															>
																{hour}
															</option>
														)
													)}
												</select>
											</div>

											<div className="form-group">
												<label
													htmlFor="confidenceLevel"
													className="form-element-inline"
													title="This has to do with how the SWOT’s analytics handle modelling uncertainty. We recommend selecting 'Optimum/Balanced Decay Scenario' for a balanced recommendation. If you want to be extra cautious, select 'Maximum Decay Scenario' which models the worst-case scenario. We do not recommend using the 'Minimum Decay Scenario'."
												>
													Modelling Confidence Level
												</label>
												<select
													id="confidenceLevel"
													name="confidenceLevel"
													className="form-control form-control-lg form-element-inline confidenceSelect"
												>
													<option value="minDecay">
														Minimum Decay Scenario
													</option>
													<option value="optimumDecay">
														Optimum/Balanced Decay
														Scenario
													</option>
													<option value="maxDecay">
														Maximum Decay Scenario
													</option>
												</select>
											</div>

											<div className="form-group pt-4">
												<button
													type="reset"
													className="btn btn-danger btn-lg mx-5 w-25"
													aria-hidden="true"
												>
													Reset
												</button>
												<button
													type="submit"
													className="btn btn-primary btn-lg mx-5 w-25"
													id="btnSave"
												>
													Save
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</main>
			</>
		);
	}
}

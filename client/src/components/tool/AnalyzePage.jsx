import React, { useEffect, useReducer, useState } from "react";
import FormSelectSearch from "../elements/FormSelectSearch";
// Styles
import { withStyles, makeStyles } from "@material-ui/core/styles";
// Slider
import Slider from "@material-ui/core/Slider";
// Accordion
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionExpandMoreIcon from "@material-ui/icons/ExpandMore";
// Date Picker
import TextField from "@material-ui/core/TextField";
// Tool Tip
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors } from "../../reducers/user";
import { simpleFormReducer } from "../../reducers/form";
import {
	Button,
	ButtonGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@material-ui/core";
import NoteLine from "../elements/NoteLine";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { addError, addNotice, setLoading } from "../../reducers/notifications";
import axios from "axios";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		width: 300 + theme.spacing(3) * 2,
// 	},
// 	margin: {
// 		height: theme.spacing(3),
// 	},
// }));

const FromSlider_HouseholdDuration_Hours = [
	{ value: 3 },
	{ value: 6 },
	{ value: 9 },
	{ value: 12 },
	{ value: 15 },
	{ value: 18 },
	{ value: 21 },
	{ value: 24 },
];

const SliderThumbBoxShadow =
	"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const FormSlider = withStyles({
	root: {
		color: "#4069b1",
		height: 10,
		padding: "15px 0",
	},
	thumb: {
		height: "2.6rem",
		width: "2.6rem",
		backgroundColor: "#4069b1",
		boxShadow: SliderThumbBoxShadow,
		marginTop: "-1rem",
		marginLeft: "-1.3rem",
		"&:focus, &:hover, &$active": {
			transform: "scale(1.1)",
			boxShadow:
				"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				boxShadow: SliderThumbBoxShadow,
			},
		},
	},
	active: {},
	track: {
		height: 10,
	},
	rail: {
		height: 10,
		opacity: 0.5,
		backgroundColor: "#bfbfbf",
	},
	mark: {
		backgroundColor: "#bfbfbf",
		height: 15,
		width: 2,
		marginTop: -5,
		marginLeft: -1,
	},
	markActive: {
		opacity: 1,
		backgroundColor: "currentColor",
	},
})(Slider);

const Accordion = withStyles({
	root: {
		"&:before": {
			display: "none",
		},
		"&$expanded": {
			margin: "20px 20px 40px",
		},
	},
	expanded: {
		margin: 0,
	},
})(MuiAccordion);

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const AccordionSummary = withStyles({
	root: {
		borderBottom: "1px solid #dde6ed",
		margin: 0,
	},
	content: {
		margin: 0,
		"&$expanded": {
			margin: 0,
		},
	},
	expanded: {
		margin: 0,
	},
	expandIcon: {
		padding: "0 12px 0 0",
	},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
	root: {
		padding: "0",
		flexDirection: "column",
	},
}))(MuiAccordionDetails);

// Guides
const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: "#f5f5f9",
		color: "rgba(0, 0, 0, 0.87)",
		maxWidth: 380,
		border: "2px solid #dadde9",
		padding: "20px 30px",
		boxShadow: "4px 4px 5px rgb(0, 0, 0, .10)",
	},
}))(Tooltip);

// Demo Data
const OptionsResponse = [
	{
		name: "Afghanistan",
		value: "AF",
	},
	{
		name: "\u00c5land Islands",
		value: "AX",
	},
	{
		name: "Albania",
		value: "AL",
	},
	{
		name: "Algeria",
		value: "DZ",
	},
	{
		name: "American Samoa",
		value: "AS",
	},
	{
		name: "Andorra",
		value: "AD",
	},
	{
		name: "Angola",
		value: "AO",
	},
	{
		name: "Anguilla",
		value: "AI",
	},
	{
		name: "Antarctica",
		value: "AQ",
	},
	{
		name: "Antigua and Barbuda",
		value: "AG",
	},
	{
		name: "Argentina",
		value: "AR",
	},
	{
		name: "Armenia",
		value: "AM",
	},
	{
		name: "Aruba",
		value: "AW",
	},
	{
		name: "Australia",
		value: "AU",
	},
	{
		name: "Austria",
		value: "AT",
	},
	{
		name: "Azerbaijan",
		value: "AZ",
	},
	{
		name: "Bahamas",
		value: "BS",
	},
	{
		name: "Bahrain",
		value: "BH",
	},
	{
		name: "Bangladesh",
		value: "BD",
	},
	{
		name: "Barbados",
		value: "BB",
	},
	{
		name: "Belarus",
		value: "BY",
	},
	{
		name: "Belgium",
		value: "BE",
	},
	{
		name: "Belize",
		value: "BZ",
	},
	{
		name: "Benin",
		value: "BJ",
	},
	{
		name: "Bermuda",
		value: "BM",
	},
	{
		name: "Bhutan",
		value: "BT",
	},
	{
		name: "Bolivia, Plurinational State of",
		value: "BO",
	},
	{
		name: "Bonaire, Sint Eustatius and Saba",
		value: "BQ",
	},
	{
		name: "Bosnia and Herzegovina",
		value: "BA",
	},
	{
		name: "Botswana",
		value: "BW",
	},
	{
		name: "Bouvet Island",
		value: "BV",
	},
	{
		name: "Brazil",
		value: "BR",
	},
	{
		name: "British Indian Ocean Territory",
		value: "IO",
	},
	{
		name: "Brunei Darussalam",
		value: "BN",
	},
	{
		name: "Bulgaria",
		value: "BG",
	},
	{
		name: "Burkina Faso",
		value: "BF",
	},
	{
		name: "Burundi",
		value: "BI",
	},
	{
		name: "Cambodia",
		value: "KH",
	},
	{
		name: "Cameroon",
		value: "CM",
	},
	{
		name: "Canada",
		value: "CA",
	},
	{
		name: "Cape Verde",
		value: "CV",
	},
	{
		name: "Cayman Islands",
		value: "KY",
	},
	{
		name: "Central African Republic",
		value: "CF",
	},
	{
		name: "Chad",
		value: "TD",
	},
	{
		name: "Chile",
		value: "CL",
	},
	{
		name: "China",
		value: "CN",
	},
	{
		name: "Christmas Island",
		value: "CX",
	},
	{
		name: "Cocos (Keeling) Islands",
		value: "CC",
	},
	{
		name: "Colombia",
		value: "CO",
	},
	{
		name: "Comoros",
		value: "KM",
	},
	{
		name: "Congo",
		value: "CG",
	},
	{
		name: "Congo, the Democratic Republic of the",
		value: "CD",
	},
	{
		name: "Cook Islands",
		value: "CK",
	},
	{
		name: "Costa Rica",
		value: "CR",
	},
	{
		name: "C\u00f4te d'Ivoire",
		value: "CI",
	},
	{
		name: "Croatia",
		value: "HR",
	},
	{
		name: "Cuba",
		value: "CU",
	},
	{
		name: "Cura\u00e7ao",
		value: "CW",
	},
	{
		name: "Cyprus",
		value: "CY",
	},
	{
		name: "Czech Republic",
		value: "CZ",
	},
	{
		name: "Denmark",
		value: "DK",
	},
	{
		name: "Djibouti",
		value: "DJ",
	},
	{
		name: "Dominica",
		value: "DM",
	},
	{
		name: "Dominican Republic",
		value: "DO",
	},
	{
		name: "Ecuador",
		value: "EC",
	},
	{
		name: "Egypt",
		value: "EG",
	},
	{
		name: "El Salvador",
		value: "SV",
	},
	{
		name: "Equatorial Guinea",
		value: "GQ",
	},
	{
		name: "Eritrea",
		value: "ER",
	},
	{
		name: "Estonia",
		value: "EE",
	},
	{
		name: "Ethiopia",
		value: "ET",
	},
	{
		name: "Falkland Islands (Malvinas)",
		value: "FK",
	},
	{
		name: "Faroe Islands",
		value: "FO",
	},
	{
		name: "Fiji",
		value: "FJ",
	},
	{
		name: "Finland",
		value: "FI",
	},
	{
		name: "France",
		value: "FR",
	},
	{
		name: "French Guiana",
		value: "GF",
	},
	{
		name: "French Polynesia",
		value: "PF",
	},
	{
		name: "French Southern Territories",
		value: "TF",
	},
	{
		name: "Gabon",
		value: "GA",
	},
	{
		name: "Gambia",
		value: "GM",
	},
	{
		name: "Georgia",
		value: "GE",
	},
	{
		name: "Germany",
		value: "DE",
	},
	{
		name: "Ghana",
		value: "GH",
	},
	{
		name: "Gibraltar",
		value: "GI",
	},
	{
		name: "Greece",
		value: "GR",
	},
	{
		name: "Greenland",
		value: "GL",
	},
	{
		name: "Grenada",
		value: "GD",
	},
	{
		name: "Guadeloupe",
		value: "GP",
	},
	{
		name: "Guam",
		value: "GU",
	},
	{
		name: "Guatemala",
		value: "GT",
	},
	{
		name: "Guernsey",
		value: "GG",
	},
	{
		name: "Guinea",
		value: "GN",
	},
	{
		name: "Guinea-Bissau",
		value: "GW",
	},
	{
		name: "Guyana",
		value: "GY",
	},
	{
		name: "Haiti",
		value: "HT",
	},
	{
		name: "Heard Island and McDonald Islands",
		value: "HM",
	},
	{
		name: "Holy See (Vatican City State)",
		value: "VA",
	},
	{
		name: "Honduras",
		value: "HN",
	},
	{
		name: "Hong Kong",
		value: "HK",
	},
	{
		name: "Hungary",
		value: "HU",
	},
	{
		name: "Iceland",
		value: "IS",
	},
	{
		name: "India",
		value: "IN",
	},
	{
		name: "Indonesia",
		value: "ID",
	},
	{
		name: "Iran, Islamic Republic of",
		value: "IR",
	},
	{
		name: "Iraq",
		value: "IQ",
	},
	{
		name: "Ireland",
		value: "IE",
	},
	{
		name: "Isle of Man",
		value: "IM",
	},
	{
		name: "Israel",
		value: "IL",
	},
	{
		name: "Italy",
		value: "IT",
	},
	{
		name: "Jamaica",
		value: "JM",
	},
	{
		name: "Japan",
		value: "JP",
	},
	{
		name: "Jersey",
		value: "JE",
	},
	{
		name: "Jordan",
		value: "JO",
	},
	{
		name: "Kazakhstan",
		value: "KZ",
	},
	{
		name: "Kenya",
		value: "KE",
	},
	{
		name: "Kiribati",
		value: "KI",
	},
	{
		name: "Korea, Democratic People's Republic of",
		value: "KP",
	},
	{
		name: "Korea, Republic of",
		value: "KR",
	},
	{
		name: "Kuwait",
		value: "KW",
	},
	{
		name: "Kyrgyzstan",
		value: "KG",
	},
	{
		name: "Lao People's Democratic Republic",
		value: "LA",
	},
	{
		name: "Latvia",
		value: "LV",
	},
	{
		name: "Lebanon",
		value: "LB",
	},
	{
		name: "Lesotho",
		value: "LS",
	},
	{
		name: "Liberia",
		value: "LR",
	},
	{
		name: "Libya",
		value: "LY",
	},
	{
		name: "Liechtenstein",
		value: "LI",
	},
	{
		name: "Lithuania",
		value: "LT",
	},
	{
		name: "Luxembourg",
		value: "LU",
	},
	{
		name: "Macao",
		value: "MO",
	},
	{
		name: "Macedonia, the Former Yugoslav Republic of",
		value: "MK",
	},
	{
		name: "Madagascar",
		value: "MG",
	},
	{
		name: "Malawi",
		value: "MW",
	},
	{
		name: "Malaysia",
		value: "MY",
	},
	{
		name: "Maldives",
		value: "MV",
	},
	{
		name: "Mali",
		value: "ML",
	},
	{
		name: "Malta",
		value: "MT",
	},
	{
		name: "Marshall Islands",
		value: "MH",
	},
	{
		name: "Martinique",
		value: "MQ",
	},
	{
		name: "Mauritania",
		value: "MR",
	},
	{
		name: "Mauritius",
		value: "MU",
	},
	{
		name: "Mayotte",
		value: "YT",
	},
	{
		name: "Mexico",
		value: "MX",
	},
	{
		name: "Micronesia, Federated States of",
		value: "FM",
	},
	{
		name: "Moldova, Republic of",
		value: "MD",
	},
	{
		name: "Monaco",
		value: "MC",
	},
	{
		name: "Mongolia",
		value: "MN",
	},
	{
		name: "Montenegro",
		value: "ME",
	},
	{
		name: "Montserrat",
		value: "MS",
	},
	{
		name: "Morocco",
		value: "MA",
	},
	{
		name: "Mozambique",
		value: "MZ",
	},
	{
		name: "Myanmar",
		value: "MM",
	},
	{
		name: "Namibia",
		value: "NA",
	},
	{
		name: "Nauru",
		value: "NR",
	},
	{
		name: "Nepal",
		value: "NP",
	},
	{
		name: "Netherlands",
		value: "NL",
	},
	{
		name: "New Caledonia",
		value: "NC",
	},
	{
		name: "New Zealand",
		value: "NZ",
	},
	{
		name: "Nicaragua",
		value: "NI",
	},
	{
		name: "Niger",
		value: "NE",
	},
	{
		name: "Nigeria",
		value: "NG",
	},
	{
		name: "Niue",
		value: "NU",
	},
	{
		name: "Norfolk Island",
		value: "NF",
	},
	{
		name: "Northern Mariana Islands",
		value: "MP",
	},
	{
		name: "Norway",
		value: "NO",
	},
	{
		name: "Oman",
		value: "OM",
	},
	{
		name: "Pakistan",
		value: "PK",
	},
	{
		name: "Palau",
		value: "PW",
	},
	{
		name: "Palestine, State of",
		value: "PS",
	},
	{
		name: "Panama",
		value: "PA",
	},
	{
		name: "Papua New Guinea",
		value: "PG",
	},
	{
		name: "Paraguay",
		value: "PY",
	},
	{
		name: "Peru",
		value: "PE",
	},
	{
		name: "Philippines",
		value: "PH",
	},
	{
		name: "Pitcairn",
		value: "PN",
	},
	{
		name: "Poland",
		value: "PL",
	},
	{
		name: "Portugal",
		value: "PT",
	},
	{
		name: "Puerto Rico",
		value: "PR",
	},
	{
		name: "Qatar",
		value: "QA",
	},
	{
		name: "R\u00e9union",
		value: "RE",
	},
	{
		name: "Romania",
		value: "RO",
	},
	{
		name: "Russian Federation",
		value: "RU",
	},
	{
		name: "Rwanda",
		value: "RW",
	},
	{
		name: "Saint Barth\u00e9lemy",
		value: "BL",
	},
	{
		name: "Saint Helena, Ascension and Tristan da Cunha",
		value: "SH",
	},
	{
		name: "Saint Kitts and Nevis",
		value: "KN",
	},
	{
		name: "Saint Lucia",
		value: "LC",
	},
	{
		name: "Saint Martin (French part)",
		value: "MF",
	},
	{
		name: "Saint Pierre and Miquelon",
		value: "PM",
	},
	{
		name: "Saint Vincent and the Grenadines",
		value: "VC",
	},
	{
		name: "Samoa",
		value: "WS",
	},
	{
		name: "San Marino",
		value: "SM",
	},
	{
		name: "Sao Tome and Principe",
		value: "ST",
	},
	{
		name: "Saudi Arabia",
		value: "SA",
	},
	{
		name: "Senegal",
		value: "SN",
	},
	{
		name: "Serbia",
		value: "RS",
	},
	{
		name: "Seychelles",
		value: "SC",
	},
	{
		name: "Sierra Leone",
		value: "SL",
	},
	{
		name: "Singapore",
		value: "SG",
	},
	{
		name: "Sint Maarten (Dutch part)",
		value: "SX",
	},
	{
		name: "Slovakia",
		value: "SK",
	},
	{
		name: "Slovenia",
		value: "SI",
	},
	{
		name: "Solomon Islands",
		value: "SB",
	},
	{
		name: "Somalia",
		value: "SO",
	},
	{
		name: "South Africa",
		value: "ZA",
	},
	{
		name: "South Georgia and the South Sandwich Islands",
		value: "GS",
	},
	{
		name: "South Sudan",
		value: "SS",
	},
	{
		name: "Spain",
		value: "ES",
	},
	{
		name: "Sri Lanka",
		value: "LK",
	},
	{
		name: "Sudan",
		value: "SD",
	},
	{
		name: "Suriname",
		value: "SR",
	},
	{
		name: "Svalbard and Jan Mayen",
		value: "SJ",
	},
	{
		name: "Swaziland",
		value: "SZ",
	},
	{
		name: "Sweden",
		value: "SE",
	},
	{
		name: "Switzerland",
		value: "CH",
	},
	{
		name: "Syrian Arab Republic",
		value: "SY",
	},
	{
		name: "Taiwan, Province of China",
		value: "TW",
	},
	{
		name: "Tajikistan",
		value: "TJ",
	},
	{
		name: "Tanzania, United Republic of",
		value: "TZ",
	},
	{
		name: "Thailand",
		value: "TH",
	},
	{
		name: "Timor-Leste",
		value: "TL",
	},
	{
		name: "Togo",
		value: "TG",
	},
	{
		name: "Tokelau",
		value: "TK",
	},
	{
		name: "Tonga",
		value: "TO",
	},
	{
		name: "Trinidad and Tobago",
		value: "TT",
	},
	{
		name: "Tunisia",
		value: "TN",
	},
	{
		name: "Turkey",
		value: "TR",
	},
	{
		name: "Turkmenistan",
		value: "TM",
	},
	{
		name: "Turks and Caicos Islands",
		value: "TC",
	},
	{
		name: "Tuvalu",
		value: "TV",
	},
	{
		name: "Uganda",
		value: "UG",
	},
	{
		name: "Ukraine",
		value: "UA",
	},
	{
		name: "United Arab Emirates",
		value: "AE",
	},
	{
		name: "United Kingdom",
		value: "GB",
	},
	{
		name: "United States",
		value: "US",
	},
	{
		name: "United States Minor Outlying Islands",
		value: "UM",
	},
	{
		name: "Uruguay",
		value: "UY",
	},
	{
		name: "Uzbekistan",
		value: "UZ",
	},
	{
		name: "Vanuatu",
		value: "VU",
	},
	{
		name: "Venezuela, Bolivarian Republic of",
		value: "VE",
	},
	{
		name: "Viet Nam",
		value: "VN",
	},
	{
		name: "Virgin Islands, British",
		value: "VG",
	},
	{
		name: "Virgin Islands, U.S.",
		value: "VI",
	},
	{
		name: "Wallis and Futuna",
		value: "WF",
	},
	{
		name: "Western Sahara",
		value: "EH",
	},
	{
		name: "Yemen",
		value: "YE",
	},
	{
		name: "Zambia",
		value: "ZM",
	},
	{
		name: "Zimbabwe",
		value: "ZW",
	},
];
const OptionsArea = [
	{
		name: "Afghanistan",
		value: "slug1",
	},
	{
		name: "Arbat IDP",
		value: "slug2",
	},
	{
		name: "Bardarash",
		value: "slug3",
	},
	{
		name: "Essian",
		value: "slug4",
	},
	{
		name: "Garmawa",
		value: "slug5",
	},
];

const initialState = {
	fieldsite: null,
	startDate: null,
	endDate: null,
	duration: 3,
	confidence: "optimum",
	name: "",
	description: "",
};

export default function AnalyzePage(props) {
	const classes = useStyles();

	const userFieldsites = useSelector(userSelectors.fieldsites);
	const [state, formDispatch] = useReducer(simpleFormReducer, initialState);
	const [disabled, setDisabled] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const {
			fieldsite,
			startDate,
			endDate,
			duration,
			confidence,
			name,
			description,
		} = state;
		setDisabled(
			!fieldsite ||
				(!startDate && !endDate) ||
				!duration ||
				!confidence ||
				!name ||
				!description
		);
	}, [state]);

	function selectDate(delta) {
		formDispatch({
			type: "UPDATE",
			payload: {
				startDate: DateTime.now()
					.minus({
						days: delta,
					})
					.toJSDate(),
				endDate: DateTime.now().toJSDate(),
			},
		});
	}

	function handleFormReset() {
		formDispatch({ type: "RESET" });
	}

	function handleFormSubmit() {
		dispatch(setLoading(true));
		axios
			.post("/api/upload/analyze", state)
			.then((res) => {
				dispatch(
					addNotice({ label: "success", notice: "Analyze Success" })
				);
			})
			.catch((err) =>
				dispatch(addError("Error occurred while trying to analyze"))
			)
			.finally(() => {
				dispatch(setLoading(false));
			});
	}

	function handleFormSubmit2(e) {
		const formData = new FormData();
		const { fieldsite } = state;
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
				fieldError(jqFormObj, fieldKey.value);
				err = true;
			}
		}
		if (new Date(startDate) > new Date(endDate)) {
			fieldError(jqFormObj, "startDate");
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

	function handleDateChange(newRange) {
		let startDate = null,
			endDate = null;
		if (newRange) {
			[startDate, endDate] = newRange;
		}
		formDispatch({ type: "UPDATE", payload: { startDate, endDate } });
	}

	return (
		<form role="form" autoComplete="off">
			<h2 className="content-title">Choose a Location</h2>

			<section className="content-window">
				<header>
					<div className="content-window-title">Location</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="flex-group">
						{/* <label className="space">
                <FormSelectSearch options={OptionsResponse} icon={true} />
                <span className="label">Country</span>
              </label>
              <label className="space">
                <FormSelectSearch options={OptionsArea} />
                <span className="label">Area</span>
              </label> */}
						<Autocomplete
							id="fieldsite"
							options={userFieldsites}
							getOptionLabel={(option) => option.name}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Fieldsite"
									variant="outlined"
								/>
							)}
							value={state && state.fieldsite}
							onChange={(_event, value) => {
								formDispatch({
									type: "UPDATE",
									payload: {
										fieldsite: value,
									},
								});
							}}
						/>
					</div>
				</section>
				<footer>
					<Link to="/contact">
						<NoteLine text="Something missing?" />
					</Link>
				</footer>
			</section>

			<h2 className="content-title">Name the Dataset</h2>

			<section className="content-window">
				<section>
					<TextField
						label="Dataset Name"
						onChange={(e) => {
							formDispatch({
								type: "UPDATE",
								payload: { name: e.target.value },
							});
						}}
					/>
					<br />
					<TextField
						label="Dataset Description"
						multiline
						onChange={(e) => {
							formDispatch({
								type: "UPDATE",
								payload: { description: e.target.value },
							});
						}}
					/>
				</section>
			</section>

			<h2 className="content-title">Provide a Date Range</h2>

			<section id="date-range" className="content-window">
				<section>
					<ButtonGroup
						size="large"
						color="primary"
						aria-label="large outlined primary button group"
					>
						<Button
							onClick={() => {
								selectDate(30);
							}}
						>
							Last 30 Days
						</Button>
						<Button
							onClick={() => {
								selectDate(60);
							}}
						>
							Last 60 Days
						</Button>
						<Button
							onClick={() => {
								selectDate(9999);
							}}
						>
							All-Time
						</Button>
					</ButtonGroup>
					<span className="custom-range-title">
						<span className="note">
							* Click icon to show calender
						</span>
					</span>
					<DateRangePicker
						value={[state.startDate, state.endDate]}
						onChange={handleDateChange}
					/>
				</section>

				<footer>
					<HtmlTooltip
						placement="top-start"
						interactive
						TransitionComponent={Fade}
						title={
							<>
								<Typography variant="h5">
									Choosing a Date Range
								</Typography>
								<Typography variant="body1">
									<em>{"And here's"}</em> <b>{"some"}</b>{" "}
									<u>{"amazing content"}</u>.{" "}
									{"It's very engaging. Right?"}
									<br />
									<a href="">Learn more...</a>
								</Typography>
							</>
						}
					>
						<span className="txt-icon guide txt-sm">
							<i>
								<img src="assets/icons/guides.svg" alt="" />
							</i>
							<span>Choosing a Date Range</span>
						</span>
					</HtmlTooltip>
				</footer>
			</section>

			<h2 className="content-title">Options For Analysis</h2>

			<section id="household-duration" className="content-window">
				<header>
					<div className="content-window-title">
						Duration of Household Storage and Use (Units in Hours)
					</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="range">
						<label htmlFor="HouseholdDuration" className="labels">
							{FromSlider_HouseholdDuration_Hours.map((hour) => (
								<span key={hour.value}>
									<span>{hour.value}</span>
								</span>
							))}
						</label>
						<FormSlider
							name="household-duration"
							aria-label="Household Duration"
							marks={FromSlider_HouseholdDuration_Hours}
							valueLabelDisplay="on"
							min={3}
							max={24}
							step={3}
							valueLabelDisplay={"off"}
							value={state.duration}
							onChange={(_e, duration) => {
								formDispatch({
									type: "UPDATE",
									payload: { duration },
								});
							}}
						/>
					</div>
				</section>

				<footer>
					<HtmlTooltip
						placement="top-start"
						interactive
						TransitionComponent={Fade}
						title={
							<>
								<Typography variant="h5">
									How should I determine the storage time?
								</Typography>
								<Typography variant="body1">
									<em>{"And here's"}</em> <b>{"some"}</b>{" "}
									<u>{"amazing content"}</u>.{" "}
									{"It's very engaging. Right?"}
								</Typography>
							</>
						}
					>
						<span className="txt-icon guide txt-sm">
							<i>
								<img src="assets/icons/guides.svg" alt="" />
							</i>
							<span>
								How should I determine the storage time?
							</span>
						</span>
					</HtmlTooltip>
				</footer>
			</section>

			<Accordion id="confidence-level" className="content-window">
				<AccordionSummary
					className="header"
					expandIcon={<MuiAccordionExpandMoreIcon />}
				>
					<div className="content-window-title">
						Modelling Confidence Level (Optional)
					</div>
					<div className="section-options"></div>
				</AccordionSummary>

				<AccordionDetails>
					<section className="section">
						<FormControl component="fieldset">
							<FormLabel component="legend">Gender</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="gender1"
								value={state.confidence}
								onChange={(_e, confidence) => {
									formDispatch({
										type: "UPDATE",
										payload: { confidence },
									});
								}}
							>
								<FormControlLabel
									value="minimum"
									control={<Radio color="primary" />}
									label="Minimum Decay"
								/>
								<FormControlLabel
									value="optimum"
									control={<Radio color="primary" />}
									label="Optimum Decay"
								/>
								<FormControlLabel
									value="maximum"
									control={<Radio color="primary" />}
									label="Maximum Decay"
								/>
							</RadioGroup>
						</FormControl>
					</section>

					<footer className="footer">
						<HtmlTooltip
							placement="top-start"
							interactive
							TransitionComponent={Fade}
							title={
								<>
									<Typography variant="h5">
										Which scenario should I choose?
									</Typography>
									<Typography variant="body1">
										<em>{"And here's"}</em> <b>{"some"}</b>{" "}
										<u>{"amazing content"}</u>.{" "}
										{"It's very engaging. Right?"}
									</Typography>
								</>
							}
						>
							<span className="txt-icon guide txt-sm">
								<i>
									<img src="assets/icons/guides.svg" alt="" />
								</i>
								<span>Which scenario should I choose?</span>
							</span>
						</HtmlTooltip>
					</footer>
				</AccordionDetails>
			</Accordion>

			<section id="" className="content-window">
				<section>
					<div className={"submission-wrap " + classes.root}>
						<Button
							color="primary"
							variant="contained"
							onClick={handleFormSubmit}
							disabled={disabled}
						>
							Analyze
						</Button>
						<Button
							type="reset"
							variant="contained"
							color="secondary"
							onClick={handleFormReset}
						>
							Reset
						</Button>
					</div>
				</section>

				<footer>
					<span className="txt-icon notice">
						<i>
							<img src="assets/icons/notice.svg" alt="" />
						</i>
						<span>Make sure all fields are filled out</span>
					</span>
				</footer>
			</section>
		</form>
	);
}

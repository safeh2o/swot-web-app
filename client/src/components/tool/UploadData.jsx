import React, {
	useEffect,
	useState,
	useRef
} from "react";

import FormSelectSearch from "../elements/FormSelectSearch";

// import FieldsitesDropdown from "../elements/FieldsitesDropdown";
import TextField from '@material-ui/core/TextField';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function UploadData(props) {

	// Demo Data
	const OptionsResponse = [
		{
			"name": "Afghanistan",
			"value": "AF"
		},
		{
			"name": "\u00c5land Islands",
			"value": "AX"
		},
		{
			"name": "Albania",
			"value": "AL"
		},
		{
			"name": "Algeria",
			"value": "DZ"
		},
		{
			"name": "American Samoa",
			"value": "AS"
		},
		{
			"name": "Andorra",
			"value": "AD"
		},
		{
			"name": "Angola",
			"value": "AO"
		},
		{
			"name": "Anguilla",
			"value": "AI"
		},
		{
			"name": "Antarctica",
			"value": "AQ"
		},
		{
			"name": "Antigua and Barbuda",
			"value": "AG"
		},
		{
			"name": "Argentina",
			"value": "AR"
		},
		{
			"name": "Armenia",
			"value": "AM"
		},
		{
			"name": "Aruba",
			"value": "AW"
		},
		{
			"name": "Australia",
			"value": "AU"
		},
		{
			"name": "Austria",
			"value": "AT"
		},
		{
			"name": "Azerbaijan",
			"value": "AZ"
		},
		{
			"name": "Bahamas",
			"value": "BS"
		},
		{
			"name": "Bahrain",
			"value": "BH"
		},
		{
			"name": "Bangladesh",
			"value": "BD"
		},
		{
			"name": "Barbados",
			"value": "BB"
		},
		{
			"name": "Belarus",
			"value": "BY"
		},
		{
			"name": "Belgium",
			"value": "BE"
		},
		{
			"name": "Belize",
			"value": "BZ"
		},
		{
			"name": "Benin",
			"value": "BJ"
		},
		{
			"name": "Bermuda",
			"value": "BM"
		},
		{
			"name": "Bhutan",
			"value": "BT"
		},
		{
			"name": "Bolivia, Plurinational State of",
			"value": "BO"
		},
		{
			"name": "Bonaire, Sint Eustatius and Saba",
			"value": "BQ"
		},
		{
			"name": "Bosnia and Herzegovina",
			"value": "BA"
		},
		{
			"name": "Botswana",
			"value": "BW"
		},
		{
			"name": "Bouvet Island",
			"value": "BV"
		},
		{
			"name": "Brazil",
			"value": "BR"
		},
		{
			"name": "British Indian Ocean Territory",
			"value": "IO"
		},
		{
			"name": "Brunei Darussalam",
			"value": "BN"
		},
		{
			"name": "Bulgaria",
			"value": "BG"
		},
		{
			"name": "Burkina Faso",
			"value": "BF"
		},
		{
			"name": "Burundi",
			"value": "BI"
		},
		{
			"name": "Cambodia",
			"value": "KH"
		},
		{
			"name": "Cameroon",
			"value": "CM"
		},
		{
			"name": "Canada",
			"value": "CA"
		},
		{
			"name": "Cape Verde",
			"value": "CV"
		},
		{
			"name": "Cayman Islands",
			"value": "KY"
		},
		{
			"name": "Central African Republic",
			"value": "CF"
		},
		{
			"name": "Chad",
			"value": "TD"
		},
		{
			"name": "Chile",
			"value": "CL"
		},
		{
			"name": "China",
			"value": "CN"
		},
		{
			"name": "Christmas Island",
			"value": "CX"
		},
		{
			"name": "Cocos (Keeling) Islands",
			"value": "CC"
		},
		{
			"name": "Colombia",
			"value": "CO"
		},
		{
			"name": "Comoros",
			"value": "KM"
		},
		{
			"name": "Congo",
			"value": "CG"
		},
		{
			"name": "Congo, the Democratic Republic of the",
			"value": "CD"
		},
		{
			"name": "Cook Islands",
			"value": "CK"
		},
		{
			"name": "Costa Rica",
			"value": "CR"
		},
		{
			"name": "C\u00f4te d'Ivoire",
			"value": "CI"
		},
		{
			"name": "Croatia",
			"value": "HR"
		},
		{
			"name": "Cuba",
			"value": "CU"
		},
		{
			"name": "Cura\u00e7ao",
			"value": "CW"
		},
		{
			"name": "Cyprus",
			"value": "CY"
		},
		{
			"name": "Czech Republic",
			"value": "CZ"
		},
		{
			"name": "Denmark",
			"value": "DK"
		},
		{
			"name": "Djibouti",
			"value": "DJ"
		},
		{
			"name": "Dominica",
			"value": "DM"
		},
		{
			"name": "Dominican Republic",
			"value": "DO"
		},
		{
			"name": "Ecuador",
			"value": "EC"
		},
		{
			"name": "Egypt",
			"value": "EG"
		},
		{
			"name": "El Salvador",
			"value": "SV"
		},
		{
			"name": "Equatorial Guinea",
			"value": "GQ"
		},
		{
			"name": "Eritrea",
			"value": "ER"
		},
		{
			"name": "Estonia",
			"value": "EE"
		},
		{
			"name": "Ethiopia",
			"value": "ET"
		},
		{
			"name": "Falkland Islands (Malvinas)",
			"value": "FK"
		},
		{
			"name": "Faroe Islands",
			"value": "FO"
		},
		{
			"name": "Fiji",
			"value": "FJ"
		},
		{
			"name": "Finland",
			"value": "FI"
		},
		{
			"name": "France",
			"value": "FR"
		},
		{
			"name": "French Guiana",
			"value": "GF"
		},
		{
			"name": "French Polynesia",
			"value": "PF"
		},
		{
			"name": "French Southern Territories",
			"value": "TF"
		},
		{
			"name": "Gabon",
			"value": "GA"
		},
		{
			"name": "Gambia",
			"value": "GM"
		},
		{
			"name": "Georgia",
			"value": "GE"
		},
		{
			"name": "Germany",
			"value": "DE"
		},
		{
			"name": "Ghana",
			"value": "GH"
		},
		{
			"name": "Gibraltar",
			"value": "GI"
		},
		{
			"name": "Greece",
			"value": "GR"
		},
		{
			"name": "Greenland",
			"value": "GL"
		},
		{
			"name": "Grenada",
			"value": "GD"
		},
		{
			"name": "Guadeloupe",
			"value": "GP"
		},
		{
			"name": "Guam",
			"value": "GU"
		},
		{
			"name": "Guatemala",
			"value": "GT"
		},
		{
			"name": "Guernsey",
			"value": "GG"
		},
		{
			"name": "Guinea",
			"value": "GN"
		},
		{
			"name": "Guinea-Bissau",
			"value": "GW"
		},
		{
			"name": "Guyana",
			"value": "GY"
		},
		{
			"name": "Haiti",
			"value": "HT"
		},
		{
			"name": "Heard Island and McDonald Islands",
			"value": "HM"
		},
		{
			"name": "Holy See (Vatican City State)",
			"value": "VA"
		},
		{
			"name": "Honduras",
			"value": "HN"
		},
		{
			"name": "Hong Kong",
			"value": "HK"
		},
		{
			"name": "Hungary",
			"value": "HU"
		},
		{
			"name": "Iceland",
			"value": "IS"
		},
		{
			"name": "India",
			"value": "IN"
		},
		{
			"name": "Indonesia",
			"value": "ID"
		},
		{
			"name": "Iran, Islamic Republic of",
			"value": "IR"
		},
		{
			"name": "Iraq",
			"value": "IQ"
		},
		{
			"name": "Ireland",
			"value": "IE"
		},
		{
			"name": "Isle of Man",
			"value": "IM"
		},
		{
			"name": "Israel",
			"value": "IL"
		},
		{
			"name": "Italy",
			"value": "IT"
		},
		{
			"name": "Jamaica",
			"value": "JM"
		},
		{
			"name": "Japan",
			"value": "JP"
		},
		{
			"name": "Jersey",
			"value": "JE"
		},
		{
			"name": "Jordan",
			"value": "JO"
		},
		{
			"name": "Kazakhstan",
			"value": "KZ"
		},
		{
			"name": "Kenya",
			"value": "KE"
		},
		{
			"name": "Kiribati",
			"value": "KI"
		},
		{
			"name": "Korea, Democratic People's Republic of",
			"value": "KP"
		},
		{
			"name": "Korea, Republic of",
			"value": "KR"
		},
		{
			"name": "Kuwait",
			"value": "KW"
		},
		{
			"name": "Kyrgyzstan",
			"value": "KG"
		},
		{
			"name": "Lao People's Democratic Republic",
			"value": "LA"
		},
		{
			"name": "Latvia",
			"value": "LV"
		},
		{
			"name": "Lebanon",
			"value": "LB"
		},
		{
			"name": "Lesotho",
			"value": "LS"
		},
		{
			"name": "Liberia",
			"value": "LR"
		},
		{
			"name": "Libya",
			"value": "LY"
		},
		{
			"name": "Liechtenstein",
			"value": "LI"
		},
		{
			"name": "Lithuania",
			"value": "LT"
		},
		{
			"name": "Luxembourg",
			"value": "LU"
		},
		{
			"name": "Macao",
			"value": "MO"
		},
		{
			"name": "Macedonia, the Former Yugoslav Republic of",
			"value": "MK"
		},
		{
			"name": "Madagascar",
			"value": "MG"
		},
		{
			"name": "Malawi",
			"value": "MW"
		},
		{
			"name": "Malaysia",
			"value": "MY"
		},
		{
			"name": "Maldives",
			"value": "MV"
		},
		{
			"name": "Mali",
			"value": "ML"
		},
		{
			"name": "Malta",
			"value": "MT"
		},
		{
			"name": "Marshall Islands",
			"value": "MH"
		},
		{
			"name": "Martinique",
			"value": "MQ"
		},
		{
			"name": "Mauritania",
			"value": "MR"
		},
		{
			"name": "Mauritius",
			"value": "MU"
		},
		{
			"name": "Mayotte",
			"value": "YT"
		},
		{
			"name": "Mexico",
			"value": "MX"
		},
		{
			"name": "Micronesia, Federated States of",
			"value": "FM"
		},
		{
			"name": "Moldova, Republic of",
			"value": "MD"
		},
		{
			"name": "Monaco",
			"value": "MC"
		},
		{
			"name": "Mongolia",
			"value": "MN"
		},
		{
			"name": "Montenegro",
			"value": "ME"
		},
		{
			"name": "Montserrat",
			"value": "MS"
		},
		{
			"name": "Morocco",
			"value": "MA"
		},
		{
			"name": "Mozambique",
			"value": "MZ"
		},
		{
			"name": "Myanmar",
			"value": "MM"
		},
		{
			"name": "Namibia",
			"value": "NA"
		},
		{
			"name": "Nauru",
			"value": "NR"
		},
		{
			"name": "Nepal",
			"value": "NP"
		},
		{
			"name": "Netherlands",
			"value": "NL"
		},
		{
			"name": "New Caledonia",
			"value": "NC"
		},
		{
			"name": "New Zealand",
			"value": "NZ"
		},
		{
			"name": "Nicaragua",
			"value": "NI"
		},
		{
			"name": "Niger",
			"value": "NE"
		},
		{
			"name": "Nigeria",
			"value": "NG"
		},
		{
			"name": "Niue",
			"value": "NU"
		},
		{
			"name": "Norfolk Island",
			"value": "NF"
		},
		{
			"name": "Northern Mariana Islands",
			"value": "MP"
		},
		{
			"name": "Norway",
			"value": "NO"
		},
		{
			"name": "Oman",
			"value": "OM"
		},
		{
			"name": "Pakistan",
			"value": "PK"
		},
		{
			"name": "Palau",
			"value": "PW"
		},
		{
			"name": "Palestine, State of",
			"value": "PS"
		},
		{
			"name": "Panama",
			"value": "PA"
		},
		{
			"name": "Papua New Guinea",
			"value": "PG"
		},
		{
			"name": "Paraguay",
			"value": "PY"
		},
		{
			"name": "Peru",
			"value": "PE"
		},
		{
			"name": "Philippines",
			"value": "PH"
		},
		{
			"name": "Pitcairn",
			"value": "PN"
		},
		{
			"name": "Poland",
			"value": "PL"
		},
		{
			"name": "Portugal",
			"value": "PT"
		},
		{
			"name": "Puerto Rico",
			"value": "PR"
		},
		{
			"name": "Qatar",
			"value": "QA"
		},
		{
			"name": "R\u00e9union",
			"value": "RE"
		},
		{
			"name": "Romania",
			"value": "RO"
		},
		{
			"name": "Russian Federation",
			"value": "RU"
		},
		{
			"name": "Rwanda",
			"value": "RW"
		},
		{
			"name": "Saint Barth\u00e9lemy",
			"value": "BL"
		},
		{
			"name": "Saint Helena, Ascension and Tristan da Cunha",
			"value": "SH"
		},
		{
			"name": "Saint Kitts and Nevis",
			"value": "KN"
		},
		{
			"name": "Saint Lucia",
			"value": "LC"
		},
		{
			"name": "Saint Martin (French part)",
			"value": "MF"
		},
		{
			"name": "Saint Pierre and Miquelon",
			"value": "PM"
		},
		{
			"name": "Saint Vincent and the Grenadines",
			"value": "VC"
		},
		{
			"name": "Samoa",
			"value": "WS"
		},
		{
			"name": "San Marino",
			"value": "SM"
		},
		{
			"name": "Sao Tome and Principe",
			"value": "ST"
		},
		{
			"name": "Saudi Arabia",
			"value": "SA"
		},
		{
			"name": "Senegal",
			"value": "SN"
		},
		{
			"name": "Serbia",
			"value": "RS"
		},
		{
			"name": "Seychelles",
			"value": "SC"
		},
		{
			"name": "Sierra Leone",
			"value": "SL"
		},
		{
			"name": "Singapore",
			"value": "SG"
		},
		{
			"name": "Sint Maarten (Dutch part)",
			"value": "SX"
		},
		{
			"name": "Slovakia",
			"value": "SK"
		},
		{
			"name": "Slovenia",
			"value": "SI"
		},
		{
			"name": "Solomon Islands",
			"value": "SB"
		},
		{
			"name": "Somalia",
			"value": "SO"
		},
		{
			"name": "South Africa",
			"value": "ZA"
		},
		{
			"name": "South Georgia and the South Sandwich Islands",
			"value": "GS"
		},
		{
			"name": "South Sudan",
			"value": "SS"
		},
		{
			"name": "Spain",
			"value": "ES"
		},
		{
			"name": "Sri Lanka",
			"value": "LK"
		},
		{
			"name": "Sudan",
			"value": "SD"
		},
		{
			"name": "Suriname",
			"value": "SR"
		},
		{
			"name": "Svalbard and Jan Mayen",
			"value": "SJ"
		},
		{
			"name": "Swaziland",
			"value": "SZ"
		},
		{
			"name": "Sweden",
			"value": "SE"
		},
		{
			"name": "Switzerland",
			"value": "CH"
		},
		{
			"name": "Syrian Arab Republic",
			"value": "SY"
		},
		{
			"name": "Taiwan, Province of China",
			"value": "TW"
		},
		{
			"name": "Tajikistan",
			"value": "TJ"
		},
		{
			"name": "Tanzania, United Republic of",
			"value": "TZ"
		},
		{
			"name": "Thailand",
			"value": "TH"
		},
		{
			"name": "Timor-Leste",
			"value": "TL"
		},
		{
			"name": "Togo",
			"value": "TG"
		},
		{
			"name": "Tokelau",
			"value": "TK"
		},
		{
			"name": "Tonga",
			"value": "TO"
		},
		{
			"name": "Trinidad and Tobago",
			"value": "TT"
		},
		{
			"name": "Tunisia",
			"value": "TN"
		},
		{
			"name": "Turkey",
			"value": "TR"
		},
		{
			"name": "Turkmenistan",
			"value": "TM"
		},
		{
			"name": "Turks and Caicos Islands",
			"value": "TC"
		},
		{
			"name": "Tuvalu",
			"value": "TV"
		},
		{
			"name": "Uganda",
			"value": "UG"
		},
		{
			"name": "Ukraine",
			"value": "UA"
		},
		{
			"name": "United Arab Emirates",
			"value": "AE"
		},
		{
			"name": "United Kingdom",
			"value": "GB"
		},
		{
			"name": "United States",
			"value": "US"
		},
		{
			"name": "United States Minor Outlying Islands",
			"value": "UM"
		},
		{
			"name": "Uruguay",
			"value": "UY"
		},
		{
			"name": "Uzbekistan",
			"value": "UZ"
		},
		{
			"name": "Vanuatu",
			"value": "VU"
		},
		{
			"name": "Venezuela, Bolivarian Republic of",
			"value": "VE"
		},
		{
			"name": "Viet Nam",
			"value": "VN"
		},
		{
			"name": "Virgin Islands, British",
			"value": "VG"
		},
		{
			"name": "Virgin Islands, U.S.",
			"value": "VI"
		},
		{
			"name": "Wallis and Futuna",
			"value": "WF"
		},
		{
			"name": "Western Sahara",
			"value": "EH"
		},
		{
			"name": "Yemen",
			"value": "YE"
		},
		{
			"name": "Zambia",
			"value": "ZM"
		},
		{
			"name": "Zimbabwe",
			"value": "ZW"
		}
	];
	const OptionsArea = [
		{
			"name": "Afghanistan",
			"value": "slug1"
		},
		{
			"name": "Arbat IDP",
			"value": "slug2"
		},
		{
			"name": "Bardarash",
			"value": "slug3"
		},
		{
			"name": "Essian",
			"value": "slug4"
		},
		{
			"name": "Garmawa",
			"value": "slug5"
		},
	];
	const OptionsFieldsites = [
		{
			"name": "Afghanistan",
			"value": "slug1"
		},
		{
			"name": "Arbat IDP",
			"value": "slug2"
		},
		{
			"name": "Bardarash",
			"value": "slug3"
		},
		{
			"name": "Essian",
			"value": "slug4"
		},
		{
			"name": "Garmawa",
			"value": "slug5"
		},
	];

	// Definitions
	const fileInput = useRef(null);
	const detailsModal = useRef(null);
	const uploadForm = useRef(null);
	const fileInfo = useRef(null)

	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileCount, setFileCount] = useState(0);

	// Custom Functions
	useEffect(() => {
		initModalListeners();

		return () => {
			clearModalListeners();
		};
	}, []);

	useEffect(() => {
		setFileCount(uploadedFiles.length);
	}, [uploadedFiles]);

	const onHideModal = () => {
		hideSpinner();
		uploadForm.reset();
	};

	const hideModal = () => {
		$(detailsModal.current).modal("hide");
	};

	const initModalListeners = () => {
		detailsModal.current.addEventListener("hidden.bs.modal", onHideModal);
	};

	const clearModalListeners = () => {
		if (detailsModal.current) {
			detailsModal.current.removeEventListener(
				"hidden.bs.modal",
				onHideModal
			);
		}
	};

	const handleFiles = (fileList) => {
		if (!fileList || !fileList.length) {
			return;
		}

		setUploadedFiles(fileList);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (!uploadedFiles.length) {
			shakeElement($(fileInfo.current));
			return;
		}

		const formData = new FormData();
		for (let i = 0; i < uploadedFiles.length; i++) {
			formData.append("uploaded_files", uploadedFiles[i]);
		}
		formData.append("fieldsite", uploadForm.current.fieldsite.value);
		formData.append("overwrite", uploadForm.current.overwrite.value);

		showSpinner();
		fetch("/api/upload/append", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((res) => {
				hideModal();
				const uploaded_count = res.uploaded_count;
				showConfirmModal(`Uploaded ${uploaded_count} file(s).`);
			})
			.catch((err) => {
				logError(err);
			})
			.finally(() => {
				hideSpinner();
			});
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		handleDrag(e);

		handleFiles(e.dataTransfer.files);
	};

	return (
		<form>

			<h2 className="content-title">Choose a Location</h2>

			<section className="content-window">
				<header>
					<div className="content-window-title">Location</div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="flex-group">
						<label className="space">
							<FormSelectSearch options={OptionsResponse} icon={true} />
							<span className="label">Country</span>
						</label>
						<label className="space">
							<FormSelectSearch options={OptionsArea} />
							<span className="label">Area</span>
						</label>
						<label className="space">
							<FormSelectSearch options={OptionsFieldsites} />
							<span className="label">Fieldsite</span>
						</label>
					</div>
				</section>
				<footer>
					<span className="txt-icon notice txt-sm">
						<i><img src="assets/icons/notice.svg" alt="" /></i>
						<span>Cant find your Area or Fieldsite?  ...  <a href="/contact">Contact Us</a></span>
					</span>
				</footer>
			</section>

			<h2 className="content-title">Upload Data</h2>

			<section className="content-window">
				<header>
					<div className="content-window-title">Add File(s) <i><img src="assets/icons/asterix.svg" alt="" /></i></div>
					<div className="section-options"></div>
				</header>
				<section>
					<div className="upload">

						<div className="upload-box" id="dropbox" ref={detailsModal}>

							<input type="file" accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style={{ display: 'none' }} multiple="" name="uploaded_files" />

							<img className="upload_logo mt-3" src="assets/icons/upload.svg" alt="upload icon" />

							<p className="txt-sm">Drag and Drop files here <br />* <span className="underline">.csv</span>&nbsp;&nbsp;<span className="underline">.xlsx</span><span className="or">or</span></p>

							<button className="button blue">Choose Files to Upload</button>

							<p className="txt-sm selected">0 File(s) Selected</p>

						</div>

					</div>

				</section>

				<footer>

					<div className="txt-icon notice txt-sm">
						<i><img src="assets/icons/notice.svg" alt="" /></i>
						<span>Ensure all required columns have data ... <a href="#">whats this?</a></span>
					</div>

					<div className="txt-icon notice txt-sm">
						<i><img src="assets/icons/notice.svg" alt="" /></i>
						<span>Save your dataset either as a .csv or .xlsx file.</span>
					</div>

				</footer>

			</section>

			<section id="news" className="content-window">
				<header>
					<div className="content-window-title">Upload Settings</div>
					<div className="section-options"></div>
				</header>
				<section>
					{/* {/* <!-- --> */}
					<label htmlFor="OverwriteDuplicate" className="checkbox block">
						<input
							type="checkbox"
							className="checkbox-input"
							name="OverwriteDuplicate"
							id="OverwriteDuplicate"
						/>
						<span className="label">Overwrite Duplicate Entries?</span>
					</label>
				</section>
				<footer>

					<span className="txt-icon notice txt-sm">
						<i><img src="assets/icons/notice.svg" alt="" /></i>
						<span>Duplicates are rows with the same dates and times</span>
					</span>

				</footer>
			</section>

			<section id="" className="content-window">
				<section>
					<div className="submission-wrap">
						<input type="submit" value="Upload" className="button green" />
						<input type="reset" value="Reset Fields" className="button" />
					</div>
				</section>

				<footer>

					<span className="txt-icon notice txt-sm">
						<i><img src="assets/icons/notice.svg" alt="" /></i>
						<span>Make sure all fields are filled out</span>
					</span>

				</footer>

			</section>

		</form>
	);
}

import React from "react";
import FormSelectSearch from "../elements/FormSelectSearch";
// Styles
import { withStyles, makeStyles } from '@material-ui/core/styles';
// Slider
import Slider from '@material-ui/core/Slider';
// Accordion
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Date Picker
import TextField from '@material-ui/core/TextField';
const dateFormat = "YYYY-MM-DD";
// Tool Tip
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const FromSlider_HouseholdDuration_Hours = [
  { value: 3, },
  { value: 6, },
  { value: 9, },
  { value: 12, },
  { value: 15, },
  { value: 18, },
  { value: 21, },
  { value: 24, },
]

const SliderThumbBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const FormSlider = withStyles({
  root: {
    color: '#4069b1',
    height: 10,
    padding: '15px 0',
  },
  thumb: {
    height: '2.6rem',
    width: '2.6rem',
    backgroundColor: '#4069b1',
    boxShadow: SliderThumbBoxShadow,
    marginTop: '-1rem',
    marginLeft: '-1.3rem',
    '&:focus, &:hover, &$active': {
      transform: 'scale(1.1)',
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: SliderThumbBoxShadow,
      },
    },
  },
  active: {

  },
  track: {
    height: 10,
  },
  rail: {
    height: 10,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 15,
    width: 2,
    marginTop: -5,
    marginLeft: -1,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

const Accordion = withStyles({
  root: {
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '20px 20px 40px',
    },
  },
  expanded: {
    margin: 0
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid #dde6ed',
    margin: 0,
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {
    margin: 0
  },
  expandIcon: {
    padding: '0 12px 0 0',
  }
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    padding: '0',
    flexDirection: 'column',
  },
}))(MuiAccordionDetails);

// Guides
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 380,
    border: '2px solid #dadde9',
    padding: '20px 30px',
    boxShadow: '4px 4px 5px rgb(0, 0, 0, .10)',
  },
}))(Tooltip);

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

export default class SendForAnalysis extends React.Component {
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
      <form
        role="form"
        autoComplete="off"
        ref={this.analyzeForm}
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}>

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
            <span className="txt-icon notice">
              <i><img src="assets/icons/notice.svg" alt="" /></i>
              <span>Cant find your Area or Fieldsite?  ...  <a href="/contact">Contact Us</a></span>
            </span>
          </footer>
        </section>

        <h2 className="content-title">Provide a Date Range</h2>

        <section id="date-range" className="content-window">

          <section>
            <span className="predefined-range-title">Pre Defined</span>
            {/* {/* <!-- --> */}
            <label className="radio block">
              <input type="radio" className="radio-input" name="range-option" id="range30" />
              <span className="label">Last 30 Days</span>
            </label>
            {/* <!-- --> */}
            <label className="radio block">
              <input type="radio" className="radio-input" name="range-option" id="range60" />
              <span className="label">Last 60 Days</span>
            </label>
            {/* <!-- --> */}
            <label className="radio block">
              <input type="radio" className="radio-input" name="range-option" id="rangeAll" />
              <span className="label">All data Available</span>
            </label>
            {/* <!-- --> */}
            <div className="custom-range">
              <span className="custom-range-title">Custom Range: <span className="note">* Click icon to show calender</span></span>
              <div className="flex-group">
                <div className="space">
                  <label htmlFor="startDate">
                    <span className="datepicker-toggle">
                      <span className="datepicker-toggle-button"></span>
                      {/* 
                        [pattern="\d{4}-\d{2}-\d{2}"] fallback for text input to normalize YYYY-MM-DD input
                      */}
                      <TextField
                        id="startDate"
                        name="startDate"
                        label=""
                        type="date"
                        defaultValue="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        className="datepicker-input"
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </span>
                    <span className="label">Start Date</span>
                  </label>
                </div>
                <div>
                  <label htmlFor="endDate">
                    <span className="datepicker-toggle">
                      <span className="datepicker-toggle-button"></span>
                      {/* [pattern="\d{4}-\d{2}-\d{2}"] fallback for text input to normalize YYYY-MM-DD input */}
                      <TextField
                        id="endDate"
                        name="endDate"
                        label=""
                        type="date"
                        defaultValue="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        className="datepicker-input"
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </span>
                    <span className="label">End Date</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <footer>

            <HtmlTooltip
              placement="top-start"
              interactive
              TransitionComponent={Fade}
              title={
                <React.Fragment>
                  <Typography variant="h5">Choosing a Date Range</Typography>
                  <Typography variant="body1">
                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '} {"It's very engaging. Right?"}<br />
                    <a href="">Learn more...</a>
                  </Typography>
                </React.Fragment>
              }
            >
              <span className="txt-icon guide txt-sm">
                <i><img src="assets/icons/guides.svg" alt="" /></i>
                <span>Choosing a Date Range</span>
              </span>
            </HtmlTooltip>

          </footer>

        </section>

        <h2 className="content-title">Options For Analysis</h2>

        <section id="household-duration" className="content-window">

          <header>
            <div className="content-window-title">Duration of Household Storage and Use (Units in Hours)</div>
            <div className="section-options"></div>
          </header>
          <section>
            <div className="range">
              <label htmlFor="HouseholdDuration" className="labels">
                {FromSlider_HouseholdDuration_Hours.map(hour => (
                  <span key={hour.value}><span>{hour.value}</span></span>
                ))}
              </label>
              <FormSlider
                name="household-duration"
                aria-label="Household Duration"
                defaultValue={3}
                marks={FromSlider_HouseholdDuration_Hours}
                valueLabelDisplay="on"
                min={3}
                max={24}
                step={3}
                valueLabelDisplay={'off'}
              />
            </div>
          </section>

          <footer>

            <HtmlTooltip
              placement="top-start"
              interactive
              TransitionComponent={Fade}
              title={
                <React.Fragment>
                  <Typography variant="h5">How should I determine the storage time?</Typography>
                  <Typography variant="body1">
                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '} {"It's very engaging. Right?"}
                  </Typography>
                </React.Fragment>
              }
            >
              <span className="txt-icon guide txt-sm">
                <i><img src="assets/icons/guides.svg" alt="" /></i>
                <span>How should I determine the storage time?</span>
              </span>
            </HtmlTooltip>

          </footer>

        </section>

        <Accordion id="confidence-level" className="content-window">

          <AccordionSummary className="header" expandIcon={<MuiAccordionExpandMoreIcon />}>

            <div className="content-window-title">Modelling Confidence Level (Optional)</div>
            <div className="section-options"></div>

          </AccordionSummary>

          <AccordionDetails>

            <section className="section">

              {/* {/* <!-- --> */}
              <label htmlFor="mediumDecayScenario" className="radio block">
                <input
                  type="radio"
                  className="radio-input"
                  name="DecayScenario"
                  id="mediumDecayScenario"
                />
                <span className="label">Medium Decay Scenario</span>
              </label>

              {/* <!-- --> */}
              <label htmlFor="BalancedDecayScenario" className="radio block">
                <input
                  type="radio"
                  className="radio-input"
                  name="DecayScenario"
                  id="BalancedDecayScenario"
                />
                <span className="label">Optimum / Balanced Decay Scenario</span>
              </label>

              {/* <!-- --> */}
              <label htmlFor="MaximumDecayScenario" className="radio block">
                <input
                  type="radio"
                  className="radio-input"
                  name="DecayScenario"
                  id="MaximumDecayScenario"
                />
                <span className="label">Maximum Decay Scenario</span>
              </label>

            </section>

            <footer className="footer">

              <HtmlTooltip
                placement="top-start"
                interactive
                TransitionComponent={Fade}
                title={
                  <React.Fragment>
                    <Typography variant="h5">Which scenario should I choose?</Typography>
                    <Typography variant="body1">
                      <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '} {"It's very engaging. Right?"}
                    </Typography>
                  </React.Fragment>
                }
              >
                <span className="txt-icon guide txt-sm">
                  <i><img src="assets/icons/guides.svg" alt="" /></i>
                  <span>Which scenario should I choose?</span>
                </span>
              </HtmlTooltip>

            </footer>

          </AccordionDetails>

        </Accordion>

        <section id="" className="content-window">
          <section>
            <div className="submission-wrap">
              <input type="submit" value="Run Analysis" className="button green" readOnly />
              <input type="reset" value="Reset Fields" className="button" readOnly />
            </div>
          </section>

          <footer>

            <span className="txt-icon notice">
              <i><img src="assets/icons/notice.svg" alt="" /></i>
              <span>Make sure all fields are filled out</span>
            </span>

          </footer>

        </section>

      </form>
    );
  }
}

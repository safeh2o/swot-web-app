export const Common = {
	cardElement: {
		overflow: "visible",
		marginBottom: "30px",
		"& h1": {
			marginBottom: "1em",
		},
		"& .MuiCardContent-root": {
			p: 2,
			"&:last-child": {
				p: 2,
			},
		},
		"& .MuiAccordionSummary-expandIconWrapper": {
			"& svg": {
				width: "0.92em",
				height: "0.92em",
			},
		},
	},
	cardSubmit: {
		"& button": { textTransform: "capitalize" },
		"& #btnSubmit": {
			color: "white",
			mb: 1,
		},
	},
	//
	buttonBackToResults: {
		display: "block",
		fontSize: "0.85em",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "#3f4549",
		borderRadius: "2px",
		color: "#fcfcfc",
		width: "100%",
		py: 1,
		px: 2,
		mb: 3,
		"&:hover": {
			color: "currentColor",
			backgroundColor: "#eee",
		},
	},
	//
	sectionHeader: {
		mb: 2,
		fontSize: "1.45rem",
		fontWeight: "400",
		fontFamily: '"Roboto Condensed", sans-serif',
		lineHeight: "1.2",
		letterSpacing: "-0.02em",
		color: "#747e87",
		margin: "5px 0 10px 8px",
	},
};

export const CollectData = {
	...Common,
};

export const UploadData = {
	...Common,
	uploadLocation: {
		marginBottom: "0",
	},
	uploadDrop: {
		"& .MuiDropzoneArea-root": {
			maxWidth: "720px",
			minHeight: "225px",
			margin: "16px auto",
			backgroundColor: "#F9F9F9",
			backgrounImage:
				"url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CCCCCCFF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e\")",
			borderRadius: "8px",
			"& .MuiDropzoneArea-text": {
				marginTop: "40px",
				marginBottom: "20px",
			},
			"& .MuiDropzoneArea-textContainer": {
				color: "#929eac",
			},
			"& .MuiDropzoneArea-icon": {
				width: "6rem",
				height: "6rem",
				color: "#ccc",
				fill: "#ccc",
			},
			"& .MuiChip-root": {
				m: 2,
				backgroundColor: "primary.main",
				color: "#fff",
				"& .MuiSvgIcon-root": {
					color: "#fff",
				},
			},
		},
		"& .notification": {
			paddingLeft: "20px",
			paddingBottom: "8px",
		},
		"& .MuiFormGroup-root": {
			pl: 2,
		},
		"& .MuiCheckbox-root": {
			p: 1,
			"& svg": {
				fill: "#F9F9F9",
				"& .base": {
					boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
					filter: "drop-shadow( 1px 1px 1px rgba(0, 0, 0, .1))",
				},
			},
			"&:not(.Mui-checked)": {
				"& svg": {
					fill: "#F9F9F9",
					stroke: "#888",
					strokeWidth: "1px",
				},
			},
			"&.Mui-checked": {
				"& svg": {
					fill: "#466FB6",
					stroke: "#305ba8",
					strokeWidth: "3px",
					"& .check": {
						fill: "#fff",
						stroke: "none",
					},
				},
			},
		},
	},
};

export const AnalyzePage = {
	...Common,
	analyzeLocation: {
		marginBottom: "0",
	},
	analyzeDateRange: {
		zIndex: 10,
		"& .MuiButton-root": {
			textTransform: "none",
		},
		stackElement: {
			justifyContent: "start",
			alignContent: "start",
			maxWidth: "440px",
			"& .MuiButton-root": {
				typography: "caption",
				fontWeight: "500",
				color: "white",
				border: "none",
				padding: "6px 16px",
				marginBottom: "8px",
				width: "auto",
				boxShadow: "1px 1px 2px rgba(0,0,0,0.2)",
				"&:hover": {},
			},
		},
		"& .title": {
			color: "#929eac",
		},
		// @wojtekmaj/react-daterange-picker
		"& .react-daterange-picker": {
			width: "100%",
			maxWidth: "440px",
			marginTop: "48px",
			"& *": {
				fontFamily: "inherit",
			},
			"& .react-daterange-picker__wrapper": {
				width: "100%",
				flexWrap: "wrap",
				border: "none",
				justifyContent: "start",
			},
			"& .react-daterange-picker__inputGroup": {
				position: "relative",
				flex: { xs: "0 1 100%", sm: "0 1 45%" },
				flexWrap: "wrap",
				padding: 0,
				height: "auto",
				backgroundColor: "#f9f9f9",
				border: "1px solid",
				borderColor: "rgba(0, 0, 0, 0.23)",
				borderRadius: "4px",
				"& .react-date-picker__inputGroup__divider": {
					typography: { xs: "body1" },
				},
				"&::before": {
					position: "absolute",
					left: "8px",
					bottom: "calc(100% + 4px)",
					typography: "caption",
					fontWeight: "500",
					color: "#929eac",
				},
				"&:nth-of-type(1)": {
					marginBottom: { xs: "28px", sm: "16px" },
					marginRight: { sm: "8px" },
					"&::before": {
						content: '"from"',
					},
				},
				"&:not(:nth-of-type(1))::before": {
					content: '"to"',
				},
			},
			"& .react-daterange-picker__range-divider": {
				display: "none",
				flex: { xs: "0 1 100%", sm: "0 1 calc(10% - 4px)" },
				lineHeight: "0",
				background: "transparent",
				padding: "4px 6px",
				color: "#929eac",
				textAlign: "center",
			},
			"& .react-daterange-picker__calendar-button": {
				display: "inline-flex",
				alignItems: "center",
				padding: "4px",
				borderRadius: "4px",
				marginRight: "10px",
				color: "#929eac",
				"&:hover": {
					backgroundColor: "rgb(249, 249, 249)",
				},
			},
			"& .react-daterange-picker__clear-button": {
				display: "inline-flex",
				alignItems: "center",
				order: 2,
				fontSize: "1rem",
				color: "#929eac",
				backgroundColor: "rgb(249, 249, 249)",
			},
			"&.react-daterange-picker--closed": {
				"& .react-daterange-picker__clear-button": {
					display: "none",
				},
			},
			"&.react-daterange-picker--open": {
				"& .react-daterange-picker__calendar-button": {
					backgroundColor: "rgb(249, 249, 249)",
				},
			},
			'& [type="text"], & [type="number"], & .MuiTextField-root': {
				typography: "body1",
				fontWeight: "500!important",
				backgroundColor: "transparent",
				padding: "16.5px 16px",
			},
			"& .react-daterange-picker__wrapper > *": {
				marginBottom: "16px",
			},
			"& .react-daterange-picker__calendar": {
				"& .react-calendar": {
					boxShadow:
						"0px 2px 4px -1px rgba(0,0,0,0.1),0px 1px 4px 0px rgba(0,0,0,0.075),0px 2px 6px 0px rgba(0,0,0,0.05)",
				},
			},
			"& .": {},
		},
	},
	analyzeStorageDuration: {
		mb: 0,
		"& .MuiAccordionSummary-root": {
			typography: "h5",
			p: 2,
		},
		sliderWrapper: {
			px: 2,
			my: 2,
		},
		"& label": {
			display: "flex",
			justifyContent: "space-between",
			typography: "caption",
			fontWeight: "500",
			color: "#929eac",
			pt: 2,
			pb: 1,
			"& span": {
				position: "relative",
				flex: "0 1 auto",
				width: "2rem",
				textAlign: "center",
			},
			"& span:nth-of-type(1)": {
				marginLeft: "-1rem",
			},
			"& span:nth-last-of-type(1)": {
				marginRight: "-1rem",
			},
		},
		"& .MuiSlider-root": {
			"& .MuiSlider-valueLabel": {
				textAlign: "center",
				background: "#466FB6",
				"& .MuiSlider-valueLabelCircle::after": {
					display: "block",
					content: '"hrs"',
					fontSize: "75%",
				},
			},
		},
	},
	analyzeConfidenceLevel: {
		boxShadow: "inset 0px 3px 4px rgba(0,0,0,0.075)",
		"& .MuiAccordionSummary-root": {
			typography: "h5",
			p: 2,
		},
		"& .MuiAccordionDetails-root": {
			p: 2,
		},
		"& .MuiFormControl-root": {
			pl: 2,
			mb: 2,
		},
		"& .MuiRadio-root": {
			"& svg": {
				fill: "#F9F9F9",
				stroke: "rgba(0, 0, 0, 0.23)",
				strokeWidth: "1px",
			},
			"&.Mui-checked": {
				"& svg": {
					fill: "#466FB6",
					stroke: "#305ba8",
					strokeWidth: "3px",
				},
			},
		},
	},
};

export const ResultsPage = {
	...Common,
	grid: {
		border: "none",
		"& .MuiDataGrid-columnSeparator": {
			display: "none",
		},
		"& .MuiDataGrid-columnHeaders": {
			backgroundColor: "#fcfcfc",
		},
		"& .MuiTablePagination-select": {
			backgroundColor: "#f8f8f8",
			borderRadius: "4px",
		},
		"& .MuiDataGrid-columnHeaderTitleContainer, & .MuiDataGrid-footerContainer p":
			{
				typography: "caption",
				color: "#929eac",
				fontWeight: "500",
				marginBottom: "0",
			},
		"& .MuiDataGrid-columnHeaderTitleContainer button, & .MuiDataGrid-columnHeaderTitleContainer .MuiInputBase-root, & .MuiDataGrid-columnHeaderTitleContainer .MuiCheckbox-root":
			{
				color: "#929eac",
			},
		"& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainer":
			{
				p: 0,
			},
		"& .MuiDataGrid-columnHeader:not(:first-of-type)": {
			borderLeft: "1px solid rgb(230, 230, 230)",
		},
		"& .BtnStatus": {
			justifyContent: "space-between",
			px: 1,
			textTransform: "none",
			textDecoration: "underline",
			color: "#34d379",
			backgroundColor: "rgb(248, 248, 248)",
			"&.waiting": {
				color: "#fc9170",
			},
			"&:hover": {
				color: "#fff",
				backgroundColor: "primary.main",
			},
		},
		'& [data-colindex="1"]': {
			fontWeight: 500,
			"& a": {
				color: "inherit",
				textDecoration: "underline solid transparent",
				"&:hover": {
					color: "primary.main",
					textDecorationColor: "currentColor",
				},
			},
		},
		"& .MuiCheckbox-root": {
			color: "#929eac",
			borderRadius: "3rem",
		},
	},
};

export const Result = {
	...Common,
	hr: {
		borderColor: "rgba(0,0,0,0.05)",
		borderWidth: "2px",
		marginTop: "30px",
		marginBottom: "30px",
	},
	cardElement: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		marginBottom: "15px",
		"& .sup": {
			position: "relative",
			fontSize: "1.1em",
			top: "0px",
			marginLeft: "4px",
		},
		"& .low": {
			borderLeftColor: "#CC6633",
			"& .MuiTypography-inputValue": {
				color: "#CC6633",
			},
		},
		"& .pass": {
			borderLeftColor: "#679289",
			"& .MuiTypography-inputValue": {
				color: "#679289",
			},
		},
	},
	stat: {
		display: "inline-block",
		borderLeft: "1.5px solid #eee",
		padding: "0 20px 10px 10px",
		margin: "5px 0px",
		//
		"& .MuiTypography-inputValue": {
			display: "flex",
			fontSize: "20px",
			fontWeight: 500,
		},
		"& .MuiTypography-inputLabel": {
			display: "block",
			fontSize: "15px",
			fontWeight: 400,
			paddingTop: "5px",
			paddingBottom: "10px",
			paddingRight: "20px",
			"& svg": {
				width: ".6em",
				height: ".6em",
				verticalAlign: "text-top",
				color: "#ccc",
				marginLeft: "3px",
			},
		},
		divider: {
			opacity: 0,
		},
		range: {
			display: "flex",
			seperator: {
				fontSize: "15px",
				alignSelf: "center",
				margin: "0 .75rem",
			},
		},
		unit: {
			fontSize: "1.35rem",
			opacity: 0.8,
			marginLeft: "5px",
		},
	},
	//
	buttonDownloadReport: {
		wrapper: {
			display: "flex",
			alignItems: "center",
			backgroundColor: "#3f4549",
			color: "#fcfcfc",
			p: 3,
			mb: 4,
			"&:hover": {
				backgroundColor: "#333",
			},
		},
		icon: {
			flex: "1 0 1.9em",
			width: "1.9em",
			height: "1.9em",
			maxWidth: "1.9em",
			maxHeight: "1.9em",
			marginRight: "auto",
			fontSize: "inherit!important",
		},
		text: {
			fontSize: "1rem",
			lineHeight: 1,
			textTransform: "capitalize",
			pl: 2,
			pr: 2,
		},
	},
	buttonReanalyzeReport: {
		wrapper: {
			alignItems: "center",
			fontWeight: "600",
			color: "currentColor",
			backgroundColor: "#ddd",
			py: 1,
			pr: 2,
			my: 0,
			mx: 1,
			"&:hover": {
				color: "white",
				backgroundColor: "#555",
			},
		},
		icon: {
			mr: 2,
			ml: 1,
		},
	},
	resultFiles: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		mt: 2,
		mb: 6,
		"& .btn-download": {
			flex: 1,
			color: "#fff",
			textTransform: "unset",
			backgroundColor: "primary.main",
			padding: "10px",
			marginRight: "1em",
			"& svg": {
				width: "1em",
				height: "1em",
				marginRight: ".5em",
			},
		},
		"& .btn-reanalyze": {
			padding: "0 20px",
			backgroundColor: "#111",
		},
	},
};

export const Blog = {
	...Common,
};

export const BlogPost = {
	...Common,
	buttonBackToResults: {
		wrapper: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			backgroundColor: "transparent",
			border: ".5px solid #ddd",
			color: "#666",
			p: 1,
			mb: 2,
			"&:hover": {
				color: "currentColor",
				backgroundColor: "#eee",
			},
		},
		icon: {
			flex: "1 0 1.3em",
			maxWidth: "1.1em",
			maxHeight: "1.1em",
		},
		text: {
			fontSize: "1rem",
			lineHeight: 1,
			textTransform: "capitalize",
			paddingLeft: "5px",
		},
	},
};

export const Posts = {
	...Common,
};

const layoutMetrics = {
	sidebar: 170,
	content: 700,
};

export const PageWrapper = {
	...Common,
	header: {
		position: "sticky",
	},
	backdrop: {
		color: "#4369ac",
		zIndex: (theme) => theme.zIndex.speedDial + 1,
		backgroundColor: "#fff",
		"& > *": {
			color: "inherit",
		},
	},
	breadcrumbs: {
		typography: "caption",
		color: "#aaa",
		width: "100%",
		pt: 1,
		pb: 0,
		px: 4,
		ml: "auto",
		mr: "auto",
		"& a": {
			color: "inherit",
			textDecorationStyle: "solid",
		},
	},
	main: {
		display: "flex",
		flexDirection: { xs: "Columns", md: "Rows" },
		justifyContent: "center",
		px: 2,
		width: "100%",
	},
	nav: {
		display: { xs: "none", md: "block" },
		flex: { xs: "1", md: "1 0 33%" },
		maxWidth: layoutMetrics.sidebar,
		m: { md: 2 },
		mr: { md: 3 },
	},
	article: {
		flex: { xs: "1", md: "1 0 66%" },
		maxWidth: layoutMetrics.content,
		m: 2,
	},
	scrollup: {
		position: "fixed",
		bottom: "24px",
		right: "24px",
		color: "#fff",
		lineHeight: "0",
		borderRadius: "3px",
		backgroundColor: "primary.main",
		boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
		"&:hover": {
			backgroundColor: "primary.main",
		},
		transition: "opacity 0.2s ease",
	},
};

export const Home = {
	...Common,
	userPanel: {
		mb: "60px",
	},
	action: {
		display: "flex",
		alignSelf: "flex-start",
		aligItems: "center",
		flexWrap: "nowrap",
		flex: "1 0 50%",
		p: 1,
		borderRadius: "3px",
		"& svg": {
			margin: "16px 8px",
		},
		"& h3 ": {
			alignSelf: "center",
			margin: 1,
		},
	},
	actionSwot: {
		flexWrap: { xs: "wrap", sm: "nowrap" },
		color: "#fff",
		backgroundColor: "#929eac",
		"& > *": {
			display: "flex",
			maxWidth: { sm: "50%" },
		},
		"& p": {
			m: "auto .5em auto 1em",
		},
		"& a": {
			color: "inherit",
			fontWeight: "500",
			textDecoration: "1.5px solid underline",
			margin: "auto",
		},
	},
	actionGuide: {
		p: 1,
		"& p": {
			mb: ".15em",
		},
		"& a": {
			color: "inherit",
			fontWeight: "500",
			textDecoration: "1px underline",
			margin: "auto",
		},
	},
	cardElement: {
		overflow: "visible",
		marginBottom: "30px",
		"& > .MuiCardContent-root": {
			p: 2,
			"&:last-child": {
				p: 2,
			},
		},
	},
	news: {
		mb: 8,
	},
	organisations: {
		"& a[href]": {
			display: "block",
			maxWidth: "125px",
			maxHeight: "125px",
			"& svg": {
				maxWidth: "125px",
				maxHeight: "125px",
			},
			"&.wide": {
				maxWidth: "200px",
				"& svg": {
					maxWidth: "200px",
				},
			},
		},
	},
};

export const ContactPage = {
	...Common,
	form: {
		'& [type="text"], & [type="email"], & [type="phone"], & [type="text"], & .MuiTextField-root':
			{
				backgroundColor: "#f9f9f9",
			},
		"& button": { textTransform: "capitalize" },
		"& #btnSubmit": {
			color: "white",
			mb: 1,
		},
	},
};

//
//
//

export const ProfileResetPassword = {
	...Common,
	form: {
		"& button": { textTransform: "capitalize" },
		"& #btnSubmit": {
			color: "white",
			mb: 1,
		},
	},
};

export const ProfileForgotPassword = {
	...Common,
	form: {
		"& button": { textTransform: "capitalize" },
		"& #btnSubmit": {
			color: "white",
			mb: 1,
		},
		"& #btnReset": {
			backgroundColor: "#f1f4f7",
			mb: 1,
		},
	},
};

export const ProfileLogin = {
	...Common,
	form: {
		"& button": { textTransform: "capitalize" },
		"& #btnLogIn": {
			color: "white",
			mb: 1,
		},
	},
};

//
//
//

export const NavTools = {
	...Common,
	display: "block",
	textUnderlinePosition: "under",
	backgroundColor: "#fff",
	borderRadius: "3px",
	boxShadow: "none",
	border: {
		xs: "1px solid rgba(0, 0, 0, 0.05)",
		sm: "1px solid transparent",
	},
	p: { xs: 1, sm: 0 },
	m: { xs: "0 0 12px", sm: "0 0 10px 0" },
	transition: "box-shadow 0s ease, background-color 0s ease",
	"&:before": {
		display: { xs: "none", sm: "flex" },
		content: '"step " attr(step)',
		position: "absolute",
		top: "10px",
		left: "10px",
		fontSize: "0.7rem",
		fontWeight: "400",
		textAlign: "center",
		color: "#929EAC",
		lineHeight: "1",
		textTransform: "Capitalize",
	},
	"& *": {
		pointerEvents: "none",
	},
	"& .MuiTouchRipple-child": {
		backgroundColor: "rgba(67, 105, 172, 0.3)",
	},
	//
	"&.active": {
		color: "#fff",
		backgroundColor: "primary.main",
		pointerEvents: "none",
		textUnderlineOffset: 0,
		"& .gray": {
			fill: "#929eac",
		},
		"&:after": {
			color: "#fff",
			backgroundColor: "#4a77c6",
		},
	},
	"&:not(.active):hover": {
		backgroundColor: "#f7f8f9",
		borderColor: "rgba(0, 0, 0, 0.1)",
	},
	//
	wrap: {
		position: "relative",
		display: "block",
		flexBasis: "100%",
	},
	//
	icon: {
		display: { xs: "none", sm: "flex" },
		height: "relative",
		p: 0,
		"& > svg": {
			width: "3rem",
			height: "3rem",
			margin: "20px auto 0px",
		},
	},
	//
	label: {
		display: "block",
		fontFamily: '"Roboto Condensed", sans-serif',
		fontSize: "1.1rem",
		lineHeight: "2",
		letterSpacing: "-0.005em",
		textAlign: "center",
		textTransform: "capitalize",
		textOverflow: "ellipsis",
		color: "inherit",
		overflow: "hidden",
		transition: "color 0.3s ease",
	},
};

export const NavContent = {
	...Common,
	display: { xs: "block", sm: "inline-block" },
	"& a": {
		display: { xs: "block", sm: "inline" },
		textAlign: "center",
		p: { xs: "4px", sm: 0 },
		"&.active": {
			textDecoration: "underline solid 1px",
		},
	},
};

//
//
//

export const Header = {
	...Common,
	nav: {
		display: "flex",
		justifyContent: "space-between",
		color: "#fff",
		px: {
			xs: 4,
			md: 2,
		},
		mt: {
			xs: 2,
			md: 3,
		},
		mb: {
			xs: 1,
			md: 2,
		},
		"& .logo": {
			flexGrow: 0,
			alignSelf: "flex-end",
			display: "block",
			lineHeight: 0,
			color: "white",
			m: 0,
			p: 0,
			"& svg ": {
				fill: "currentColor",
				height: "auto",
			},
			"& svg.large": {
				display: { xs: "none", md: "block" },
				width: 211,
			},
			"& svg.compact": {
				display: { xs: "block", md: "none" },
				width: 154,
			},
		},
	},
	ul: {
		flexGrow: 0,
		display: "flex",
		flexWrap: { sm: "wrap" },
		alignItems: "center",
		justifyContent: "end",
		listStyle: "none",
		p: 0,
		pl: 4,
		m: 0,
		//
		"& a, & button": {
			"&:hover": {
				color: "currentColor",
			},
		},
		//
		"& .nav-content": {
			display: { xs: "none", sm: "flex" },
			"& a": {
				typography: "subtitle1",
				textTransform: "capitalize",
				m: "3px 6px",
			},
			"& .signout": {
				textDecoration: "underline solid",
			},
		},
		"& .nav-profile": {
			display: "flex",
			gridTemplateColumns: "1fr 1fr",
			order: { sm: "-1" },
			flexBasis: { sm: "100%" },
			flexWrap: { xs: "wrap", sm: "nowrap" },
			justifyContent: "end",
			margin: { xs: "auto 0 5px", sm: "initial" },
			"& a, & button": {
				padding: { xs: "0px", sm: "3px" },
				margin: { xs: "4px", sm: "3px 4px" },
				borderRadius: "3px",
				svg: {
					width: { xs: "1em", sm: ".9em" },
					height: { xs: "1em", sm: ".9em" },
				},
			},
			"& .signin": {
				display: "flex",
				typography: "subtitle1",
				textTransform: "none",
				p: 0,
				m: { xs: "3px 6px", sm: "3px 3px 3px 6px" },
				"&.active": {
					textDecoration: "underline solid 1px",
				},
				"& svg": {
					ml: 1,
					display: { xs: "none", sm: "block" },
				},
			},
			"& .openDrawer": {
				svg: {
					width: "1.3em",
					height: "1.3em",
				},
			},
		},
	},
	list: {},
	setMobileNavOpen: {
		display: { sm: "none" },
		padding: "6px",
		margin: "0px 1px",
	},
	drawerElement: {
		"& .MuiPaper-root": {
			width: 200,
			minHeight: "100%",
			backgroundColor: "#E3E4E6",
			p: "20px 20px 10px",
			maxWidth: "100%",
		},
		"& .signout, & .signin": {
			position: "relative",
			textAlign: "left",
			marginBottom: "16px",
			color: "#fff",
			backgroundColor: "primary.main",
			border: "1px solid #bbb",
			borderRadius: "3px",
			display: { xs: "block", sm: "inline" },
			p: { xs: "4px 8px", sm: 0 },
			mb: 2,
			"& svg": {
				position: "absolute",
				top: "50%",
				right: "8px",
				transform: "translateY(-50%)",
				width: ".9em",
				height: ".9em",
			},
		},
		"& .signout": {
			color: "#4c5054",
			backgroundColor: "#EAC1AE",
		},
		"& .signin": {
			color: "#4c5054",
			backgroundColor: "#C2D4D0",
		},
		"& .nav-profile": {
			justifyContent: "center",
			mb: 2,
		},
		"& .guest": {
			"& a": {
				typography: "subtitle1",
				p: 2,
			},
		},
	},
};

export const Footer = {
	...Common,
	pl: { xs: 2, md: 4 },
	pr: { xs: 2, md: 4 },
	mt: "auto",
	ml: "auto",
	mr: "auto",
	mb: 3,
};

//
//
//

export const CMSPage = {
	...Common,
};

export const NotificationLineCreator = (props) => ({
	...Common,
	display: "flex",
	alignItems: "flex-start",
	color: "#999",
	padding: "8px 4px 24px",
	typography: "caption",
	"& > svg": {
		flex: "0 0 24px",
		fontSize: "inherit",
		color:
			props.type === "guide"
				? "#FFD75C"
				: props.type === "check"
				? "#34d379"
				: "inherit",
		width: "24px",
		height: "24px",
	},
	"& > div": {
		alignSelf: "center",
		fontSize: "inherit",
		padding: "1px 15px 0 10px",
		maxWidth: "55ch",
	},
	//  resets
	"& a": {
		color: "inherit",
	},
	"& p": {
		marginTop: 0,
		marginBottom: ".5em",
	},
});

export const UserDetailsModal = {
	...Common,
	dialogueElement: {
		width: "45ch",
		maxWidth: "calc(100% - 4rem)",
		margin: "auto",
		submissionWrap: {
			px: 2,
			pb: 2,
			"& button": {
				mr: 1,
				textTransform: "capitalize",
			},
			"& #btnSaveUserDetails": {
				color: "white",
			},
			"& #btnCancelUserDetails": {
				color: "coral",
				textDecoration: "underline 1px",
			},
			"& #btnResetUserDetails": {
				marginLeft: "auto",
			},
		},
	},
};

//
// Elements
//

export const FieldsiteDropdown = {
	...Common,
	display: "grid",
	gridAutoFlow: {
		xs: "row",
		md: "column",
	},
	gap: "10px",
	"& > *": {
		flex: {
			xs: "1 0 50%",
		},
	},
};

export const UserNotificationsPopover = {
	...Common,
	badge: {
		"& .MuiBadge-badge": {
			fontSize: "0.75rem",
			transform: "translate(25%, -60%)",
			filter: "drop-shadow(0px 3px 2px rgba(0,0,0,0.3))",
		},
	},
	list: {
		overflow: "auto",
		maxHeight: "500px",
		maxWidth: "400px",
		p: 0,
	},
};

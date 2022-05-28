export const Common = {
	cardElement: {
		overflow: "visible",
		marginBottom: "30px",
		boxShadow: 'none',
		"& h1": {
			marginBottom: "1em",
		},
		"& .MuiCardHeader-root": {
			p: "10px 16px",
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
		"& button": { textTransform: "capitalize", mb: ".25rem", mr: "1rem" },
		"& #btnSubmit": {
			color: "white",
			maxWidth: "60%"
		},
	},
	//
	buttonBackToResults: {
		typography: "caption",
		display: "block",
		backgroundColor: "#3f4549",
		borderRadius: "2px",
		color: "#fcfcfc",
		py: 1,
		px: 2,
		mb: 3,
		"&:hover": {
			backgroundColor: "#555",
		},
	},
	//
	sectionHeader: {
		mb: 2,
		fontSize: "20px",
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
			minHeight: 0,
			backgroundColor: "#F9F9F9",
			border: "1px solid dashed #ccc",
			borderRadius: 0,
			"& .MuiDropzoneArea-text": {
				mt: "10px",
				mb: "20px",
			},
			"& .MuiDropzoneArea-textContainer": {
				display: "flex",
				flexDirection: "column-reverse",
				alignItems: "center",
				justifyContent: "center",
				color: "#929eac",
			},
			"& .MuiDropzoneArea-icon": {
				width: "6rem",
				height: "6rem",
				color: "#ccc",
				fill: "#ccc",
				mt: "20px",
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
			p: "0.5rem 0 0 0.5rem",
		},
		"& .MuiFormGroup-root": {
			pl: 2,
		},
	},
	uploadOptions: {
		"& .MuiFormGroup-root": {
			p: "8px 4px 16px 4px",
			"& .MuiFormControlLabel-root": {
				m: 0,
				"& svg": {
					width: "24px",
					height: "24px",
				},
				"& .MuiTypography-root": {
					p: "1px 10px 0 5px",
				}
			}
		},
		"& .MuiCheckbox-root": {
			p: 0,
			"& svg": {
				fill: "#F9F9F9",
				transform: "scale(1.1)",
				"& .base": {
					boxShadow: "none",
				},
			},
			"&:not(.Mui-checked)": {
				"& svg": {
					fill: "#ccc",
					strike: "gray",
					strokeWidth: "1px",
				},
			},
			"&.Mui-checked": {
				"& svg": {
					fill: "#466FB6",
					strokeWidth: "1px",
					"& .check": {
						fill: "#fff",
						stroke: "none",
					},
				},
			},
		},
	}
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
			justifyContent: "center",
			flexDirection: "row",
			mt: "1.5rem",
			"& .MuiButton-root": {
				typography: "caption",
				fontWeight: "500",
				border: "none",
				padding: ".5rem 1rem",
				mx: ".25rem",
				width: "auto",
				minWidth: 0,
				boxShadow: "none",
				backgroundColor: "#d5d9df",
				"&:hover": {
					backgroundColor: "#d5d9df",
				},
			},
		},
		"& .title": {
			color: "#929eac",
			mb: 1,
		},
		"& .divider": {
			mt: "2rem",
		},
	},
	analyzeStorageDuration: {
		m: 0,
		backgroundColor: "transparent",
		border: "none",
		boxShadow: "none",
		"& .MuiAccordionSummary-root": {
			fontWeight: 600,
			p: 0,
		},
		"& .MuiAccordionDetails-root": {
			p: 2,
		},
		"& .slider_wrap": {
			position: "relative",
			px: 3,
			mx: "auto",
			maxWidth: "540px",
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
				top: "-0.95rem",
				lineHeight: 1,
				textAlign: "center",
				color: "#4a5053",
				background: "#D5D9DF",
				"& .MuiSlider-valueLabelCircle span": {
					fontSize: "150%",
				},
				"& .MuiSlider-valueLabelCircle::after": {
					display: "block",
					content: '"hrs"',
					fontSize: "75%",
				},
			},
		},
	},
	analyzeConfidenceLevel: {
		m: 0,
		backgroundColor: "transparent",
		border: "none",
		boxShadow: "none",
		"& .MuiAccordionSummary-root": {
			fontWeight: 600,
			p: 0
		},
		"&::before": {
			display: "none",
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
		marginTop: 1,
		marginBottom: 1,
	},
	cardElement: {
		marginBottom: "15px",
		"& .sup": {
			position: "relative",
			fontSize: "0.95em",
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
		p: 1,
		px: { xs: 1, sm: 2 },
		margin: "5px 0px",
		//
		"& .MuiTypography-inputValue": {
			display: "flex",
			fontSize: "22px",
			lineHeight: "34px",
			letterSpacing: "-0.019em",
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
				color: "#aeaeae",
				marginLeft: "3px",
			},
		},
		divider: {
			opacity: 0,
			m: 0
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
		justifyContent: "flex-start",
		alignItems: "center",
		mt: 2,
		mb: 6,
		"& .btn-download": {
			flex: "0 1 50%",
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
	sidebar: 180,
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
		fontSize: "13px",
		color: "#bbb",
		py: 1,
		px: { xs: 2, md: 4 },
		"& a": {
			color: "inherit",
			textDecorationStyle: "solid",
		},
		"& .MuiBreadcrumbs-separator": {
			mx: "4px",
		},
	},
	main: {
		display: "grid",
		gridTemplateColumns: { md: "1fr minmax(0, 700px) 1fr" },
		gridAutoFlow: { xs: "Rows", md: "Columns" },
		justifyContent: "center",
		px: 2,
	},
	nav: {
		display: { xs: "none", md: "block" },
		gridColumn: "1/2",
		width: layoutMetrics.sidebar,
		padding: '8px 16px 8px',
		marginLeft: "auto",
	},
	article: {
		gridColumn: { md: "2/3" },
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
			textDecoration: "1px solid underline",
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

export const Header = {
	...Common,
	nav: {
		display: "flex",
		justifyContent: "space-between",
		color: "#fff",
		minHeight: { md: "5.5rem" },
		px: 2,
		my: 1,
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
			"& .large": {
				display: { xs: "none", sm: "block" },
				width: 211,
			},
			"& .compact": {
				display: { xs: "block", sm: "none" },
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
		"& .signout, & .signin": {
			display: "flex",
			textDecoration: "underline solid rgba(255,255,255,0.5)",
			"&.active": {
				textDecoration: "underline solid 1px",
			},
		},
		//
		"& .nav-content": {
			display: { xs: "none", md: "flex" },
			mt: "auto",
			mb: "4px",
		},
		"& .nav-profile": {
			display: "flex",
			gridTemplateColumns: "1fr 1fr",
			order: { sm: "-1" },
			flexBasis: { sm: "100%" },
			flexWrap: { xs: "wrap", sm: "nowrap" },
			justifyContent: "end",
		},
		"& a, & button": {
			fontWeight: "400",
			fontFamily: '"Roboto Condensed", sans-serif',
			fontSize: "20px",
			lineHeight: "1.2",
			letterSpacing: "-0.02em",
			textTransform: "capitalize",
			color: "currentColor",
			p: 0,
			m: 0,
			ml: "8px",
			"&:hover": {
				color: "currentColor",
			},
		},
	},
	list: {},
	setMobileNavOpen: {
		display: { xs: "flex", md: "none" },
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
	textAlign: 'center',
	px: { xs: 2, md: 4 },
	m: "auto",
	mb: 3,
	"& a": {
		color: 'inherit',
		textDecoration: "underline dotted 1px",
	}
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
	padding: "12px 4px",
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
		padding: "1px 10px 0 5px",
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

export const Result = {
	hr: {
		borderColor: "rgba(0,0,0,0.05)",
		borderWidth: "2px",
		marginTop: 1,
		marginBottom: 1,
	},
	cardElement: {
		marginBottom: "15px",
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
				fontSize: '1em',
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

//
//
//

export const UserDetailsModal = {
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

export const UserNotificationsPopover = {
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

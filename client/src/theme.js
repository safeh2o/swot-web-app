import { createTheme } from "@mui/material";

const SliderThumbBoxShadow =
	"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

export default createTheme({
	palette: {
		primary: {
			main: "#4069b1",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#f3c22b",
			contrastText: "#ffffff",
		},
	},
	components: {
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					padding: "0",
					flexDirection: "column",
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					"&:before": {
						display: "none",
					},
					"&.Mui-expanded": {
						margin: "20px 30px 40px",
					},
					borderRadius: "7px",
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					borderBottom: "1px solid #dde6ed",
					margin: 0,
				},
				content: {
					margin: 0,
					"&.Mui-expanded": {
						margin: 0,
					},
				},
				expandIcon: {
					padding: "0 12px 0 0",
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					color: "#4069b1",
					height: 10,
					padding: "15px 0",
				},
				thumb: {
					transform: "scale(1)",
					height: "2.6rem",
					width: "2.6rem",
					backgroundColor: "#4069b1",
					boxShadow: SliderThumbBoxShadow,
					marginTop: "-1.3rem",
					marginLeft: "-1.3rem",
					"&.MuiSlider-thumb.Mui-focus, &.MuiSlider-thumb.Mui-hover, &.MuiSlider-thumb.Mui-active":
						{
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
			},
		},
	},
});

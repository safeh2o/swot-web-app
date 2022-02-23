import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const SliderThumbBoxShadow =
	"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const CardShadow = '0px 2px 2px -1px rgba(0,0,0,0.1),0px 1px 2px 0px rgba(0,0,0,0.1),0px 1px 3px 0px rgba(0,0,0,0.075)';

const family = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

let theme = createTheme({
	ripple: {
		opacity: '0.1',
	},
	typography: {
		fontFamily: family,
		fontSize: 16,
		lineHeight: '1.375',
		fontWeightBold: 600,
		body1: {
			fontSize: '1rem',
			letterSpacing: '-0.011em',
			lineHeight: '1.375',
		},
		body2: {
			fontSize: '0.9375rem',
			letterSpacing: '-0.009em',
			lineHeight: '1.4',
		},
		h5: {
			fontSize: '1rem',
			letterSpacing: 'inherit',
			lineHeight: 'inherit',
		},
		h4: {
			fontSize: '1.0625rem',
			letterSpacing: '-0.013em',
			lineHeight: '1.4',
		},
		h3: {
			fontSize: '1.2rem',
			letterSpacing: '-0.014em',
			lineHeight: '1.388',
		},
		h2: {
			fontSize: '1.3rem',
			letterSpacing: '-0.021em',
			lineHeight: '1.416',
			fontWeight: 500,
		},
		h1: {
			fontSize: '1.4rem',
			letterSpacing: '-0.021em',
			lineHeight: '1.35',
			fontWeight: 500,
		},
		subtitle1: {
			fontSize: '1.125rem',
			letterSpacing: '-0.014em',
			lineHeight: '1.416',
			fontWeight: 500,
		},
		subtitle2: {
			fontSize: '1rem',
			letterSpacing: '-0.009em',
			lineHeight: '1.4',
			fontWeight: 500,
		},
		// Forms
		caption: {
			fontSize: '0.875rem',
			letterSpacing: '-0.006em',
			lineHeight: '1.428',
		}
	},
	palette: {
		text: {
			primary: '#3f4549',
		},
		primary: {
			main: "#466FB6",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#f3c22b",
			contrastText: "#ffffff",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					color: 'inherit',
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: 'inherit',
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontWeight: 500,
					marginTop: '10px'
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
			},
		},
		MuiCardHeader: {
			styleOverrides: {
				root: {
					// '& .MuiTypography-root': {
					// 	fontSize: '1.15rem',
					// 	letterSpacing: '-0.014em',
					// 	lineHeight: '1.416',
					// 	fontWeight: 400,
					// }
				},
			},
		},
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
					zIndex: 0,
					borderRadius: 0,
					boxShadow: 'none',
					"&:before": {
						display: "none",
					},
					"&.Mui-expanded": {
						margin: 0,
						'& .MuiAccordionSummary-root': {
							minHeight: 'auto'
						}
					},
				},
				content: {
					margin: 0,
					"&.Mui-expanded": {
						margin: 0,
					},
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
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
					height: '24px',
					zIndex: 1,
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 'calc(50% - 12px)',
						right: '100%',
						zIndex: -1,
						height: '24px',
						width: '8px',
						backgroundColor: '#466FB6'
					},
					'&::after': {
						content: '""',
						position: 'absolute',
						top: 'calc(50% - 12px)',
						left: '100%',
						zIndex: -1,
						height: '24px',
						width: '8px',
						backgroundColor: '#d5d9df'
					}
				},
				thumb: {
					transform: "scale(1)",
					height: "2.5rem",
					width: "2.5rem",
					boxShadow: SliderThumbBoxShadow,
					marginTop: "-1.25rem",
					marginLeft: "-1.25rem",
					border: "3px solid #305ba8",
					"&.MuiSlider-thumb.Mui-focus, &.MuiSlider-thumb.Mui-hover, &.MuiSlider-thumb.Mui-active":
					{
						transform: "scale(1.1)",
						boxShadow:
							"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
						"@media (hover: none)": {
							boxShadow: SliderThumbBoxShadow,
						},
					},
				},
				rail: {
					backgroundColor: '#929eac',
					borderRadius: '0',
				},
				track: {
					borderRadius: '0',
				},
				valueLabelCircle: {
					backgroundColor: '#c1d1e0',
					borderRadius: '2px',
					color: '#3f4549',
					boxShadow: SliderThumbBoxShadow,
				},
				'& .MuiSlider-valueLabelOpen': {
					color: 'primary',
					py: '2px',
					px: 1,
					backgroundColor: '#c1d1e0',
				}
			},
		},
	},
});

// theme = responsiveFontSizes(theme);

export default theme;

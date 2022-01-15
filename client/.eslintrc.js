/* eslint-disable no-undef */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/jsx-uses-react": "off",
		"no-unused-vars": "warn",
	},
};

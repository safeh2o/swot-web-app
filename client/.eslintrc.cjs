module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:react-hooks/recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"@typescript-eslint/consistent-type-definitions": ["error", "type"],
		"@typescript-eslint/no-unsafe-assignment": "warn",
		"@typescript-eslint/require-await": "warn",
		"@typescript-eslint/no-misused-promises": "off",
	},
	parserOptions: {
		project: "./tsconfig.json",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	ignorePatterns: ["**/*.d.ts", ".eslintrc.cjs"],
};

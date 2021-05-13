module.exports = {
	env: {
		node: true,
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		// Next.JS automagically imports React
		// for us when needed
		"react/react-in-jsx-scope": [0],
		// Got a helper function that checks for
		// keys so this is /probably/ safe
		"@typescript-eslint/ban-types": {
			types: {
				object: false,
			},
			extendDefaults: true,
		},
	},
};

module.exports = {
	root: true,
	parser: "babel-eslint",
	plugins: [
		"react",
		"jsx-a11y"
	],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			modules: true,
			jsx: true
		}
	},
	rules: {
		"jsx-a11y/no-onchange": "off",
		"no-unused-vars": "off",
		"no-invalid-this": "off",
		"multiline-ternary": "off",
		"no-extra-parens": [
			"error",
			"functions"
		],
		"curly": ["error", "multi-line"],
		"lines-between-class-members": "off",
		"space-before-function-paren": ["error", {
			"anonymous": "never",
			"named": "never",
			"asyncArrow": "always"
		}],
		"template-curly-spacing": "off",
		"indent": ["error", "tab", {
			"ignoredNodes": ["TemplateLiteral"]
		}]
	},
	extends: [
		"eslint-config-codesupport",
		"plugin:jsx-a11y/recommended"
	]
};

module.exports = {
	extends: ['@vospel', '@unocss'],
	env: {
		browser: true,
		node: true,
		es2017: true,
	},
	overrides: [
		{
			files: ['*.cjs'],
			env: {
				node: true,
				commonjs: true,
			},
		},
	],
	rules: {
		'@typescript-eslint/indent': ['error', 'tab'],
		'semi': ['error', 'always'],
		'indent': 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'jsonc/indent': ['error', 'tab'],
	},
};

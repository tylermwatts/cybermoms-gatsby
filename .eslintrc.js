module.exports = {
	extends: ['plugin:@typescript-eslint/recommended'],
	globals: {
		__PATH_PREFIX__: true,
	},
	plugins: ['sort-keys', 'sort-imports-es6-autofix', 'typescript-sort-keys'],
	root: true,
	rules: {
		'prettier/prettier': 0,
		'sort-imports-es6-autofix/sort-imports-es6': [
			'warn',
			{
				memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
			},
		],
		'sort-keys': 0, // disable default eslint sort-keys
		'sort-keys/sort-keys-fix': 1,
		'typescript-sort-keys/interface': 'warn',
		'typescript-sort-keys/string-enum': 'warn',
	},
};

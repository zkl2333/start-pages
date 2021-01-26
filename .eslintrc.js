module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/airbnb'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'comma-dangle': [
			'error',
			{
				arrays: 'never',
				objects: 'never',
				imports: 'never',
				exports: 'never',
				functions: 'never'
			}
		],
		indent: ['error', 'tab'],
		'no-shadow': 'off',
		'no-unused-vars': 'off',
		'no-param-reassign': 'off',
		'func-names': 'off',
		'no-return-await': 'off',
		'no-use-before-define': 'off',
		'no-tabs': 'off',
		'arrow-parens': 'off'
	}
};

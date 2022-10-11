const esmOnlyDependencies = [
	'@lion/',
	'@lit/',
	'@open-wc/',
	'@bundled-es-modules/',
	'lit',
	'lit-element',
	'lit-html',
	'singleton-manager',
];

module.exports = {
	moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.ts$': ['ts-jest', { babelConfig: true }],
		'^.+\\.js$': 'babel-jest',
		'^.+\\.json$': '<rootDir>/test/transformers/json',
		'^.+\\.vue$': '@vue/vue3-jest',
	},
	moduleNameMapper: {
		'^@vue/test-utils$': require.resolve('@vue/test-utils'),
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/mocks/file-mock',
		'\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/style-mock',
		'^src/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
	},
	transformIgnorePatterns: [`/node_modules/(?!${esmOnlyDependencies.join('|')})`],
};

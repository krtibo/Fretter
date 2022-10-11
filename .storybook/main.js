module.exports = {
	stories: [
		'../src/**/*.stories.js',
		'./**/*.stories.js',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
	],
	core: { builder: 'webpack5' },
};

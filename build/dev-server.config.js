module.exports = function DevServerConfig({ publicPath = '/', apiPath = '/' } = {}) { // eslint-disable-line @typescript-eslint/no-unused-vars
	return {
		headers: { 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';" },
		historyApiFallback: { index: publicPath },
		devMiddleware: { publicPath },
		port: 3000,
		static: false,
	};
};


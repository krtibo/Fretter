module.exports = {
	process(src) {
		const data = JSON.parse(src);
		const code = `${JSON.stringify({
			...data,
			__esModule: true,
			default: data,
		})}`;
		return { code };
	},
};

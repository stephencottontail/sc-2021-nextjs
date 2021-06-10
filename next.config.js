const withPreact = require('next-plugin-preact');

module.exports = withPreact({
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.node = { fs: "empty", module: "empty" };
		}

		return config;
	},
});

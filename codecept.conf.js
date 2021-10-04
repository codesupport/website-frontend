const { setHeadlessWhen } = require("@codeceptjs/configure");

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
	tests: "./test/acceptance/**Test.js",
	output: "./output",
	helpers: {
		Puppeteer: {
			url: "https://codesupport.dev",
			show: false,
			windowSize: "1200x900"
		}
	},
	include: {
		I: "./test/acceptance/steps_file.js"
	},
	bootstrap: null,
	mocha: {},
	name: "codesupport-website-frontend",
	plugins: {
		pauseOnFail: {},
		retryFailedStep: {
			enabled: true
		},
		tryTo: {
			enabled: true
		},
		screenshotOnFail: {
			enabled: true
		}
	}
};
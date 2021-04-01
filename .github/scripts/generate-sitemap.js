const sitemap = require("nextjs-sitemap-generator");

sitemap({
	baseUrl: "https://codesupport.dev",
	pagesDirectory: "out/",
	targetDirectory: "out/",
	ignoredExtensions: [
		"png",
		"ico"
	]
});

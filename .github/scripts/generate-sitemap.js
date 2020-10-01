const sitemap = require("nextjs-sitemap-generator");

sitemap({
	baseUrl: "https://codesupport.dev",
	pagesDirectory: "../../out/",
	targetDirectory: "../../public/",
	ignoredExtensions: [
		"png",
		"ico"
	]
});

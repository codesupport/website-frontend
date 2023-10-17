const sitemap = require("nextjs-sitemap-generator");

sitemap({
	baseUrl: "https://codesupport.dev",
	pagesDirectory: "out/",
	targetDirectory: "out/",
	ignoredPaths: ["404", "article/[path]", "index"],
	ignoredExtensions: [
		"png",
		"ico"
	]
});

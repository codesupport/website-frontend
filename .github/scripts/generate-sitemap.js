import sitemap from "nextjs-sitemap-generator";

sitemap({
	baseUrl: "https://codesupport.dev",
	pagesDirectory: "out/",
	targetDirectory: "out/",
	ignoredPaths: ["404", "article/[path]", "index"],
	ignoredExtensions: [
		"png",
		"jpg",
		"jpeg",
		"ico"
	]
});

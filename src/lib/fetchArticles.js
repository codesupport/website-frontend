import matter from "gray-matter";

const fs = require("fs");
const { join } = require("path");

const articlesDirectory = join(process.cwd(), "src", "data", "articles");

function getArticleSlugs() {
	return fs.readdirSync(articlesDirectory);
}

export function getArticleBySlug(slug) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(articlesDirectory, `${realSlug}.md`);
	const contents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(contents);

	return {
		content,
		slug: realSlug,
		...data
	};
}

export function getAllArticles() {
	const slugs = getArticleSlugs();
	const articles = slugs.map(getArticleBySlug);

	return articles.sort((a, b) => a.date > b.date ? 1 : -1);
}

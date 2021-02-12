import ArticleService from "../services/ArticleService";

export async function getAllArticles() {
	const articles = await ArticleService.getAllArticles();

	return articles;
}

export async function getArticleById(id) {
	const article = await ArticleService.getArticleById(id);

	return article;
}
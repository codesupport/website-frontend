import ArticleService from "../services/ArticleService";

const Service = ArticleService.getInstance();

export async function getAllArticles() {
	const articles = await Service.getAllArticles();

	return articles;
}

export async function getArticleById(id) {
	const article = await Service.getArticleById(id);

	return article;
}
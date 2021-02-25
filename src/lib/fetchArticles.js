import ArticleService from "../services/ArticleService";

const articles = new ArticleService();

export async function getAllArticles() {
	return await articles.getAllArticles();
}

export async function getArticleById(id) {
	return await articles.getArticleById(id);
}
import ArticleService from "../services/ArticleService";

const articles = new ArticleService();

export async function getAllArticles() {
	return await articles.getAllArticles();
}

export async function getArticleById(id) {
	return await articles.getArticleById(id);
}

export async function getAllApprovedArticlesByUser(userId) {
	return await articles.getAllApprovedArticlesByUser(userId);
}
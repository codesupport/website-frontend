import axios from "axios";
import { backendAPI, defaultError } from "../config.json";
import UserService from "./UserService";

export class ArticleService {
	BASE_URL = "article";

	static buildArticleURL(article) {
		return article.title
			.replace(/[^A-Za-z0-9 ]/g, "")
			.replace(/\s/g, "-")
			.toLowerCase();
	}

	static buildArticleRichResult(article) {
		return {
			"@context": "https://schema.org",
			"@type": "Article",
			"headline": article.title,
			"datePublished": article.created,
			"dateModified": article.modified,
			"author": UserService.buildProfileRichResult(article.user),
			"publisher": {
				"@type": "Organization",
				"name": "CodeSupport",
				"logo": {
					"@type": "ImageObject",
					"url": "https://codesupport.dev/logo.png"
				}
			}
		};
	}

	static formatArticleDate(input) {
		const date = new Date(input).toString().split(" ");

		return `${date[2]} ${date[1]} ${date[3]}`;
	}

	async getAllArticles() {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}`);

			return data;
		} catch ({ message }) {
			console.error(message);
		}

		return [];
	}

	async getAllArticlesByUser(userId) {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}?creatorId=${userId}`);

			return data.response.map(article => ({
				...article,
				createdOn: ArticleService.formatArticleDate(+article.createdOn),
				updatedOn: ArticleService.formatArticleDate(+article.updatedOn),
				path: ArticleService.buildArticleURL(article)
			}));
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}
	async getAllApprovedArticlesByUser(userId) {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}?status=APPROVED&userId=${userId}`);

			return data;
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}

	async getArticleById(id) {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}/${id}`);

			return data;
		} catch ({ message }) {
			console.error(message);
		}

		return {};
	}

	async createArticle(title) {
		try {
			const { data } = await axios.post(`${backendAPI}/${this.BASE_URL}`, {
				title
			});

			return data;
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}

	async getArticleRevisions(id) {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}/${id}/revisions`);

			return data.response.map(revision => ({
				...revision,
				createdOn: ArticleService.formatArticleDate(+revision.createdOn)
			}));
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}
}

export default ArticleService;
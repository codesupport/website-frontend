import axios from "axios";
import { backendAPI } from "../config.json";

export class ArticleService {
	BASE_URL = "article/v1/articles";

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
			"datePublished": new Date(article.createdOn).toISOString(),
			"dateModified": new Date(article.updatedOn).toISOString(),
			"author": {
				"@type": "Person",
				"name": article.createdBy.alias
			},
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

	async getAllArticles() {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}?publishedonly=true`);

			return data.response.map(article => {
				const date = new Date(+article.createdOn).toString().split(" ");

				return {
					...article,
					createdOn: `${date[2]} ${date[1]} ${date[3]}`,
					path: ArticleService.buildArticleURL(article)
				};
			});
		} catch ({ message }) {
			console.error(message);
		}

		return [];
	}

	async getArticleById(id) {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}/${id}`);
			const [article] = data.response;

			const date = new Date(+article.createdOn).toString().split(" ");

			return {
				...article,
				createdOn: `${date[2]} ${date[1]} ${date[3]}`,
				path: ArticleService.buildArticleURL(article)
			};
		} catch ({ message }) {
			console.error(message);
		}

		return {};
	}
}

export default new ArticleService();
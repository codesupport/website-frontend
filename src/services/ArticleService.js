import axios from "axios";
import {backendAPI, defaultError} from "../config.json";
import UserService from "./UserService";

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
			"author": UserService.buildProfileRichResult(article.createdBy),
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

	async getAllArticlesByUser() {
		try {
			// TODO: this needs to be changed to an endpoint that just returns my articles, needs developing though
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}`);

			return data.response.map(article => {
				const createdDate = new Date(+article.createdOn).toString().split(" ");
				const updatedDate = new Date(+article.updatedOn).toString().split(" ");

				return {
					...article,
					createdOn: `${createdDate[2]} ${createdDate[1]} ${createdDate[3]}`,
					updatedOn: `${updatedDate[2]} ${updatedDate[1]} ${updatedDate[3]}`,
					path: ArticleService.buildArticleURL(article)
				};
			});
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
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

			return data.response.map(revision => {
				const createdDate = new Date(+revision.createdOn).toString().split(" ");

				return {
					...revision,
					createdOn: `${createdDate[2]} ${createdDate[1]} ${createdDate[3]}`,
				};
			});
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}
}

export default ArticleService;
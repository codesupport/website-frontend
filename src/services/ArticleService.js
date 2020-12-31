import axios from "axios";
import { backendAPI } from "../config.json";

export class ArticleService {
	BASE_URL = "article/v1/articles";

	async getAllArticles() {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}`);

			return data.response;
		} catch ({ message }) {
			console.error(message);
		}

		return [];
	}

	async getArticleById(id) {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}/${id}`);
			const [response] = data.response;
			const { article } = response;

			const date = new Date(+article.createdOn).toString().split(" ");

			return {
				id: id,
				title: article.title,
				description: article.description,
				author: {
					id: article.createdBy.id,
					name: article.createdBy.alias
				},
				content: article.content,
				created: `${date[2]} ${date[1]} ${date[3]}`
			};
		} catch ({ message }) {
			console.error(message);
		}

		return {};
	}
}

export default new ArticleService();
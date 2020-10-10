import axios from "axios";
import { backendAPI } from "../config.json";

export class ArticleService {
	BASE_URL = "article/v1/articles";

	async getAllArticles() {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}`);

			return data.response[0];
		} catch ({ message }) {
			console.error(message);
		}

		return [];
	}

	async getArticleById(id) {
		try {
			const { data } = await axios.get(`${backendAPI}/${this.BASE_URL}/${id}`);
			const [response] = data.response;

			const date = new Date(+response.createdOn).toString().split(" ");

			return {
				id: id,
				title: response.title,
				description: response.description,
				author: {
					id: response.createdBy.id,
					name: response.createdBy.alias
				},
				content: response.content,
				created: `${date[2]} ${date[1]} ${date[3]}`
			};
		} catch ({ message }) {
			console.error(message);
		}

		return [];
	}
}

export default new ArticleService();
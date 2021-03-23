import axios from "axios";
import { backendAPI, defaultError } from "../config.json";

export class ArticleRevisionService {
	BASE_URL = "article/v1/revisions";

	async createArticleRevision(articleId, revision) {
		try {
			const { data } = await axios.post(`${backendAPI}/${this.BASE_URL}`, {
				articleId,
				description: revision.description,
				content: revision.content,
				tags: revision.tags
			});

			return data.response[0].id;
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}
}

export default ArticleRevisionService;
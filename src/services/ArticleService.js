import UserService from "./UserService";

export class ArticleService {
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
}

export default ArticleService;

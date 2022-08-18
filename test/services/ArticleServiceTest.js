import axios from "axios";
import ArticleService from "../../src/services/ArticleService";

describe("ArticleService", () => {
	const instance = new ArticleService();

	describe("::buildArticleURL()", () => {
		it("removes any alphanumeric characters", () => {
			const res = ArticleService.buildArticleURL({
				title: "$@!Hello#£*"
			});

			expect(/[^A-Za-z0-9]/g.test(res)).toBeFalsy();
		});

		it("replaces any spaces with dashes", () => {
			const res = ArticleService.buildArticleURL({
				title: "this is an article title"
			});

			expect(res).toEqual("this-is-an-article-title");
		});

		it("makes the title lowercase", () => {
			const res = ArticleService.buildArticleURL({
				title: "eXamPlE"
			});

			expect(res).toEqual("example");
		});
	});

	describe("::buildArticleRichResult()", () => {
		it("returns the correct schema for the given article", () => {
			const article = {
				title: "This Is My Article",
				created: "2021-02-13T00:00:00.000Z",
				modified: "2021-02-11T12:26:54.697Z",
				user: {
					username: "ExampleUser"
				}
			};

			const res = ArticleService.buildArticleRichResult(article);

			expect(res).toEqual({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": "This Is My Article",
				"datePublished": "2021-02-13T00:00:00.000Z",
				"dateModified": "2021-02-11T12:26:54.697Z",
				"author": {
					"@context": "https://schema.org",
					"@type": "Person",
					"name": "ExampleUser",
					"url": "https://codesupport.dev/profile/exampleuser"
				},
				"publisher": {
					"@type": "Organization",
					"name": "CodeSupport",
					"logo": {
						"@type": "ImageObject",
						"url": "https://codesupport.dev/logo.png"
					}
				}
			});
		});
	});

	describe("getAllArticles()", () => {
		it("returns an empty array if the API request fails", async () => {
			jest.spyOn(console, "error").mockImplementation(() => undefined);
			jest.spyOn(axios, "get").mockImplementation(() => Promise.reject(
				new Error("Request Failed")
			));

			const res = await instance.getAllArticles();

			expect(res).toEqual([]);
		});
	});

	describe("getArticleById()", () => {
		it("returns an empty object if the API request fails", async () => {
			jest.spyOn(console, "error").mockImplementation(() => undefined);
			jest.spyOn(axios, "get").mockImplementation(() => Promise.reject(
				new Error("Request Failed")
			));

			const res = await instance.getArticleById(1);

			expect(res).toEqual({});
		});
	});
});
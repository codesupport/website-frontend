import axios from "axios";
import ArticleService, { ArticleService as ArticleServiceStatic } from "../../src/services/ArticleService";

describe("ArticleService", () => {
	describe("::buildArticleURL()", () => {
		it("removes any alphanumeric characters", () => {
			const res = ArticleServiceStatic.buildArticleURL({
				title: "$@!Hello#£*"
			});

			expect(/[^A-Za-z0-9]/g.test(res)).toBeFalsy();
		});

		it("replaces any spaces with dashes", () => {
			const res = ArticleServiceStatic.buildArticleURL({
				title: "this is an article title"
			});

			expect(res).toEqual("this-is-an-article-title");
		});

		it("makes the title lowercase", () => {
			const res = ArticleServiceStatic.buildArticleURL({
				title: "eXamPlE"
			});

			expect(res).toEqual("example");
		});
	});

	describe("::buildArticleRichResult()", () => {
		it("returns the correct schema for the given article", () => {
			const article = {
				title: "This Is My Article",
				createdOn: "13 Feb 2021",
				updatedOn: 1613046414697,
				createdBy: {
					alias: "ExampleUser"
				}
			};

			const res = ArticleServiceStatic.buildArticleRichResult(article);

			expect(res).toEqual({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": "This Is My Article",
				"datePublished": "2021-02-13T00:00:00.000Z",
				"dateModified": "2021-02-11T12:26:54.697Z",
				"author": {
					"@type": "Person",
					"name": "ExampleUser"
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
		it("returns an array of all the articles mapped to the correct format", async () => {
			jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({
				data: {
					response: [
						{
							id: 1,
							title: "An Article",
							createdOn: 1613046414697
						},
						{
							id: 2,
							title: "Another Article",
							createdOn: 1613046414697
						}
					]
				}
			}));

			const res = await ArticleService.getAllArticles();

			expect(res).toEqual([
				{
					id: 1,
					title: "An Article",
					createdOn: "11 Feb 2021",
					path: "an-article"
				},
				{
					id: 2,
					title: "Another Article",
					createdOn: "11 Feb 2021",
					path: "another-article"
				}
			]);
		});

		it("returns an empty array if the API request fails", async () => {
			jest.spyOn(console, "error").mockImplementation(() => undefined);
			jest.spyOn(axios, "get").mockImplementation(() => Promise.reject(
				new Error("Request Failed")
			));

			const res = await ArticleService.getAllArticles();

			expect(res).toEqual([]);
		});
	});

	describe("getArticleById()", () => {
		it("returns the article mapped to the correct format", async () => {
			jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({
				data: {
					response: [
						{
							id: 1,
							title: "An Article",
							createdOn: 1613046414697
						}
					]
				}
			}));

			const res = await ArticleService.getArticleById(1);

			expect(res).toEqual({
				id: 1,
				title: "An Article",
				createdOn: "11 Feb 2021",
				path: "an-article"
			});
		});

		it("returns an empty object if the API request fails", async () => {
			jest.spyOn(console, "error").mockImplementation(() => undefined);
			jest.spyOn(axios, "get").mockImplementation(() => Promise.reject(
				new Error("Request Failed")
			));

			const res = await ArticleService.getArticleById(1);

			expect(res).toEqual({});
		});
	});
});
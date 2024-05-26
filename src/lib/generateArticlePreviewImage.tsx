import fs from "fs";
import path from "path";
import htmlToImage from "node-html-to-image";
import {type Article} from "../components/molecules/ArticleCard";

export async function generateArticlePreviewImage(article: Article, slug: string) {
	const publicPath = path.join(process.cwd(), "public");
	const articleAssetsPath = path.join(publicPath, "article-assets", slug);

	if (!fs.existsSync(articleAssetsPath)) {
		await fs.promises.mkdir(articleAssetsPath, { recursive: true });
	}

	const metaImagePath = path.join(publicPath, "article-assets", slug, "meta-image.jpeg");

	await htmlToImage({
		type: "jpeg",
		output: metaImagePath,
		content: {
			title: article.title,
			author: article.author
		},
		html: `
			<html>
				<head>
					<link rel="preconnect" href="https://fonts.googleapis.com">
					<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
					<link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway:wght@900&display=swap" rel="stylesheet">
					<style>
						body {
						  width: 1920px;
						  height: 1080px;
						  margin: 0;
						  padding: 50px;
						  display: grid;
						  align-items: center;
						  border-bottom: 20px solid #1457B3;
						  background-color: #F7F7F7;
						}

						#logo {
						  width: 100px;
						  position: fixed;
						  top: 50px;
						  left: 50px;
						}

						#title {
						  font-family: 'Raleway', sans-serif;
						  font-size: 100px;
						  padding-left: 20px;
						  border-left: 10px solid #1457B3;
						}

						#author {
						  font-family: 'Open Sans', sans-serif;
						  font-size: 50px;
						}
					</style>
				</head>
				<body>
					<div id="container">
						<img alt="CodeSupport Logo" id="logo" src="https://codesupport.dev/logo.png" />
						<h1 id="title">
							{{title}}
						</h1>
						<p id="author">
							By {{author}}
						</p>
					</div>
				</body>
			</html>
		`
	});
}

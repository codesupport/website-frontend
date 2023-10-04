import React from "react";
import { faRedditAlien, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import path from "path";
import fs from "fs";
import htmlToImage from "node-html-to-image";
import { getAllArticles, getArticleBySlug } from "../../lib/fetchArticles";
import PageTemplate from "../../components/templates/PageTemplate";
import Container from "../../components/templates/Container";
import Article from "../../components/molecules/Article";
import Markdown from "../../components/atoms/Markdown";
import { ArticleService } from "../../services/ArticleService";
import ShareButtons from "../../components/molecules/ShareButtons";
import addUtmParams from "../../helpers/addUtmParams";

const ArticleMeta = styled("p")`
	margin: 0;
	margin-bottom: 10px;
	color: var(--text-light);
	font-size: 10px;
`;

function ArticlePreviewer({ data }) {
	const {
		title,
		description,
		author,
		content,
		date,
		slug
	} = data;

	const twitterURL = new URL("https://twitter.com/intent/tweet");

	twitterURL.searchParams.append("original_referer", "https://codesupport.dev");
	twitterURL.searchParams.append("related", "codesupportdev");
	twitterURL.searchParams.append("text", `Checkout "${title}" by ${author} on @codesupportdev\nhttps://codesupport.dev/article/${slug}`);

	return (
		<PageTemplate page={title} meta={{
			description: description,
			image: `https://codesupport.dev/article-assets/${slug}/meta-image.jpeg`,
			schema: ArticleService.buildArticleRichResult(data)
		}}>
			<Container>
				<Article className="uk-article">
					<h1>{title}</h1>
					<ArticleMeta>
						By {author} on {new Date(date).toDateString()}
					</ArticleMeta>
					<Markdown content={content} />
				</Article>
				<ShareButtons links={[
					{
						icon: faTwitter,
						title: "Twitter",
						url: addUtmParams(twitterURL.toString(), "twitter")
					},
					{
						icon: faRedditAlien,
						title: "Reddit",
						url: addUtmParams(encodeURI(`https://www.reddit.com/submit?url=https://codesupport.dev/article/${slug}`), "reddit")
					}
				]} />
			</Container>
		</PageTemplate>
	);
}

export async function getStaticPaths() {
	const articles = getAllArticles();

	return {
		paths: articles.map(article => ({
			params: {
				path: article.slug
			}})
		),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const data = getArticleBySlug(params.path);
	const publicPath = path.join(process.cwd(), "public");
	const articleAssetsPath = path.join(publicPath, "article-assets", params.path);

	if (!fs.existsSync(articleAssetsPath)) {
		await fs.promises.mkdir(articleAssetsPath, { recursive: true });
	}

	const metaImagePath = path.join(publicPath, "article-assets", params.path, "meta-image.jpeg");

	await htmlToImage({
		type: "jpeg",
		output: metaImagePath,
		content: {
			title: data.title,
			author: data.author
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

	return {
		props: { data }
	};
}

export default ArticlePreviewer;

import React from "react";
import { getArticleById, getAllArticles } from "../../lib/fetchArticles";
import PageTemplate from "../../components/templates/PageTemplate";
import Container from "../../components/templates/Container";
import Article from "../../components/molecules/Article";
import IntroHero from "../../components/molecules/IntroHero";
import Markdown from "../../components/atoms/Markdown";
import FileUtils from "../../helpers/FileUtils";
import { ArticleService } from "../../services/ArticleService";

const PATH_TO_ID_FILE = "./temp-path-to-id.json";

function ArticlePreviewer({ data }) {
	const {
		title,
		createdBy,
		revision,
		createdOn,
		description
	} = data;

	return (
		<PageTemplate page={title} meta={{
			description,
			schema: ArticleService.buildArticleRichResult(data)
		}}>
			<IntroHero
				title={title}
				description={revision?.description}
			/>
			<Container>
				<Article className="uk-article">
					<p className="uk-article-meta">
						Written on {createdOn} by {createdBy.alias}
					</p>
					<Markdown content={revision?.content} />
				</Article>
			</Container>
		</PageTemplate>
	);
}

export async function getStaticPaths() {
	const articles = await getAllArticles();
	const pathToId = Object.assign({}, ...articles.map(article => ({
		[article.path]: article.id
	})));

	await FileUtils.writeFile(PATH_TO_ID_FILE, JSON.stringify(pathToId));

	return {
		paths: articles.map(article => ({
			params: {
				path: article.path
			}})
		),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const pathToId = JSON.parse((await FileUtils.readFile(PATH_TO_ID_FILE)).toString());
	const data = await getArticleById(pathToId[params.path]);

	return {
		props: { data }
	};
}

export default ArticlePreviewer;
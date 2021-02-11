import React from "react";
import { getArticleById, getAllArticles } from "../../lib/fetchArticles";
import PageTemplate from "../../components/templates/PageTemplate";
import Container from "../../components/templates/Container";
import Article from "../../components/molecules/Article";
import IntroHero from "../../components/molecules/IntroHero";
import Markdown from "../../components/atoms/Markdown";

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
			description
		}}>
			<IntroHero
				title={title}
				description={revision?.description}
			/>
			<Container>
				<Article className="uk-article">
					<p className="uk-article-meta">
						Written on {createdOn} by {createdBy?.alias}
					</p>
					<Markdown content={revision?.content} />
				</Article>
			</Container>
		</PageTemplate>
	);
}

export async function getStaticPaths() {
	const articles = await getAllArticles();

	return {
		paths: articles.map(article => ({
			params: {
				id: article.path
			}})
		),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const data = await getArticleById(params.id);

	return {
		props: { data }
	};
}

export default ArticlePreviewer;
import React from "react";
import { getArticleIds, getArticleById } from "../../lib/fetchArticles";
import PageTemplate from "../../components/templates/PageTemplate";
import Container from "../../components/templates/Container";
import Article from "../../components/molecules/Article";
import IntroHero from "../../components/molecules/IntroHero";
import Markdown from "../../components/atoms/Markdown";

function ArticlePreviewer({ data }) {
	const {
		title,
		author,
		content,
		created,
		description
	} = data;

	return (
		<PageTemplate page={title} meta={{
			description
		}}>
			<IntroHero
				title={title}
				description={description}
			/>
			<Container>
				<Article className="uk-article">
					<p className="uk-article-meta">
						Written on {created} by {author.name}
					</p>
					<Markdown content={content} />
				</Article>
			</Container>
		</PageTemplate>
	);
}

export async function getStaticPaths() {
	const paths = await getArticleIds();

	return {
		paths,
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
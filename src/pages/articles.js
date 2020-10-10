import React from "react";
import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import Container from "../components/templates/Container";
import CardGroup from "../components/molecules/CardGroup";
import Card from "../components/molecules/Card";
import { getArticleById, getArticleIds } from "../lib/fetchArticles";

const MAX_ARTICLES_TO_FETCH = 10;

function Articles({ articles }) {
	return (
		<PageTemplate page="Articles">
			<IntroHero
				title="Articles"
				description="Content written by the CodeSupport community for the CodeSupport community."
			/>
			<main>
				<Container>
					{!articles.length && <p>
						<strong>Sorry, there are no articles available. </strong>
						This may be because there is no connection to the server
						or because no articles have been published yet.
					</p>}
					<CardGroup>
						{articles && articles.map(article => <Card
							key={article.id}
							title={article.title}
							description={article.description}
						>
							<p className="uk-text-small">
								{article.created} by {article.author.name}
							</p>
							<a
								className="uk-button uk-button-text uk-margin-right"
								href={`/article/${article.path}`}
							>
								Read More
							</a>
						</Card>)}
					</CardGroup>
				</Container>
			</main>
		</PageTemplate>
	);
}

export async function getStaticProps() {
	const articleIds = await getArticleIds();
	const articles = await Promise.all(articleIds
		.reverse()
		.slice(0, MAX_ARTICLES_TO_FETCH)
		.map(async ({ params }) => {
			const data = await getArticleById(params.id);

			if (data) {
				return {
					id: data.id,
					path: params.id,
					title: data.title,
					description: data.description,
					created: data.created,
					author: {
						name: data.author?.name
					}
				};
			}
		})
	);

	return {
		props: { articles }
	};
}

export default Articles;
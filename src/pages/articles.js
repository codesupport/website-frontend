import React from "react";
import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import Container from "../components/templates/Container";
import CardGroup from "../components/molecules/CardGroup";
import Card from "../components/molecules/Card";
import { getAllArticles } from "../lib/fetchArticles";

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
							description={article.revision?.description}
						>
							<p className="uk-text-small">
								{article.createdOn} by {article.createdBy?.alias}
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
	const articles = await getAllArticles();

	return {
		props: {
			articles: articles.reverse().slice(0, MAX_ARTICLES_TO_FETCH)
		}
	};
}

export default Articles;
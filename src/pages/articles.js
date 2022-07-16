import React from "react";
import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import Container from "../components/templates/Container";
import CardGroup from "../components/molecules/CardGroup";
import URLCard from "../components/molecules/URLCard";
import { getAllArticles } from "../lib/fetchArticles";
import ArticleService from "../services/ArticleService";

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
						{articles && articles.map(article => <URLCard
							key={article.id}
							href={`/article/${article.slug}`}
							title={article.title}
							description={article.description}
						>
							<p className="uk-text-small">
								{ArticleService.formatArticleDate(article.created)} by {article.user.username}
							</p>
							<p className="uk-text-uppercase">Read More</p>
						</URLCard>)}
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
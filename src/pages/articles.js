import React from "react";
import { getAllArticles } from "../lib/fetchArticles";
import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import Container from "../components/templates/Container";
import CardGroup from "../components/molecules/CardGroup";
import ArticleCard from "../components/molecules/ArticleCard";

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
					{articles.length > 0 ? (
						<section>
							<h2>Latest Articles</h2>
							<CardGroup>
								{articles && articles.map(article => <ArticleCard key={article.id} article={article} />)}
							</CardGroup>
						</section>
					) : (
						<p>
							<strong>Sorry, there are no articles available. </strong>
							This may be because there is no connection to the server
							or because no articles have been published yet.
						</p>
					)}
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
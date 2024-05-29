import { getAllArticles } from "../lib/fetchArticles";
import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import Container from "../components/templates/Container";
import CardGroup from "../components/molecules/CardGroup";
import ArticleCard, { type Article } from "../components/molecules/ArticleCard";
import styled from "styled-components";

const MAX_ARTICLES_TO_FETCH = 10;

const ArticlesSection = styled.section`
	padding: calc(var(--spacer) * 5) 0;
	h2{
		margin: 0;
	}
`;

interface ArticlesProps {
	articles: Article[];
}

function Articles({ articles }: ArticlesProps) {
	return (
		<PageTemplate page="Articles">
			<IntroHero
				title="Articles"
				description="Content written by the CodeSupport community for the CodeSupport community."
			/>
			<main>
				<Container>
					{articles.length > 0 ? (
						<ArticlesSection>
							<CardGroup>
								{articles && (
									articles.sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1)) &&
									articles.map(article => <ArticleCard key={article.slug} article={article} />)
								)}
							</CardGroup>
						</ArticlesSection>
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
			articles: articles.slice(0, MAX_ARTICLES_TO_FETCH)
		}
	};
}

export default Articles;

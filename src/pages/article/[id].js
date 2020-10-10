import React from "react";
import styled from "styled-components";
import { getArticleIds, getArticleById } from "../../lib/fetchArticles";
import PageTemplate from "../../components/templates/PageTemplate";
import Container from "../../components/templates/Container";
import IntroHero from "../../components/molecules/IntroHero";
import Markdown from "../../components/atoms/Markdown";

const Article = styled("article")`
	h1 {
		font-size: 1.75rem;
	}
	
	h2 {
		font-size: 1.5rem;
	}
	
	h3 {
		font-size: 1.25rem;
	}
	
	h4 {
		font-size: 1rem;
	}
	
	img {
		margin: 0 auto;
		display: block;
		border-radius: 3px;
	}
`;

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
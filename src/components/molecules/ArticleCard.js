import React from "react";
import styled from "styled-components";
import URLCard from "./URLCard";

const ArticleCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--foreground);
	box-shadow: var(--box-shadow);
	border-radius: var(--border-radius);
	overflow: hidden;

	.content{
		padding: calc(var(--spacer) * 1.5);

		.meta{
			font-size: calc(var(--body-font-size) / 1.25);
			font-style: italic;
		}
	}
`;

const ReadMore = styled.p`
  	color: var(--cs-blue);
	font-weight: bold;
`;

function ArticleCard({ article }) {
	return (
		<URLCard
			key={article.slug}
			href={`/article/${article.slug}`}
			title={article.title}
			author={article.author}
			description={article.description}
			date={article.date}
		>
			<ReadMore href={`/article/${article.slug}`}>Read Article</ReadMore>
		</URLCard>
	);
}

export default ArticleCard;

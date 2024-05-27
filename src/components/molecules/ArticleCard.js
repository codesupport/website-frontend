import React from "react";
import styled from "styled-components";
import URLCard from "./URLCard";

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
			<ReadMore className="read-more-button" href={`/article/${article.slug}`}>Read Article</ReadMore>
		</URLCard>
	);
}

export default ArticleCard;

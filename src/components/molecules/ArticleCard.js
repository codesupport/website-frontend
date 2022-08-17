import React from "react";
import styled from "styled-components";
import URLCard from "./URLCard";

const ReadMore = styled("button")`
  	padding: 5px 15px;
  	color: var(--foreground);
	background-color: var(--cs-blue);
  	border-radius: 5px;
	border: 1px solid var(--cs-blue);
  	cursor: pointer;
  
  	:hover {
	  color: var(--text);
	  background-color: var(--foreground);
	}
`;

function ArticleCard({ article }) {
	return (
		<URLCard
			key={article.id}
			href={`/article/${article.slug}`}
			title={article.title}
			description={article.description}
		>
			<ReadMore type="button">Read More</ReadMore>
		</URLCard>
	);
}

export default ArticleCard;
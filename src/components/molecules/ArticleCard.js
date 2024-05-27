import React from "react";
import styled from "styled-components";

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

const ReadMore = styled.a`
  	padding: calc(var(--spacer) / 2) var(--spacer);
  	color: var(--foreground);
	background-color: var(--cs-blue);
	text-decoration: none;
	margin-top: auto;
	transition: opacity 150ms;
  
  	&:hover {
		opacity: 0.8;
	}

	@media (max-width: 1200px){
		text-align: center;
	}
`;

function ArticleCard({ article }) {
	return (
		<ArticleCardWrapper>
			<div className="content">
				<h2 className="fs-3">{article.title}</h2>
				{(article.author && article.date) && <span className="meta">By {article.author} on {article.date}</span>}
				{article.description && <p>{article.description}</p>}
			</div>
			<ReadMore href={`/article/${article.slug}`}>Read Article</ReadMore>
		</ArticleCardWrapper>
	);
}

export default ArticleCard;

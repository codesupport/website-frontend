import React from "react";
import styled from "styled-components";

const Article = styled("article")`
	height: 100%;

	.content{
		padding: var(--spacer);
	}
`;

const CardBadge = styled.div`
  	color: var(--foreground);
	background-color: var(--text);
	width: 100%;
	padding: calc(var(--spacer) / 2) var(--spacer);
`;

function Card({ title, description, children, tag, tagClass }) {
	return (
		<Article>
			{tag && <CardBadge className={tagClass}>{tag}</CardBadge>}
			<div className="content">
				{title && <h3>{title}</h3>}
				{description && <p>{description}</p>}
				{children}
			</div>
		</Article>
	);
}

export default Card;

import {PropsWithChildren} from "react";
import styled from "styled-components";

const Article = styled("article")`
	display: flex;
	flex-direction: column;
	height: 100%;

	.content{
		display: flex;
		flex-direction: column;
		padding: var(--spacer);
		height: 100%;
		overflow: hidden;
		color: var(--body-text-color);

		h3{
			margin: 0;
		}

		.meta{
			color: var(--body-text-color);
			font-size: calc(var(--body-font-size) / 1.25);
			font-style: italic;
		}

		.read-more-button{
			display: flex;
			align-items: flex-end;
			flex-grow:1;
			margin-bottom: 0;
		}
	}
`;

const CardBadge = styled("div")`
  	color: var(--foreground);
	background-color: var(--text);
	width: 100%;
	padding: calc(var(--spacer) / 2) var(--spacer);
`;

export type CardProps = PropsWithChildren<{
	title?: string;
	description?: string;
	tag?: string;
	tagClass?: string;
	author?: string;
	date?: string;
}>;

function Card({ title, description, children, tag, tagClass, author, date }: CardProps) {
	return (
		<Article>
			{tag && <CardBadge className={tagClass}>{tag}</CardBadge>}
			<div className="content">
				{title && <h3>{title}</h3>}
				{author && date && <span className="meta">By {author} on {date}</span>}
				{description && <p>{description}</p>}
				{children}
			</div>
		</Article>
	);
}

export default Card;

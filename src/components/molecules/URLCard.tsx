import {ComponentPropsWithoutRef} from "react";
import styled from "styled-components";

import Card from "./Card";

const LinkCard = styled("a")`
	text-decoration: none;
	transition: opacity 150ms;
	box-shadow: var(--box-shadow);
	background-color: var(--foreground);
	border-radius: var(--border-radius);
	overflow: hidden;

	&:hover{
		opacity: 0.8;
		box-shadow: var(--box-shadow-card-hover); 
	}
`;

export interface URLCardProps extends
	ComponentPropsWithoutRef<typeof LinkCard>,
	ComponentPropsWithoutRef<typeof Card> {}

function URLCard({ href, target, rel, title, description, children, tag, tagClass, author, date }: URLCardProps) {
	return (
		<LinkCard
			href={href}
			target={target}
			rel={rel}
		>
			<Card
				title={title}
				description={description}
				tag={tag}
				tagClass={tagClass}
				author={author}
				date={date}
			>
				{children}
			</Card>
		</LinkCard>
	);
}

export default URLCard;

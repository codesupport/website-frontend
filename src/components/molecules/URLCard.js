import React from "react";
import styled from "styled-components";

import Card from "./Card";

const LinkCard = styled("a")`
	text-decoration: none;
`;

function URLCard({ href, target, rel, title, description, children, tag, tagClass }) {
	return (
		<LinkCard
			href={href}
			target={target}
			rel={rel}
		>
			<Card
				title={title}
				description={description}
				children={children}
				tag={tag}
				tagClass={tagClass}
			/>
		</LinkCard>
	);
}

export default URLCard;

import React from "react";
import styled from "styled-components";

const Article = styled("article")`
	height: 100%;

	&:hover {
		box-shadow: 0 5px 15px rgb(0 0 0 / 15%);
	}
`;

function Card({ title, description, children, tag, tagClass }) {
	return (
		<Article className="uk-card uk-card-default uk-card-small uk-card-body">
			{tag &&
                <span className={`uk-card-badge uk-label ${tagClass}`}>{tag}</span>
			}
			{title &&
                <h2 className="uk-card-title uk-margin-xlarge-right">
                	{title}
                </h2>
			}
			{description &&
                <p>
                	{description}
                </p>
			}
			{children}
		</Article>
	);
}

export default Card;
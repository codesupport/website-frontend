import React from "react";
import styled from "styled-components";

const Article = styled("article")`
	height: 100%;
  	padding: 10px;
  	background-color: var(--foreground);
  	border-radius: 5px;
  	border: 1px solid var(--border);

	&:hover {
		box-shadow: 0 5px 5px rgb(0 0 0 / 15%);
	}
  
  	h3 {
	  margin-bottom: 5px;
	}

  	p {
	  margin: 5px 0;
	}
`;

const Layout = styled("div")`
	display: grid;
  	grid-template-columns: 3fr auto;
  	grid-column-gap: 5px;
  
  	align-items: center;
`;

const CardBadge = styled("span")`
  	color: var(--foreground);
  	padding: 2px 5px;
	font-size: 10px;
  	border-radius: 5px;
`;

function Card({ title, description, children, tag, tagClass }) {
	return (
		<Article>
			<Layout>
				{title &&
					<h3>
						{title}
					</h3>
				}
				{tag &&
					<CardBadge className={tagClass}>{tag}</CardBadge>
				}
			</Layout>
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